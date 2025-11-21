const NodeHelper = require("node_helper");
const ical = require("node-ical");
const Log = require("logger");

module.exports = NodeHelper.create({
	start: function () {
		Log.info("Starting node helper: calendar");
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "FETCH_CALENDARS") {
			this.fetchCalendars(payload);
		}
	},

	fetchCalendars: async function (config) {
		const allEvents = [];

		for (const calendar of config.calendars) {
			try {
				const events = await this.fetchCalendar(calendar.url, config);
				allEvents.push(...events);
			} catch (error) {
				Log.error("Failed to fetch calendar:", calendar.url, error);
			}
		}

		// Sort events by start date
		allEvents.sort((a, b) => a.startDate - b.startDate);

		// Limit to maximum entries
		const limitedEvents = allEvents.slice(0, config.maximumEntries);

		this.sendSocketNotification("CALENDAR_EVENTS", limitedEvents);
	},

	fetchCalendar: async function (url, config) {
		const data = await ical.async.fromURL(url);
		const events = [];
		const now = new Date();
		const maxDate = new Date();
		maxDate.setDate(maxDate.getDate() + config.maximumNumberOfDays);

		for (const k in data) {
			const event = data[k];

			if (event.type !== "VEVENT") continue;

			const startDate = new Date(event.start);
			const endDate = new Date(event.end);

			if (startDate < maxDate && endDate > now) {
				events.push({
					title: event.summary,
					startDate: startDate,
					endDate: endDate,
					fullDayEvent: this.isFullDayEvent(event),
					location: event.location || "",
					symbol: "calendar"
				});
			}
		}

		return events;
	},

	isFullDayEvent: function (event) {
		return event.start.dateOnly || false;
	}
});
