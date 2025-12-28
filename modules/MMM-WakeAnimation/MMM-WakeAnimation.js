Module.register("MMM-WakeAnimation", {
	defaults: {
		animationSpeed: 1000,
		gifUrl: "mirror.gif",
		showOnWake: true,
		displayTime: 3000 // 3 sec
	},

	start: function () {
		console.log("Wake Animation module started");
		this.isVisible = false;
	},

	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.className = "wake-animation-wrapper";

		if (!this.isVisible) {
			wrapper.style.display = "none";
		}

		const img = document.createElement("img");
		img.src = this.config.gifUrl;
		img.className = "wake-animation-gif";

		wrapper.appendChild(img);
		return wrapper;
	},

	getStyles: function () {
		return ["MMM-WakeAnimation.css"];
	},

	notificationReceived: function (notification, payload, sender) {
		// Show animation when Assistant activates
		if (notification === "ASSISTANT_ACTIVATED") {
			this.showAnimation();
		}

		// Hide when Assistant deactivates
		if (notification === "ASSISTANT_DEACTIVATED") {
			this.hideAnimation();
		}

		// Also respond to hotword detection
		if (notification === "HOTWORD_DETECTED") {
			this.showAnimation();
		}
	},

	showAnimation: function () {
		console.log("Showing wake animation");
		this.isVisible = true;
		this.updateDom(this.config.animationSpeed);

		// Auto-hide after displayTime
		const self = this;
		setTimeout(function () {
			self.hideAnimation();
		}, this.config.displayTime);
	},

	hideAnimation: function () {
		console.log("Hiding wake animation");
		this.isVisible = false;
		this.updateDom(this.config.animationSpeed);
	}
});
