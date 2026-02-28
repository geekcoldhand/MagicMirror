//
// Module : MMM-AssistantMk2
//

"use strict";

const path = require("path");
const record = require("node-record-lpcm16");
const GoogleAssistant = require("google-assistant");
const exec = require("child_process").exec;
const fs = require("fs");
const wav = require("wav");

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	start: function () {
		console.log(this.name + " started");
		this.config = {};
	},

	initializeAfterLoading: function (config) {
		this.config = config;
	},

	socketNotificationReceived: function (notification, payload) {
		switch (notification) {
			case "INIT":
				this.initializeAfterLoading(payload);
				this.sendSocketNotification("INITIALIZED");
				break;
			case "START":
				this.activate(payload);
				this.sendSocketNotification("STARTED");
				break;
		}
	},

	activate: function (payload) {
		var transcriptionHook = this.config.transcriptionHook;

		var cfgInstance = {
			auth: {
				keyFilePath: path.resolve(__dirname, this.config.auth.keyFilePath),
				savedTokensPath: path.resolve(__dirname, "profiles/" + payload.profileFile)
			},
			conversation: {
				audio: this.config.audio,
				lang: payload.lang,
				deviceModelId: this.config.deviceModelId,
				deviceId: this.config.deviceInstanceId,
				deviceLocation: this.config.deviceLocation,
				screen: {
					isOn: this.config.useScreen
				}
			}
		};

		var assistant = new GoogleAssistant(cfgInstance.auth);

		var startConversation = (conversation) => {
			let openMicAgain = false;
			let foundHook = [];
			let foundAction = null;
			let foundVideo = null;
			let foundVideoList = null;
			let audioError = 0;

			// Always use MP3 output
			var mp3File = path.resolve(__dirname, "temp.mp3");
			var wstream = fs.createWriteStream(mp3File);

			// setup the conversation
			conversation
				// send the audio buffer to the file
				.on("audio-data", (data) => {
					wstream.on("finish", () => {
						wstream.end();
					});
					try {
						wstream.write(data);
					} catch (error) {
						console.log("Some error happens. Try again.");
						this.sendSocketNotification("ERROR", "AUDIO_ERROR");
					}
				})
				// done speaking, close the mic
				.on("end-of-utterance", () => {
					console.log("end-of-utterance");
					// ⚠️ NEW: Only stop mic if it was started
					if (payload.type !== "TEXT") {
						record.stop();
					}
				})
				// just to spit out to the console what was said (as we say it)
				.on("transcription", (data) => {
					console.log("Transcription:", data.transcription, " --- Done:", data.done);
					this.sendSocketNotification("TRANSCRIPTION", data);
					if (data.done) {
						for (var k in transcriptionHook) {
							if (transcriptionHook.hasOwnProperty(k)) {
								var v = transcriptionHook[k];
								var found = data.transcription.match(new RegExp(v, "ig"));
								if (found !== null) {
									foundHook.push(k);
								}
							}
						}
					}
				})

				// what the assistant said back
				.on("response", (text) => {
					console.log("Assistant Text Response:", text);
				})
				// volume level change
				.on("volume-percent", (percent) => {
					console.log("Volume control... Not yet supported");
				})
				// the device needs to complete an action
				.on("device-action", (action) => {
					console.log("Device Action:", action);
					if (typeof action["inputs"] !== "undefined") {
						var intent = action.inputs[0].payload.commands;
						console.log("execution", action.inputs[0].payload.commands[0].execution[0]);
						foundAction = action.inputs[0].payload.commands;
					}
				})
				// once the conversation is ended
				.on("ended", (error, continueConversation) => {
					var payload = {
						foundHook: foundHook,
						foundAction: foundAction,
						foundVideo: foundVideo,
						foundVideoList: foundVideoList,
						error: null,
						continue: false
					};

					if (error) {
						console.log("Conversation Ended Error:", error);
						payload.error = error;
					} else if (continueConversation) {
						openMicAgain = true;
						payload.continue = true;
					} else {
						console.log("Conversation Completed");
					}

					wstream.end();
					exec(this.config.audio.mp3Player + " " + mp3File, (err, stdout, stderr) => {
						this.sendSocketNotification("TURN_OVER", payload);
					});
				})

				.on("screen-data", (screen) => {
					var self = this;
					var file = require("fs");
					var filePath = path.resolve(__dirname, "temp_screen.html");
					var str = screen.data.toString("utf8");
					str = str.replace("html,body{", "html,body{zoom:" + this.config.screenZoom + ";");

					// ⚠️ NEW: Add text query if provided
					if (payload.type === "TEXT" && payload.key) {
						cfgInstance.conversation.textQuery = payload.key;
						console.log("📝 TEXT mode query:", payload.key);
					}

					// ⚠️ NEW: Only start mic for voice mode, not TEXT mode
					if (payload.type !== "TEXT") {
						console.log("🎤 Starting microphone for voice input");
						var mic = record.start(this.config.record);
						mic.on("data", (data) => {
							try {
								conversation.write(data);
							} catch (err) {
								console.log("mic error:", err);
							}
						});
					} else {
						console.log("📝 TEXT mode: skipping microphone");
					}

					var re = new RegExp("(tbm=isch[^<]*)", "ig");
					var isch = re.exec(str);

					var contents = file.writeFile(filePath, str, (error) => {
						if (error) {
							console.log("Error:- " + error);
						}
						this.sendSocketNotification("SCREEN", str);
					});

					var re = new RegExp("youtube.com/watch\\?v=([0-9a-zA-Z-_]+)", "ig");
					var youtubeVideo = re.exec(str);
					if (youtubeVideo) {
						console.log("video found:", youtubeVideo[1]);
						foundVideo = youtubeVideo[1];
					}

					var re = new RegExp("youtube.com/playlist\\?list=([a-zA-Z0-9-_]+)", "ig");
					var youtubeList = re.exec(str);
					if (youtubeList) {
						console.log("video list found:", youtubeList[1]);
						foundVideoList = youtubeList[1];
					}
				})
				// catch any errors
				.on("error", (error) => {
					console.log("Conversation Error:", error);
					this.sendSocketNotification("CONVERSATION_ERROR", error);
				});
		};

		assistant
			.on("ready", () => {
				console.log("*** 5. assistant ready");
				this.sendSocketNotification("ASSISTANT_READY");

				// Play ding sound using mpg321/aplay instead of Speaker
				var dingFile = path.resolve(__dirname, "resources/ding.wav");
				exec("aplay " + dingFile, (err) => {
					if (err) {
						console.log("Could not play ding sound:", err);
					}
					// Start conversation after ding (or immediately if ding fails)
					setTimeout(() => {
						assistant.start(cfgInstance.conversation);
					}, 500);
				});
			})
			.on("started", startConversation)
			.on("error", (error) => {
				console.log("Assistant Error:", error);
				this.sendSocketNotification("ASSISTANT_ERROR", error);
			});
	}
});
