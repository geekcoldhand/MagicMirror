Module.register("MMM-SpeechHotword", {
	defaults: {
		hotwords: ["mirror mirror", "hey mirror", "mirror"],
		language: "en-US",
		continuous: true,
		interimResults: true,
		maxAlternatives: 5,
		detectionCooldown: 2000,
		assistantProfile: "default"
	},

	start: function () {
		Log.info("Starting module: " + this.name);

		this.recognition = null;
		this.isListening = false;
		this.isPaused = false;
		this.lastDetectionTime = 0;

		setTimeout(() => {
			this.setupRecognition();
		}, 3000);
	},

	setupRecognition: function () {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		if (!SpeechRecognition) {
			Log.error("MMM-SpeechHotword: Web Speech API not supported");
			return;
		}

		this.recognition = new SpeechRecognition();
		this.recognition.lang = this.config.language;
		this.recognition.continuous = this.config.continuous;
		this.recognition.interimResults = this.config.interimResults;
		this.recognition.maxAlternatives = this.config.maxAlternatives;

		this.recognition.onstart = () => {
			this.isListening = true;
			Log.info("MMM-SpeechHotword: Listening");
		};

		this.recognition.onresult = (event) => {
			if (this.isPaused) return;

			const now = Date.now();
			if (now - this.lastDetectionTime < this.config.detectionCooldown) return;

			for (let i = event.resultIndex; i < event.results.length; i++) {
				for (let j = 0; j < event.results[i].length; j++) {
					const transcript = event.results[i][j].transcript.toLowerCase().trim();

					for (const hotword of this.config.hotwords) {
						if (transcript.includes(hotword.toLowerCase())) {
							this.lastDetectionTime = now;

							Log.info(`MMM-SpeechHotword: Detected "${hotword}" in "${transcript}"`);

							// 🔑 CORRECT SIGNAL FOR MMM-AssistantMk2
							this.sendNotification("ASSISTANT_ACTIVATE", {
								profile: this.config.assistantProfile
							});

							return;
						}
					}
				}
			}
		};

		this.recognition.onerror = (event) => {
			Log.error("MMM-SpeechHotword error:", event.error);

			if (event.error === "no-speech" || event.error === "network") {
				setTimeout(() => {
					if (!this.isPaused) this.startListening();
				}, 1500);
			}
		};

		this.recognition.onend = () => {
			this.isListening = false;
			if (!this.isPaused) {
				setTimeout(() => this.startListening(), 500);
			}
		};

		// Chromium sometimes needs one gesture — this prevents silent failure
		document.addEventListener(
			"click",
			() => {
				if (!this.isListening) this.startListening();
			},
			{ once: true }
		);

		this.startListening();
	},

	startListening: function () {
		if (!this.recognition || this.isListening) return;

		try {
			this.recognition.start();
		} catch (e) {
			if (e.name !== "InvalidStateError") {
				Log.error("MMM-SpeechHotword start error:", e.message);
			}
		}
	},

	stopListening: function () {
		if (!this.recognition || !this.isListening) return;

		try {
			this.recognition.stop();
			this.isListening = false;
		} catch (e) {
			Log.error("MMM-SpeechHotword stop error:", e.message);
		}
	},

	pauseListening: function () {
		if (this.isPaused) return;
		this.isPaused = true;
		this.stopListening();
		Log.info("MMM-SpeechHotword paused");
	},

	resumeListening: function () {
		if (!this.isPaused) return;
		this.isPaused = false;
		this.startListening();
		Log.info("MMM-SpeechHotword resumed");
	},

	notificationReceived: function (notification) {
		switch (notification) {
			case "ASSISTANT_LISTENING":
			case "ASSISTANT_ACTIVATE":
				this.pauseListening();
				break;

			case "ASSISTANT_DEACTIVATED":
				this.resumeListening();
				break;
		}
	},

	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.style.display = "none";
		return wrapper;
	}
});
