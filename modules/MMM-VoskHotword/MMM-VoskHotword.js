Module.register("MMM-VoskHotword", {
	defaults: {
		assistantProfile: "default"
	},

	start: function () {
		Log.info("MMM-VoskHotword: External Pi 2 hotword detection mode");
		Log.info("MMM-VoskHotword: Ready to receive socket notifications");
	},

	socketNotificationReceived: function (notification, payload) {
		Log.info("MMM-VoskHotword: Received socket notification:", notification);

		if (notification === "HOTWORD_DETECTED") {
			Log.info("🎯 Hotword detected:", payload.hotword, "from", payload.source);
			Log.info("Broadcasting HOTWORD_DETECTED to all modules...");

			// Broadcast to all modules FIRST
			this.sendNotification("HOTWORD_DETECTED", payload);
			Log.info("✓ Broadcast sent");

			// Then trigger Assistant
			this.sendNotification("ASSISTANT_ACTIVATE", {
				profile: this.config.assistantProfile
			});
			Log.info("✓ ASSISTANT_ACTIVATE sent");
		}
	},

	notificationReceived: function (notification, payload, sender) {
		Log.info("MMM-VoskHotword received notification:", notification, "from", sender ? sender.name : "system");
	},

	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.style.display = "none";
		return wrapper;
	}
});
