const NodeHelper = require("node_helper");
const mic = require("mic");
const vosk = require("vosk");
const fs = require("fs");

module.exports = NodeHelper.create({
	start: function () {
		console.log("Starting MMM-VoskHotword helper");
		this.model = null;
		this.recognizer = null;
		this.micInstance = null;
		this.isListening = false;
		this.isPaused = false;
	},

	socketNotificationReceived: function (notification, payload) {
		switch (notification) {
			case "START_VOSK":
				this.startVosk(payload);
				break;
			case "PAUSE_VOSK":
				this.pauseVosk();
				break;
			case "RESUME_VOSK":
				this.resumeVosk();
				break;
			case "STOP_VOSK":
				this.stopVosk();
				break;
		}
	},

	startVosk: function (config) {
		if (this.isListening) {
			console.log("Vosk already listening");
			return;
		}

		const modelPath = config.modelPath || __dirname + "/model";

		// Verify model exists
		if (!fs.existsSync(modelPath)) {
			console.error("❌ Vosk model not found at:", modelPath);
			console.error("Run: cd modules/MMM-VoskHotword && wget https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip && unzip vosk-model-small-en-us-0.15.zip && mv vosk-model-small-en-us-0.15 model");
			this.sendSocketNotification("VOSK_ERROR", {
				error: "Model not found at " + modelPath
			});
			return;
		}

		console.log("Loading Vosk model from:", modelPath);

		try {
			// Load Vosk model
			vosk.setLogLevel(-1); // Suppress verbose Vosk logs
			this.model = new vosk.Model(modelPath);

			// Create recognizer
			this.recognizer = new vosk.Recognizer({
				model: this.model,
				sampleRate: 16000
			});

			// Enable partial results for better responsiveness
			this.recognizer.setWords(true);
			this.recognizer.setPartialWords(false);

			console.log("✅ Vosk model loaded successfully");

			// Configure microphone
			const micConfig = {
				rate: "16000",
				channels: "1",
				device: config.device || "default",
				encoding: "signed-integer",
				bitwidth: "16",
				endian: "little"
			};

			console.log("Starting microphone with device:", micConfig.device);
			this.micInstance = mic(micConfig);
			const micInputStream = this.micInstance.getAudioStream();

			const self = this;
			let audioChunkCount = 0;

			micInputStream.on("data", function (data) {
				if (self.isPaused) return;

				audioChunkCount++;

				// Log first chunk to confirm audio is flowing
				if (audioChunkCount === 1) {
					console.log("✅ Audio data flowing from microphone");
				}

				// Process audio through Vosk
				if (self.recognizer.acceptWaveform(data)) {
					const result = JSON.parse(self.recognizer.result());
					if (result.text && result.text.trim().length > 0) {
						console.log("🎤 Vosk heard:", result.text);
						self.processTranscript(result.text, config.hotwords);
					}
				}
			});

			micInputStream.on("error", function (error) {
				console.error("❌ Microphone error:", error);
				self.sendSocketNotification("VOSK_ERROR", {
					error: "Microphone error: " + error.message
				});
			});

			micInputStream.on("silence", function () {
				// Silence is normal, don't log
			});

			// Start recording
			this.micInstance.start();
			this.isListening = true;

			console.log("✅ MMM-VoskHotword listening for:", config.hotwords.join(", "));
			console.log("📊 Monitor CPU usage with: htop");

			this.sendSocketNotification("VOSK_STARTED");
		} catch (error) {
			console.error("❌ Failed to start Vosk:", error);
			this.sendSocketNotification("VOSK_ERROR", {
				error: error.message
			});
		}
	},

	processTranscript: function (transcript, hotwords) {
		const normalized = transcript.toLowerCase().trim();

		// Check each hotword
		for (const hotword of hotwords) {
			const normalizedHotword = hotword.toLowerCase().trim();

			if (normalized.includes(normalizedHotword)) {
				console.log("✅ HOTWORD DETECTED:", hotword);
				console.log("   Full transcript:", transcript);

				this.sendSocketNotification("HOTWORD_DETECTED", {
					hotword: hotword,
					transcript: transcript,
					timestamp: Date.now()
				});

				// Only trigger once per transcript
				return;
			}
		}
	},

	pauseVosk: function () {
		if (!this.isPaused) {
			this.isPaused = true;
			console.log("⏸️  Vosk paused (Assistant active)");
		}
	},

	resumeVosk: function () {
		if (this.isPaused) {
			this.isPaused = false;
			console.log("▶️  Vosk resumed (Assistant inactive)");
		}
	},

	stopVosk: function () {
		console.log("Stopping Vosk...");

		if (this.micInstance) {
			this.micInstance.stop();
			this.micInstance = null;
		}

		if (this.recognizer) {
			this.recognizer.free();
			this.recognizer = null;
		}

		if (this.model) {
			this.model.free();
			this.model = null;
		}

		this.isListening = false;
		console.log("✅ Vosk stopped");
	}
});
