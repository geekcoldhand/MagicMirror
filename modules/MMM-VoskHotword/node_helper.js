const NodeHelper = require("node_helper");
const http = require("http");

module.exports = NodeHelper.create({
	start: function () {
		console.log("Starting MMM-VoskHotword node helper");
		this.config = {
			port: 3000,
			bearerToken: process.env.HOTWORD_BEARER_TOKEN, // ⚠️ MUST MATCH PI 2
			endpoint: "/vosk-hotword"
		};
		this.setupHttpServer();
	},

	setupHttpServer: function () {
		const self = this;

		const server = http.createServer((req, res) => {
			if (req.method === "POST" && req.url === self.config.endpoint) {
				// Check authentication
				const authHeader = req.headers.authorization;
				const expectedAuth = `Bearer ${self.config.bearerToken}`;

				if (authHeader !== expectedAuth) {
					console.error("⚠️  Unauthorized hotword request");
					res.writeHead(401, { "Content-Type": "text/plain" });
					res.end("Unauthorized");
					return;
				}

				let body = "";
				req.on("data", (chunk) => {
					body += chunk.toString();
				});

				req.on("end", () => {
					try {
						const data = JSON.parse(body);
						console.log("═══════════════════════════════════════");
						console.log("🎯 HOTWORD DETECTED");
						console.log(`   Hotword:    ${data.hotword}`);
						console.log(`   Transcript: ${data.transcript}`);
						console.log(`   Source:     ${data.source || "unknown"}`);
						console.log(`   Time:       ${new Date(data.timestamp * 1000).toLocaleString()}`);
						console.log("═══════════════════════════════════════");

						// Send notification to frontend
						self.sendSocketNotification("HOTWORD_DETECTED", {
							hotword: data.hotword,
							transcript: data.transcript,
							source: data.source,
							timestamp: data.timestamp
						});
						console.log("✓ Socket notification sent to frontend");

						res.writeHead(200, { "Content-Type": "text/plain" });
						res.end("OK");
					} catch (error) {
						console.error("⚠️  Parse error:", error);
						res.writeHead(400, { "Content-Type": "text/plain" });
						res.end("Bad Request");
					}
				});
			} else {
				res.writeHead(404, { "Content-Type": "text/plain" });
				res.end("Not Found");
			}
		});

		server.listen(this.config.port, "0.0.0.0", () => {
			console.log(`✓ HTTP server listening on port ${this.config.port}`);
			console.log(`✓ Endpoint: POST ${this.config.endpoint}`);
			console.log(`✓ Authentication enabled`);
		});
	},

	socketNotificationReceived: function (notification, payload) {
		// Handle notifications from frontend if needed
		if (notification === "CONFIG") {
			if (payload.bearerToken) {
				this.config.bearerToken = payload.bearerToken;
			}
		}
	}
});
