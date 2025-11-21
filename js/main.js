const MM = {
	modules: [],

	async init() {
		console.log("Initializing MagicMirror²");

		// Load all modules
		await Loader.loadModules();
		this.modules = Loader.getLoadedModules();

		// Create DOM for all modules
		this.createDomObjects();

		console.log("MagicMirror² initialized");
	},

	createDomObjects() {
		this.modules.forEach((module) => {
			const wrapper = this.selectWrapper(module.data.position);
			const dom = document.createElement("div");
			dom.id = module.identifier;
			dom.className = "module";

			if (module.hidden) {
				dom.style.display = "none";
			}

			wrapper.appendChild(dom);

			this.updateModule(module);
		});
	},

	selectWrapper(position) {
		const wrapper = document.querySelector(`.region.${position}`);
		if (!wrapper) {
			console.error(`Position not found: ${position}`);
			return document.body;
		}
		return wrapper;
	},

	updateModule(module, speed) {
		const dom = document.getElementById(module.identifier);
		if (!dom) return;

		const content = module.getDom();
		const header = module.getHeader();

		dom.innerHTML = "";

		if (header) {
			const headerElement = document.createElement("header");
			headerElement.className = "module-header";
			headerElement.innerHTML = header;
			dom.appendChild(headerElement);
		}

		if (content) {
			const contentWrapper = document.createElement("div");
			contentWrapper.className = "module-content";
			contentWrapper.appendChild(content);
			dom.appendChild(contentWrapper);
		}

		if (module.hidden) {
			dom.style.display = "none";
		} else {
			dom.style.display = "block";
		}
	},

	sendNotification(notification, payload, sender) {
		this.modules.forEach((module) => {
			if (module !== sender) {
				module.notificationReceived(notification, payload, sender);
			}
		});
	},

	getModuleByName(name) {
		return this.modules.find((m) => m.name === name);
	}
};

window.MM = MM;

// Start when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
	MM.init();
});
