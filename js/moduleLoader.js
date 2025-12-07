const path = require("path");
const fs = require("fs").promises;
const Log = require("logger");

async function loadModuleHelpers(modules, io) {
	const loadedHelpers = [];

	for (const module of modules) {
		const helperPath = path.resolve(__dirname, `../modules/default/${module.module}/node_helper.js`);

		try {
			await fs.access(helperPath);

			Log.info(`Loading node helper: ${module.module}`);
			//Log.info(`Node helper path: ${helperPath}`);

			// Clear require cache to reload fresh
			delete require.cache[require.resolve(helperPath)];

			const NodeHelperModule = require(helperPath);
			let nodeHelper;
			if (typeof NodeHelperModule.create === "function") {
				nodeHelper = NodeHelperModule.create();
			} else if (typeof NodeHelperModule === "object" && NodeHelperModule.setName) {
				nodeHelper = NodeHelperModule;
			} else {
				throw new Error(`Invalid node helper format for ${module.module}`);
			}

			nodeHelper.setName(module.module);
			nodeHelper.setPath(path.dirname(helperPath));
			nodeHelper.setSocketIO(io);

			const namespace = io.of(`/${module.module}`);

			namespace.on("connection", (socket) => {
				//	Log.info(`Socket connected for module: ${module.module}`);

				socket.onAny((notification, payload) => {
					//	if (notification !== "ping" && notification !== "heartbeat") {
					//	Log.info(`[${module.module}] ${notification}`);
					//	}
					nodeHelper.socketNotificationReceived(notification, payload);
				});
			});

			if (nodeHelper.init) nodeHelper.init();
			if (nodeHelper.start) nodeHelper.start();

			loadedHelpers.push(nodeHelper);
			Log.info(`Loaded node helper: ${module.module}`);
		} catch (error) {
			if (error.code !== "ENOENT") {
				Log.error(`Error loading node helper for ${module.module}:`, error);
			}
		}
	}

	return loadedHelpers;
}

module.exports = { loadModuleHelpers };
