Module.register("calendar", {
	defaults: {
		calendars: [],
		maximumEntries: 10,
		maximumNumberOfDays: 365,
		displaySymbol: true,
		defaultSymbol: "calendar",
		showLocation: false,
		displayRepeatingCountTitle: false,
		defaultRepeatingCountTitle: "",
		maxTitleLength: 25,
		maxLocationTitleLength: 25,
		wrapEvents: false,
		wrapLocationEvents: false,
		maxTitleLines: 3,
		maxEventTitleLines: 3,
		fetchInterval: 5 * 60 * 1000, // 5 minutes
		animationSpeed: 2000,
		fade: true,
		fadePoint: 0.25,
		colored: false,
		coloredSymbolOnly: false,
		tableClass: "small",
		urgency: 7,
		timeFormat: "relative",
		dateFormat: "MMM Do",
		dateEndFormat: "LT",
		fullDayEventDateFormat: "MMM Do",
		showEnd: false,
		getRelative: 6,
		hidePrivate: false,
		hideOngoing: false,
		broadcastEvents: true,
		broadcastPastEvents: false,
		nextDaysRelative: false,
		sliceMultiDayEvents: false
	},

	getStyles: function () {
		return ["calendar.css"];
	},

	getScripts: function () {
		return ["moment.js"];
	},

	start: function () {
		this.events = [];
		this.loaded = false;
		this.fetchCalendars();
		this.scheduleUpdate();
	},

	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.className = this.config.tableClass;

		if (this.config.calendars.length === 0) {
			wrapper.innerHTML = "Please add calendar URLs in config.";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (!this.loaded) {
			wrapper.innerHTML = "Loading calendar...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (this.events.length === 0) {
			wrapper.innerHTML = "No upcoming events";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		const table = document.createElement("table");
		table.className = "calendar";

		for (let e = 0; e < this.events.length; e++) {
			const event = this.events[e];
			const row = document.createElement("tr");
			row.className = "event";

			// Symbol
			if (this.config.displaySymbol) {
				const symbolCell = document.createElement("td");
				symbolCell.className = "symbol";
				symbolCell.innerHTML = event.symbol || this.config.defaultSymbol;
				row.appendChild(symbolCell);
			}

			// Title
			const titleCell = document.createElement("td");
			titleCell.className = "title bright";
			titleCell.innerHTML = this.titleTransform(event.title);
			row.appendChild(titleCell);

			// Time
			const timeCell = document.createElement("td");
			timeCell.className = "time light";
			timeCell.innerHTML = this.timeTransform(event);
			row.appendChild(timeCell);

			table.appendChild(row);
		}

		wrapper.appendChild(table);
		return wrapper;
	},

	titleTransform: function (title) {
		if (title.length > this.config.maxTitleLength) {
			return title.substring(0, this.config.maxTitleLength) + "...";
		}
		return title;
	},

	timeTransform: function (event) {
		if (event.fullDayEvent) {
			return moment(event.startDate).format(this.config.fullDayEventDateFormat);
		}

		if (this.config.timeFormat === "relative") {
			return moment(event.startDate).fromNow();
		}

		return moment(event.startDate).format(this.config.dateFormat + " " + this.config.dateEndFormat);
	},

	scheduleUpdate: function () {
		const self = this;
		setInterval(function () {
			self.updateDom(self.config.animationSpeed);
		}, 60000); // Update display every minute
	},

	fetchCalendars: function () {
		this.sendSocketNotification("FETCH_CALENDARS", {
			calendars: this.config.calendars,
			maximumEntries: this.config.maximumEntries,
			maximumNumberOfDays: this.config.maximumNumberOfDays
		});

		const self = this;
		setTimeout(function () {
			self.fetchCalendars();
		}, this.config.fetchInterval);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "CALENDAR_EVENTS") {
			this.events = payload;
			this.loaded = true;
			this.updateDom(this.config.animationSpeed);
		}
	}
});
