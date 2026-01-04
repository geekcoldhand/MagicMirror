Module.register("MMM-VoskHotword", {
	defaults: {
		hotwords: ["mirror mirror", "hey mirror"],
		modelPath: "modules/MMM-VoskHotword/model",
		device: "default", // Change to "plughw:X,Y" based on arecord -l
		assistantProfile: "default"
	},

	start: function () {
		Log.info("Starting MMM-VoskHotword");
		this.sendSocketNotification("START_HOTWORD", this.config);
	},

	socketNotificationReceived: function (notification, payload) {
		switch (notification) {
			case "HOTWORD_DETECTED":
				Log.info("🎯 Hotword detected:", payload.hotword);

				// Trigger Assistant
				this.sendNotification("ASSISTANT_ACTIVATE", {
					profile: this.config.assistantProfile
				});
				break;

			case "VOSK_ERROR":
				Log.error("❌ Vosk error:", payload.error);
				this.sendNotification("SHOW_ALERT", {
					title: "Vosk Hotword Error",
					message: payload.error,
					timer: 5000
				});
				break;

			case "VOSK_STARTED":
				Log.info("✅ Vosk hotword detection active");
				break;
		}
	},

	notificationReceived: function (notification, payload, sender) {
		switch (notification) {
			case "ASSISTANT_LISTENING":
			case "ASSISTANT_ACTIVATE":
				// Pause hotword detection while Assistant is active
				this.sendSocketNotification("PAUSE_VOSK");
				break;

			case "ASSISTANT_DEACTIVATED":
				// Resume hotword detection after Assistant finishes
				this.sendSocketNotification("RESUME_VOSK");
				break;
		}
	},

	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.style.display = "none"; // Invisible module
		return wrapper;
	}
});
