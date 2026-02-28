Module.register("MMM-WakeAnimation", {
	defaults: {
		animationSpeed: 1000,
		gifUrl: "modules/MMM-WakeAnimation/public/mirror.gif",
		showOnWake: true,
		displayTime: 7000 // 3 sec
	},

	start: function () {
		console.log("Wake Animation module started");
		this.isVisible = false;
		this.hideTimer = null; // Track the timer
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
		console.log("MMM-WakeAnimation received:", notification); // Added logging

		// MMM-AssistantMk2 notifications
		if (notification === "ASSISTANT_LISTENING" || notification === "ASSISTANT_THINK") {
			this.showAnimation();
		}

		// other notification systems
		if (notification === "HOTWORD_DETECTED" || notification === "TRANSCRIPTION") {
			this.showAnimation();
		}

		if (notification === "ASSISTANT_DEACTIVATED") {
			this.hideAnimation();
		}
	},

	showAnimation: function () {
		console.log("Showing wake animation");
		this.isVisible = true;
		this.updateDom(this.config.animationSpeed);

		// Clear any existing timer before starting a new one
		if (this.hideTimer) {
			clearTimeout(this.hideTimer);
		}

		// Auto-hide after displayTime
		const self = this;
		this.hideTimer = setTimeout(function () {
			self.hideAnimation();
		}, this.config.displayTime);
	},

	hideAnimation: function () {
		console.log("Hiding wake animation");
		this.isVisible = false;
		this.updateDom(this.config.animationSpeed);

		// Clear the timer when manually hiding
		if (this.hideTimer) {
			clearTimeout(this.hideTimer);
			this.hideTimer = null;
		}
	}
});
