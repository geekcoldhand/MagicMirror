Module.register("MMM-Hotword", {
	defaults: {
		hotwords: ["mirror mirror"],
		sensitivity: 0.5,
		microphone: {
			audioGain: 2.0,
			frontend: true
		}
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		this.isListening = false;
		this.isPaused = false;
		this.recognition = null;
		this.setupRecognition();
	},

	setupRecognition: function () {
		// Check if browser supports Web Speech API
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		if (!SpeechRecognition) {
			Log.error("MMM-Hotword: Speech Recognition not supported in this browser");
			return;
		}

		this.recognition = new SpeechRecognition();
		this.recognition.continuous = true;
		this.recognition.interimResults = true;
		this.recognition.lang = "en-US";

		const self = this;

		this.recognition.onresult = function (event) {
			if (self.isPaused) return;

			const transcript = Array.from(event.results)
				.map((result) => result[0])
				.map((result) => result.transcript)
				.join("")
				.toLowerCase()
				.trim();

			Log.log("MMM-Hotword heard: " + transcript);

			// Check if any hotword is detected
			for (let hotword of self.config.hotwords) {
				if (transcript.includes(hotword.toLowerCase())) {
					Log.info("MMM-Hotword: Hotword detected - " + hotword);
					self.sendNotification("HOTWORD_DETECTED", {
						hotword: hotword,
						transcript: transcript
					});
					break;
				}
			}
		};

		this.recognition.onerror = function (event) {
			Log.error("MMM-Hotword: Recognition error - " + event.error);
			if (event.error === "no-speech" || event.error === "audio-capture") {
				// These are recoverable errors, restart listening
				setTimeout(() => {
					if (!self.isPaused && self.isListening) {
						self.startListening();
					}
				}, 1000);
			}
		};

		this.recognition.onend = function () {
			// Automatically restart if not paused
			if (!self.isPaused && self.isListening) {
				Log.log("MMM-Hotword: Recognition ended, restarting...");
				setTimeout(() => {
					self.startListening();
				}, 500);
			}
		};

		// Start listening automatically
		this.startListening();
	},

	startListening: function () {
		if (!this.recognition) {
			Log.error("MMM-Hotword: Speech recognition not initialized");
			return;
		}

		if (this.isListening) {
			return; // Already listening
		}

		try {
			this.recognition.start();
			this.isListening = true;
			Log.info("MMM-Hotword: Started listening for hotwords");
		} catch (e) {
			Log.error("MMM-Hotword: Error starting recognition - " + e.message);
		}
	},

	stopListening: function () {
		if (!this.recognition || !this.isListening) {
			return;
		}

		try {
			this.recognition.stop();
			this.isListening = false;
			Log.info("MMM-Hotword: Stopped listening");
		} catch (e) {
			Log.error("MMM-Hotword: Error stopping recognition - " + e.message);
		}
	},

	pauseListening: function () {
		Log.info("MMM-Hotword: Pausing hotword detection");
		this.isPaused = true;
		this.stopListening();
	},

	resumeListening: function () {
		Log.info("MMM-Hotword: Resuming hotword detection");
		this.isPaused = false;
		this.startListening();
	},

	notificationReceived: function (notification, payload, sender) {
		if (notification === "HOTWORD_PAUSE") {
			this.pauseListening();
		} else if (notification === "HOTWORD_RESUME") {
			this.resumeListening();
		} else if (notification === "HOTWORD_STOP") {
			this.stopListening();
		} else if (notification === "HOTWORD_START") {
			this.startListening();
		}
	},

	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.style.display = "none"; // This module has no visible UI
		return wrapper;
	}
});
