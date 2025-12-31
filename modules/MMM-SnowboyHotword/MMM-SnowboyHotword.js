Module.register("MMM-SnowboyHotword", {
	defaults: {
		modelPath: "modules/MMM-SnowboyHotword/resources/mirror_mirror.pmdl",
		resourcePath: "modules/MMM-SnowboyHotword/resources/common.res",
		sensitivity: "0.5",
		audioGain: 2.0,
		recordProgram: "arecord",
		device: null // or "plughw:1" for USB mic
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		this.isPaused = false;
		this.sendSocketNotification("START_HOTWORD", this.config);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "HOTWORD_DETECTED") {
			Log.info("Hotword detected!");
			if (!this.isPaused) {
				this.sendNotification("HOTWORD_DETECTED", payload);
			}
		} else if (notification === "HOTWORD_ERROR") {
			Log.error("Hotword error: " + payload.error);
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
