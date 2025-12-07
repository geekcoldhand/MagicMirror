const path = require("path");
const NodeHelper = require(path.resolve(__dirname, "../../../js/node_helper.js"));
const fetch = require("node-fetch");
const Log = require("logger");

module.exports = NodeHelper.create({
	start: function () {
		console.log("Weather node helper started");
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "GET_WEATHER") {
			this.getWeather(payload.config);
		}
	},

	getWeather: async function (config) {
		if (!config.apiKey) {
			console.error("Weather: No API key");
			return;
		}

		const url = this.buildUrl(config);

		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.cod === 200) {
				this.sendSocketNotification("WEATHER_DATA", data);
			} else {
				console.error("Weather API error:", data.message);
			}
		} catch (error) {
			console.error("Failed to fetch weather:", error);
		}
	},

	buildUrl: function (config) {
		const baseURL = "https://api.openweathermap.org/data/2.5/weather";

		if (!config.apiKey) {
			Log.error("Weather: API key is missing!");
			return null;
		}

		if (!config.location) {
			Log.error("Weather: Location is missing!");
			return null;
		}

		const params = new URLSearchParams({
			q: config.location,
			units: config.units || "imperial",
			appid: config.apiKey
		});

		const url = `${baseURL}?${params.toString()}`;
		//Log.info(`Weather URL: ${url.substring(0, 90)}...`);

		return url;
	}
});
