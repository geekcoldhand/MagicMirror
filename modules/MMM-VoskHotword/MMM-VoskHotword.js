Module.register("MMM-VoskHotword", {
	defaults: {
		assistantProfile: "default"
	},

	start: function () {
		Log.info("MMM-VoskHotword: External Pi 2 hotword detection mode");
		Log.info("MMM-VoskHotword: Ready to receive socket notifications");

		// this.sendSocketNotification("CONFIG", {
		// 	assistantProfile: this.config.assistantProfile
		// });
		this.sendNotification("ASSISTANT_ACTIVATE", {
			type: "TEXT",
			profile: this.config.assistantProfile,
			profileFile: "default.json", // Add this
			lang: "en-US", // Add this
			key: payload.query
		});
	},

	socketNotificationReceived: function (notification, payload) {
		console.log("=== MMM-VoskHotword socketNotificationReceived ===");
		console.log("Payload:", payload);

		if (notification === "HOTWORD_DETECTED") {
			console.log("🎯 Hotword detected:", payload.hotword);
			console.log("Full transcript:", payload.transcript);

			// Show wake animation
			//this.sendNotification("ASSISTANT_ACTIVATE", payload);

			// Extract query after hotword
			const query = this.extractQuery(payload.transcript, payload.hotword);

			if (query && query.length > 0) {
				console.log("Sending TEXT query to Assistant:", query);

				// Send as TEXT query
				this.sendNotification("ASSISTANT_ACTIVATE", {
					type: "TEXT",
					profile: this.config.assistantProfile,
					key: query
				});
			} else {
				console.log("No query found, just hotword. Not activating Assistant.");
				// Don't activate - just the hotword was said
			}
		}
	},

	extractQuery: function (transcript, hotword) {
		// Remove hotword from transcript
		const lowerTranscript = transcript.toLowerCase();
		const lowerHotword = hotword.toLowerCase();

		const index = lowerTranscript.indexOf(lowerHotword);
		if (index !== -1) {
			const query = transcript.substring(index + hotword.length).trim();
			return query;
		}

		return "";
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
