Module.register("MMM-NotificationTrigger", {
	defaults: {
		triggers: []
	},

	start: function () {
		Log.info("Starting module: " + this.name);
	},

	notificationReceived: function (notification, payload, sender) {
		// Check if this notification matches any triggers
		for (let triggerConfig of this.config.triggers) {
			if (notification === triggerConfig.trigger) {
				Log.info("MMM-NotificationTrigger: Trigger matched - " + notification);
				this.processTrigger(triggerConfig, payload);
			}
		}
	},

	processTrigger: function (triggerConfig, originalPayload) {
		if (!triggerConfig.fires || !Array.isArray(triggerConfig.fires)) {
			return;
		}

		// Process each notification that should be fired
		for (let fireConfig of triggerConfig.fires) {
			const delay = fireConfig.delay || 0;
			const notificationToFire = fireConfig.fire;

			// Determine payload
			let payloadToSend = originalPayload;

			if (fireConfig.payload) {
				if (typeof fireConfig.payload === "function") {
					// Execute payload function
					payloadToSend = fireConfig.payload(originalPayload);
				} else {
					// Use static payload
					payloadToSend = fireConfig.payload;
				}
			}

			// Fire the notification (with delay if specified)
			if (delay > 0) {
				setTimeout(() => {
					Log.info("MMM-NotificationTrigger: Firing " + notificationToFire);
					this.sendNotification(notificationToFire, payloadToSend);
				}, delay);
			} else {
				Log.info("MMM-NotificationTrigger: Firing " + notificationToFire);
				this.sendNotification(notificationToFire, payloadToSend);
			}
		}
	},

	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.style.display = "none"; // This module has no visible UI
		return wrapper;
	}
});
