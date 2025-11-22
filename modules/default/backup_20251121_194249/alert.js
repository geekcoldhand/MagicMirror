
Module.register("alert", {
	alerts: [],

	defaults: {
		displayTime: 3500,
		position: "center",
		effect: "slide"
	},

	getStyles: function () {
		return ["alert.css"];
	},

	start: function () {
		Log.info("Starting module: alert");
	},

	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.className = "alert-wrapper";

		if (this.alerts.length === 0) {
			wrapper.style.display = "none";
			return wrapper;
		}

		const alert = this.alerts[0];
		const alertDiv = document.createElement("div");
		alertDiv.className = "alert " + (alert.type || "");

		if (alert.title) {
			const titleDiv = document.createElement("div");
			titleDiv.className = "alert-title";
			titleDiv.innerHTML = alert.title;
			alertDiv.appendChild(titleDiv);
		}

		if (alert.message) {
			const messageDiv = document.createElement("div");
			messageDiv.className = "alert-message";
			messageDiv.innerHTML = alert.message;
			alertDiv.appendChild(messageDiv);
		}

		wrapper.appendChild(alertDiv);
		return wrapper;
	},

	notificationReceived: function (notification, payload, sender) {
		if (notification === "SHOW_ALERT") {
			this.showAlert(payload);
		} else if (notification === "HIDE_ALERT") {
			this.hideAlert();
		}
	},

	showAlert: function (alert) {
		this.alerts.push(alert);
		this.updateDom(300);

		if (alert.timer) {
			const self = this;
			setTimeout(function () {
				self.hideAlert();
			}, alert.timer || this.config.displayTime);
		}
	},

	hideAlert: function () {
		this.alerts.shift();
		this.updateDom(300);
	}
});
