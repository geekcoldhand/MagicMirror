const NodeHelper = require("node_helper");
const { spawn } = require("child_process");
const path = require("path");

module.exports = NodeHelper.create({
	start() {
		this.proc = null;
		this.buffer = "";
		this.paused = false;
		console.log("MMM-VoskHotword helper started");
	},

	socketNotificationReceived(notification, payload) {
		switch (notification) {
			case "START_HOTWORD":
				this.startListener(payload);
				break;

			case "STOP_HOTWORD":
				this.stopListener();
				break;

			case "PAUSE_HOTWORD":
				this.paused = true;
				console.log("Hotword paused");
				break;

			case "RESUME_HOTWORD":
				this.paused = false;
				console.log("Hotword resumed");
				break;
		}
	},

	startListener(config) {
		if (this.proc) return;

		const script = path.join(__dirname, "hotword_listener.py");

		this.proc = spawn("python3", [script], {
			cwd: __dirname,
			stdio: ["ignore", "pipe", "pipe"]
		});

		this.proc.stdout.on("data", (chunk) => {
			this.buffer += chunk.toString();

			let lines = this.buffer.split("\n");
			this.buffer = lines.pop(); // keep incomplete line

			for (const line of lines) {
				if (!line.trim()) continue;

				try {
					const msg = JSON.parse(line);

					if (msg.event === "HOTWORD" && !this.paused) {
						console.log("HOTWORD event received:", msg.hotword);
						this.sendSocketNotification("HOTWORD_DETECTED", msg);
					}
				} catch (e) {
					console.error("JSON parse error:", line);
				}
			}
		});

		this.proc.stderr.on("data", (err) => {
			console.error("Python stderr:", err.toString());
		});

		this.proc.on("exit", (code) => {
			console.log("Python listener exited:", code);
			this.proc = null;
		});

		console.log("Python hotword listener started");
	},

	stopListener() {
		if (!this.proc) return;
		this.proc.kill("SIGTERM");
		this.proc = null;
		console.log("Python hotword listener stopped");
	}
});
