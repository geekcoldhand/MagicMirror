const NodeHelper = require("node_helper");
const { Porcupine } = require("@picovoice/porcupine-node");
const { PvRecorder } = require("@picovoice/pvrecorder-node");

module.exports = NodeHelper.create({
	start: function () {
		console.log("Starting node helper for: " + this.name);
		this.porcupine = null;
		this.recorder = null;
		this.isListening = false;
		this.isPaused = false;
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

		const self = this;

		try {
			// Free tier access key - replace with your own from https://console.picovoice.ai/
			const accessKey = config.accessKey || "YOUR_ACCESS_KEY_HERE";

			// Create Porcupine instance with built-in keywords
			this.porcupine = new Porcupine(
				accessKey,
				["jarvis", "computer"], // Built-in wake words (free)
				[0.5, 0.5] // Sensitivities (0-1)
			);

			// Get available audio devices
			const devices = PvRecorder.getAvailableDevices();
			console.log("Available audio devices:", devices);

			// Create recorder
			const deviceIndex = config.deviceIndex || -1; // -1 for default device
			this.recorder = new PvRecorder(deviceIndex, this.porcupine.frameLength);
			this.recorder.start();

			console.log("Porcupine hotword detection started");
			console.log("Listening for: jarvis, computer");
			this.isListening = true;
			this.sendSocketNotification("HOTWORD_STARTED");

			// Detection loop
			const detectLoop = () => {
				if (!this.isListening) return;

				const pcm = this.recorder.read();
				const keywordIndex = this.porcupine.process(pcm);

				if (keywordIndex !== -1 && !this.isPaused) {
					const keywords = ["jarvis", "computer"];
					console.log("Hotword detected: " + keywords[keywordIndex]);
					this.sendSocketNotification("HOTWORD_DETECTED", {
						hotword: keywords[keywordIndex],
						index: keywordIndex
					});
				}

				// Continue loop
				setImmediate(detectLoop);
			};

			detectLoop();
		} catch (error) {
			console.error("Error starting Porcupine:", error.message);
			this.sendSocketNotification("HOTWORD_ERROR", {
				error: error.message,
				tip: "Get a free access key from https://console.picovoice.ai/"
			});
		}
	},

	stopHotwordDetection: function () {
		if (this.recorder) {
			this.recorder.stop();
			this.recorder.release();
			this.recorder = null;
		}
		if (this.porcupine) {
			this.porcupine.release();
			this.porcupine = null;
		}
		this.isListening = false;
		console.log("Hotword detection stopped");
	},

	pauseHotwordDetection: function () {
		this.isPaused = true;
		console.log("Hotword detection paused");
	},

	resumeHotwordDetection: function () {
		this.isPaused = false;
		console.log("Hotword detection resumed");
	}
});
