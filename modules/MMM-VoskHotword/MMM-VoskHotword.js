Module.register("MMM-VoskHotword", {
	defaults: {
		assistantProfile: "default"
	},

	start: function () {
		Log.info("MMM-VoskHotword: External Pi 2 hotword detection mode");
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "HOTWORD_DETECTED") {
			Log.info("🎯 Hotword detected:", payload.hotword, "from", payload.source);

			// Trigger Google Assistant
			this.sendNotification("ASSISTANT_ACTIVATE", {
				profile: this.config.assistantProfile
			});
		}
	},

	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.style.display = "none";
		return wrapper;
	}
});
