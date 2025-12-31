const NodeHelper = require("node_helper");
const record = require("node-record-lpcm16");
const Detector = require("snowboy").Detector;
const Models = require("snowboy").Models;

module.exports = NodeHelper.create({
	start: function () {
		console.log("Starting node helper for: " + this.name);
		this.detector = null;
		this.mic = null;
		this.isListening = false;
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "START_HOTWORD") {
			this.startHotwordDetection(payload);
		} else if (notification === "STOP_HOTWORD") {
			this.stopHotwordDetection();
		} else if (notification === "PAUSE_HOTWORD") {
			this.pauseHotwordDetection();
		} else if (notification === "RESUME_HOTWORD") {
			this.resumeHotwordDetection();
		}
	},

	startHotwordDetection: function (config) {
		if (this.isListening) {
			console.log("Hotword detection already running");
			return;
		}

		const models = new Models();

		// Add the "mirror mirror" model
		models.add({
			file: config.modelPath || __dirname + "/resources/mirror_mirror.pmdl",
			sensitivity: config.sensitivity || "0.5",
			hotwords: "mirror"
		});

		this.detector = new Detector({
			resource: config.resourcePath || __dirname + "/resources/common.res",
			models: models,
			audioGain: config.audioGain || 2.0,
			applyFrontend: true
		});

		const self = this;

		this.detector.on("silence", function () {
			// Silence detected
		});

		this.detector.on("sound", function () {
			// Sound detected
		});

		this.detector.on("error", function (err) {
			console.error("Snowboy error:", err);
			self.sendSocketNotification("HOTWORD_ERROR", { error: err.message });
		});

		this.detector.on("hotword", function (index, hotword, buffer) {
			console.log("Hotword detected: " + hotword);
			self.sendSocketNotification("HOTWORD_DETECTED", {
				hotword: hotword,
				index: index
			});
		});

		// Start recording from microphone
		this.mic = record.record({
			threshold: 0,
			verbose: false,
			recordProgram: config.recordProgram || "arecord",
			device: config.device || null,
			sampleRate: 16000,
			channels: 1
		});

		this.mic.stream().pipe(this.detector);
		this.isListening = true;
		console.log("Hotword detection started");
		this.sendSocketNotification("HOTWORD_STARTED");
	},

	stopHotwordDetection: function () {
		if (this.mic) {
			this.mic.stop();
			this.mic = null;
		}
		if (this.detector) {
			this.detector.reset();
		}
		this.isListening = false;
		console.log("Hotword detection stopped");
	},

	pauseHotwordDetection: function () {
		if (this.mic && this.isListening) {
			this.mic.pause();
			console.log("Hotword detection paused");
		}
	},

	resumeHotwordDetection: function () {
		if (this.mic && this.isListening) {
			this.mic.resume();
			console.log("Hotword detection resumed");
		}
	}
});
