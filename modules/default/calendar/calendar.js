

Module.register("calendar", {
	defaults: {
		maximumEntries: 10,
		maximumNumberOfDays: 365,
		displaySymbol: true,
		defaultSymbol: "calendar",
		showLocation: false,
		displayRepeatingCountTitle: false,
		dateFormat: "MMM DD",
		fullDayEventDateFormat: "MMM DD",
		timeFormat: "relative",
		urgency: 7,
		getRelative: 6,
		fadePoint: 0.25,
		hidePrivate: false,
		hideOngoing: false,
		colored: false,
		coloredSymbolOnly: false,
		calendars: [
			{
				symbol: "calendar",
				url: "https://www.calendarlabs.com/templates/ical/US-Holidays.ics"
			}
		],
		titleReplace: {},
		broadcastEvents: true,
		excludedEvents: [],
		sliceMultiDayEvents: false,
		fetchInterval: 60000 * 5, // 5 minutes
		animationSpeed: 2000,
		fade: true
	},

	requiresVersion: "2.1.0",

	start() {
		Log.info(`Starting module: ${this.name}`);
		this.loaded = false;
		this.events = [];
		this.sendSocketNotification("ADD_CALENDARS", this.config.calendars);
	},

	socketNotificationReceived(notification, payload) {
		if (notification === "CALENDAR_EVENTS") {
			if (this.hasCalendarURL(payload.url)) {
				this.events = this.events.concat(payload.events);
				this.loaded = true;
				this.updateDom(this.config.animationSpeed);
			}
		} else if (notification === "FETCH_ERROR") {
			Log.error("Calendar Error. Could not fetch calendar: ", payload.url);
		}
	},

	getDom() {
		const wrapper = document.createElement("div");
		wrapper.className = "calendar";

		if (!this.loaded) {
			wrapper.innerHTML = this.translate("LOADING");
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (this.events.length === 0) {
			wrapper.innerHTML = this.translate("EMPTY");
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		const table = document.createElement("table");
		table.className = "small";

		this.events.slice(0, this.config.maximumEntries).forEach((event) => {
			const row = this.createEventRow(event);
			table.appendChild(row);
		});

		wrapper.appendChild(table);
		return wrapper;
	},

	createEventRow(event) {
		const row = document.createElement("tr");
		row.className = "normal";

		// Symbol column
		if (this.config.displaySymbol) {
			const symbolCell = document.createElement("td");
			symbolCell.className = "symbol align-right";

			const symbol = document.createElement("span");
			symbol.className = `fa fa-${event.symbol || this.config.defaultSymbol}`;
			if (this.config.colored && event.color) {
				symbol.style.color = event.color;
			}

			symbolCell.appendChild(symbol);
			row.appendChild(symbolCell);
		}

		// Title column
		const titleCell = document.createElement("td");
		titleCell.className = "title bright";
		titleCell.innerHTML = this.titleTransform(event.title);
		row.appendChild(titleCell);

		// Time column
		const timeCell = document.createElement("td");
		timeCell.className = "time light";
		timeCell.innerHTML = this.formatEventTime(event);
		row.appendChild(timeCell);

		return row;
	},

	formatEventTime(event) {
		const now = new Date();
		const start = new Date(event.startDate);
		const end = new Date(event.endDate);

		// Full day event
		if (event.fullDayEvent) {
			if (this.isToday(start)) {
				return this.translate("TODAY");
			} else if (this.isTomorrow(start)) {
				return this.translate("TOMORROW");
			} else {
				return this.formatDate(start);
			}
		}

		// Time-based event
		if (this.config.timeFormat === "relative") {
			const diff = start - now;
			const hours = Math.floor(diff / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

			if (hours < 0) {
				return this.translate("RUNNING");
			} else if (hours === 0) {
				return `${minutes} ${this.translate("MINUTES")}`;
			} else if (hours < 24) {
				return `${hours} ${this.translate("HOURS")}`;
			} else {
				const days = Math.floor(hours / 24);
				return `${days} ${this.translate("DAYS")}`;
			}
		} else {
			return this.formatTime(start);
		}
	},

	// Native Date helper methods (no moment.js!)
	isToday(date) {
		const now = new Date();
		return date.toDateString() === now.toDateString();
	},

	isTomorrow(date) {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return date.toDateString() === tomorrow.toDateString();
	},

	formatDate(date) {
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return `${months[date.getMonth()]} ${date.getDate()}`;
	},

	formatTime(date) {
		let hours = date.getHours();
		const minutes = date.getMinutes();
		const ampm = hours >= 12 ? "PM" : "AM";

		hours = hours % 12;
		hours = hours ? hours : 12;
		const minutesStr = minutes < 10 ? "0" + minutes : minutes;

		return `${hours}:${minutesStr} ${ampm}`;
	},

	titleTransform(title) {
		for (const [needle, replacement] of Object.entries(this.config.titleReplace)) {
			const regex = new RegExp(needle, "gi");
			title = title.replace(regex, replacement);
		}
		return title;
	},

	hasCalendarURL(url) {
		return this.config.calendars.some((calendar) => calendar.url === url);
	},

	getScripts() {
		return [];
	},

	getStyles() {
		return ["calendar.css", "font-awesome.css"];
	},

	getTranslations() {
		return {
			en: "translations/en.json",
			de: "translations/de.json",
			nl: "translations/nl.json"
		};
	}
});
