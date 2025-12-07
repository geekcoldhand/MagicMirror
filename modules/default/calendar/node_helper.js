const path = require("path");
const NodeHelper = require(path.resolve(__dirname, "../../../js/node_helper.js"));
const ical = require("node-ical");
const Log = require("logger");

module.exports = NodeHelper.create({
	start: function () {
		Log.info("Starting node helper: calendar");
		this.fetchers = {};
		this.failureCounts = {};
		this.lastAttempt = {}; // Track last attempt time
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "FETCH_CALENDARS") {
			this.fetchCalendars(payload);
		}
	},

	fetchCalendars: async function (config) {
		const allEvents = [];

		for (const calendar of config.calendars) {
			// Initialize tracking for this URL
			if (!this.failureCounts[calendar.url]) {
				this.failureCounts[calendar.url] = 0;
				this.lastAttempt[calendar.url] = 0;
			}

			// Skip if too many recent failures (backoff)
			const now = Date.now();
			const timeSinceLastAttempt = now - this.lastAttempt[calendar.url];

			if (this.failureCounts[calendar.url] >= 3) {
				// Only retry after 5 minutes
				if (timeSinceLastAttempt < 5 * 60 * 1000) {
					// Silent skip - don't log anything
					continue;
				} else {
					// Enough time has passed, reset and try again
					Log.info(`Retrying calendar after cooldown: ${calendar.url.substring(0, 50)}...`);
					this.failureCounts[calendar.url] = 0;
				}
			}

			this.lastAttempt[calendar.url] = now;

			try {
				const events = await this.fetchCalendar(calendar.url, config);
				allEvents.push(...events);

				// Reset failure count on success
				this.failureCounts[calendar.url] = 0;
			} catch (error) {
				this.failureCounts[calendar.url]++;

				// Only log the FIRST failure for this URL
				if (this.failureCounts[calendar.url] === 1) {
					Log.error(`Failed to fetch calendar: ${error.code || error.message}`);
				} else if (this.failureCounts[calendar.url] === 3) {
					// Log once when it hits the threshold
					Log.error(`Calendar disabled after 3 failures: ${calendar.url.substring(0, 50)}...`);
				}
				// All other failures: silent
			}
		}

		// Sort events by start date
		allEvents.sort((a, b) => a.startDate - b.startDate);

		// Limit to maximum entries
		const limitedEvents = allEvents.slice(0, config.maximumEntries);

		this.sendSocketNotification("CALENDAR_EVENTS", limitedEvents);
	},

	fetchCalendar: async function (url, config) {
		// Add timeout to prevent hanging
		const timeoutPromise = new Promise((_, reject) => {
			setTimeout(() => reject(new Error("Request timeout")), 10000);
		});

		const fetchPromise = ical.async.fromURL(url, {
			headers: {
				"User-Agent": "MagicMirror/2.0"
			}
		});

		// Race between fetch and timeout
		const data = await Promise.race([fetchPromise, timeoutPromise]);

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
