Module.register("clock", {
  defaults: {
    displaySeconds: true,
    showDate: true,
    showWeek: false,
    dateFormat: "dddd, LL",
    timeFormat: 12,
    timezone: null,
    displayType: "digital", // digital, analog
    analogSize: "200px",
    analogFace: "simple", // simple, none
    secondsColor: "#888888",
    analogPlacement: "top",
    analogShowDate: "top",
    displayAMPM: true,
    showPeriodUpper: false
  },

  getScripts: function() {
    return ["moment.js"];
  },

  getStyles: function() {
    return ["clock.css"];
  },

  start: function() {
    this.scheduleUpdate();
  },

  getDom: function() {
    const wrapper = document.createElement("div");
    wrapper.className = "clock";

    if (this.config.displayType === "digital") {
      // Digital clock
      const timeWrapper = document.createElement("div");
      timeWrapper.className = "time light";
      
      const now = moment();
      if (this.config.timezone) {
        now.tz(this.config.timezone);
      }

      let timeString;
      if (this.config.timeFormat === 12) {
        timeString = now.format("h:mm");
        if (this.config.displaySeconds) {
          timeString += now.format(":ss");
        }
        
        if (this.config.displayAMPM) {
          const periodWrapper = document.createElement("span");
          periodWrapper.className = "period";
          const period = now.format("A");
          periodWrapper.innerHTML = this.config.showPeriodUpper ? period : period.toLowerCase();
          timeWrapper.innerHTML = timeString + " ";
          timeWrapper.appendChild(periodWrapper);
        } else {
          timeWrapper.innerHTML = timeString;
        }
      } else {
        timeString = now.format("HH:mm");
        if (this.config.displaySeconds) {
          timeString += now.format(":ss");
        }
        timeWrapper.innerHTML = timeString;
      }

      wrapper.appendChild(timeWrapper);

      // Date
      if (this.config.showDate) {
        const dateWrapper = document.createElement("div");
        dateWrapper.className = "date small dimmed";
        dateWrapper.innerHTML = now.format(this.config.dateFormat);
        wrapper.appendChild(dateWrapper);
      }

      // Week
      if (this.config.showWeek) {
        const weekWrapper = document.createElement("div");
        weekWrapper.className = "week dimmed";
        weekWrapper.innerHTML = "Week " + now.week();
        wrapper.appendChild(weekWrapper);
      }
    } else {
      // Analog clock
      wrapper.innerHTML = "Analog clock coming soon";
    }

    return wrapper;
  },

  scheduleUpdate: function() {
    const self = this;
    let delay = 1000; // Update every second
    
    if (!this.config.displaySeconds) {
      delay = 1000 - (moment().milliseconds()); // Update at top of minute
    }

    setTimeout(function() {
      self.updateDom();
      self.scheduleUpdate();
    }, delay);
  }
});