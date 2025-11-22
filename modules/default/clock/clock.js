Module.register("clock", {
  defaults: {
    displaySeconds: true,
    showDate: true,
    showWeek: false,
    dateFormat: "dddd, LL",
    timeFormat: 12,
    timezone: null,
    displayType: "digital",
    analogSize: "200px",
    analogFace: "simple",
    secondsColor: "#888888",
    analogPlacement: "top",
    analogShowDate: "top",
    displayAMPM: true,
    showPeriodUpper: false
  },

  start: function() {
    console.log("Clock module started");
    this.scheduleUpdate();
  },

  getDom: function() {
    const wrapper = document.createElement("div");
    wrapper.className = "clock";

    const now = new Date();
    
    const timeWrapper = document.createElement("div");
    timeWrapper.className = "time light";
    
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    if (this.config.timeFormat === 12) {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      
      let timeString = hours + ":" + (minutes < 10 ? "0" : "") + minutes;
      
      if (this.config.displaySeconds) {
        timeString += ":" + (seconds < 10 ? "0" : "") + seconds;
      }
      
      if (this.config.displayAMPM) {
        timeString += " <span class='period'>" + ampm + "</span>";
      }
      
      timeWrapper.innerHTML = timeString;
    } else {
      let timeString = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
      
      if (this.config.displaySeconds) {
        timeString += ":" + (seconds < 10 ? "0" : "") + seconds;
      }
      
      timeWrapper.innerHTML = timeString;
    }

    wrapper.appendChild(timeWrapper);

    if (this.config.showDate) {
      const dateWrapper = document.createElement("div");
      dateWrapper.className = "date small dimmed";
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateWrapper.innerHTML = now.toLocaleDateString('en-US', options);
      wrapper.appendChild(dateWrapper);
    }

    if (this.config.showWeek) {
      const weekWrapper = document.createElement("div");
      weekWrapper.className = "week dimmed";
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
      const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
      weekWrapper.innerHTML = "Week " + weekNumber;
      wrapper.appendChild(weekWrapper);
    }

    return wrapper;
  },

  scheduleUpdate: function() {
    const self = this;
    const delay = this.config.displaySeconds ? 1000 : 60000;

    setTimeout(function() {
      self.updateDom();
      self.scheduleUpdate();
    }, delay);
  }
});
