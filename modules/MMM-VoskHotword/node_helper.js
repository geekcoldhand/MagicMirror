const NodeHelper = require("node_helper");
const { spawn } = require("child_process");
const path = require("path");

module.exports = NodeHelper.create({
	start() {
		this.proc = null;
		console.log("MMM-VoskHotword helper started");
	},

	socketNotificationReceived(notification, payload) {
		if (notification === "START_HOTWORD") {
			this.startListener(payload);
		}
		if (notification === "STOP_HOTWORD") {
			this.stopListener();
		}
	},

	startListener(config) {
		if (this.proc) return;

		const script = path.join(__dirname, "hotword_listener.py");

		this.proc = spawn("python3", [script], {
			cwd: __dirname
		});

		this.proc.stdout.on("data", (data) => {
			try {
				const msg = JSON.parse(data.toString());
				if (msg.event === "HOTWORD") {
					this.sendSocketNotification("HOTWORD_DETECTED", msg);
				}
			} catch (_) {}
		});

		this.proc.stderr.on("data", (err) => {
			console.error("Vosk error:", err.toString());
		});

		console.log("Python hotword listener started");
	},

	stopListener() {
		if (!this.proc) return;
		this.proc.kill();
		this.proc = null;
		console.log("Python hotword listener stopped");
	}
});
