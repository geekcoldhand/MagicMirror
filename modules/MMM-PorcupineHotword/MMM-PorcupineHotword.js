Module.register("MMM-PorcupineHotword", {
	defaults: {
		accessKey: "", // Get free key from https://console.picovoice.ai/
		deviceIndex: -1, // -1 for default microphone
		keywords: ["jarvis", "computer"] // Built-in keywords (free)
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		this.isPaused = false;

		if (!this.config.accessKey) {
			Log.error("Porcupine access key required! Get one free at https://console.picovoice.ai/");
			return;
		}

		this.sendSocketNotification("START_HOTWORD", this.config);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "HOTWORD_DETECTED") {
			Log.info("Hotword detected: " + payload.hotword);
			if (!this.isPaused) {
				this.sendNotification("HOTWORD_DETECTED", payload);
			}
		} else if (notification === "HOTWORD_ERROR") {
			Log.error("Hotword error: " + payload.error);
			if (payload.tip) {
				Log.info("Tip: " + payload.tip);
			}
		} else if (notification === "HOTWORD_STARTED") {
			Log.info("Hotword detection started");
		}
	},

	notificationReceived: function (notification, payload, sender) {
		if (notification === "HOTWORD_PAUSE") {
			this.isPaused = true;
			this.sendSocketNotification("PAUSE_HOTWORD");
		} else if (notification === "HOTWORD_RESUME") {
			this.isPaused = false;
			this.sendSocketNotification("RESUME_HOTWORD");
		} else if (notification === "HOTWORD_STOP") {
			this.sendSocketNotification("STOP_HOTWORD");
		}
	},

	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.style.display = "none";
		return wrapper;
	}
});
