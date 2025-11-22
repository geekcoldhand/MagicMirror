Module.register("weather", {
  defaults: {
    weatherProvider: "openweathermap",
    type: "current",
    location: false,
    locationID: false,
    apiKey: "",
    apiBase: "https://api.openweathermap.org/data/2.5/",
    weatherEndpoint: "/weather",
    units: "imperial",
    roundTemp: false,
    showWindDirection: true,
    showHumidity: false,
    showFeelsLike: true,
    showDescription: true,
    updateInterval: 10 * 60 * 1000,
    animationSpeed: 1000,
    initialLoadDelay: 0,
    iconTable: {
      "01d": "☀️", "02d": "⛅", "03d": "☁️", "04d": "☁️",
      "09d": "🌧️", "10d": "🌧️", "11d": "⛈️", "13d": "❄️", "50d": "🌫️",
      "01n": "🌙", "02n": "☁️", "03n": "☁️", "04n": "☁️",
      "09n": "🌧️", "10n": "🌧️", "11n": "⛈️", "13n": "❄️", "50n": "🌫️"
    }
  },

  start: function() {
    console.log("Weather module started");
    this.weatherData = null;
    this.loaded = false;
    this.scheduleUpdate(this.config.initialLoadDelay);
  },

  getDom: function() {
    const wrapper = document.createElement("div");
    wrapper.className = "weather";

    if (!this.config.apiKey) {
      wrapper.innerHTML = "Please set API key";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    if (!this.loaded) {
      wrapper.innerHTML = "Loading weather...";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    if (!this.weatherData) {
      wrapper.innerHTML = "No weather data";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    const large = document.createElement("div");
    large.className = "large light";

    const weatherIcon = document.createElement("span");
    weatherIcon.className = "weathericon";
    weatherIcon.innerHTML = this.weatherIcon;
    large.appendChild(weatherIcon);

    const temperature = document.createElement("span");
    temperature.className = "temperature bright";
    temperature.innerHTML = " " + this.temperature + "°";
    large.appendChild(temperature);

    wrapper.appendChild(large);

    if (this.config.showDescription) {
      const small = document.createElement("div");
      small.className = "small dimmed";
      small.innerHTML = this.weatherDescription;
      wrapper.appendChild(small);
    }

    if (this.config.showFeelsLike && this.feelsLike) {
      const feelsLike = document.createElement("div");
      feelsLike.className = "small dimmed";
      feelsLike.innerHTML = "Feels like " + this.feelsLike + "°";
      wrapper.appendChild(feelsLike);
    }

    if (this.config.showWindDirection) {
      const wind = document.createElement("div");
      wind.className = "small dimmed wind";
      wind.innerHTML = "Wind: " + this.windSpeed + " " + this.windDirection;
      wrapper.appendChild(wind);
    }

    if (this.config.showHumidity) {
      const humidity = document.createElement("div");
      humidity.className = "small dimmed";
      humidity.innerHTML = "Humidity: " + this.humidity + "%";
      wrapper.appendChild(humidity);
    }

    return wrapper;
  },

  scheduleUpdate: function(delay) {
    let nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }

    const self = this;
    setTimeout(function() {
      self.updateWeather();
    }, nextLoad);
  },

  updateWeather: function() {
    if (!this.config.apiKey) {
      console.log("Weather: No API key");
      return;
    }
    this.sendSocketNotification("GET_WEATHER", { config: this.config });
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "WEATHER_DATA") {
      this.processWeather(payload);
    }
  },

  processWeather: function(data) {
    if (!data || !data.main) {
      console.error("Weather: Invalid data");
      return;
    }

    this.weatherData = data;
    this.temperature = this.roundValue(data.main.temp);
    this.feelsLike = this.roundValue(data.main.feels_like);
    this.humidity = data.main.humidity;
    this.weatherDescription = data.weather[0].description;
    this.weatherIcon = this.config.iconTable[data.weather[0].icon] || "❓";
    this.windSpeed = this.roundValue(data.wind.speed);
    this.windDirection = this.deg2Cardinal(data.wind.deg);

    this.loaded = true;
    this.updateDom(this.config.animationSpeed);
    this.scheduleUpdate();
  },

  roundValue: function(value) {
    return this.config.roundTemp ? Math.round(value) : value.toFixed(1);
  },

  deg2Cardinal: function(deg) {
    if (deg > 11.25 && deg <= 33.75) return "NNE";
    else if (deg > 33.75 && deg <= 56.25) return "NE";
    else if (deg > 56.25 && deg <= 78.75) return "ENE";
    else if (deg > 78.75 && deg <= 101.25) return "E";
    else if (deg > 101.25 && deg <= 123.75) return "ESE";
    else if (deg > 123.75 && deg <= 146.25) return "SE";
    else if (deg > 146.25 && deg <= 168.75) return "SSE";
    else if (deg > 168.75 && deg <= 191.25) return "S";
    else if (deg > 191.25 && deg <= 213.75) return "SSW";
    else if (deg > 213.75 && deg <= 236.25) return "SW";
    else if (deg > 236.25 && deg <= 258.75) return "WSW";
    else if (deg > 258.75 && deg <= 281.25) return "W";
    else if (deg > 281.25 && deg <= 303.75) return "WNW";
    else if (deg > 303.75 && deg <= 326.25) return "NW";
    else if (deg > 326.25 && deg <= 348.75) return "NNW";
    else return "N";
  }
});
