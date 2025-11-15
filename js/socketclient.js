/* global io */

/* MagicMirror²
 * TODO add description
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
const MMSocket = function (moduleName) {
	// Check if a module name is provided
	if (typeof moduleName !== "string") {
		// If not, throw an error
		throw new Error("Please set the module name for the MMSocket.");
	}

	// Store the module name
	this.moduleName = moduleName;

	// Set the base path to "/"
	let base = "/";

	// Check if the config object and basePath property exist
	if (typeof config !== "undefined" && typeof config.basePath !== "undefined") {
		// If they do, use the value of basePath as the base path
		base = config.basePath;
	}

	// Connect to the server using the module name as the path
	this.socket = io(`/${this.moduleName}`, {
		// Set the path to the socket.io server
		path: `${base}socket.io`
	});

	// Set up a default notification callback function
	let notificationCallback = function () {};

	// Save a reference to the original onevent method
	const onevent = this.socket.onevent;

	// Override the onevent method to add a catch-all
	this.socket.onevent = (packet) => {
		// Get the data from the packet or an empty array if it doesn't exist
		const args = packet.data || [];
		// Call the original onevent method
		onevent.call(this.socket, packet);
		// Add the notification to the data and call the original onevent method again
		packet.data = ["*"].concat(args);
		onevent.call(this.socket, packet);
	};

	// Register a catch-all for all notifications
	this.socket.on("*", (notification, payload) => {
		// If the notification is not a catch-all notification
		if (notification !== "*") {
			// Call the notification callback with the notification and payload
			notificationCallback(notification, payload);
		}
	});

	// Public method to set the notification callback
	this.setNotificationCallback = (callback) => {
		// Set the notification callback to the provided callback function
		notificationCallback = callback;
	};

	// Public method to send a notification
	this.sendNotification = (notification, payload = {}) => {
		// Emit the notification with the provided payload
		this.socket.emit(notification, payload);
	};
};
