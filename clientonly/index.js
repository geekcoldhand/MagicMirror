"use strict";

// Use separate scope to prevent global scope pollution
(function () {
	const config = {};

	/**
	 * Helper function to get server address/hostname from either the commandline or env
	 */
	function getServerAddress() {
		/**
		 * Get command line parameters
		 * This function takes two parameters: the key to look for at the command line, and a default value if no key is given.
		 * It then searches for the key in the command line arguments, and if it finds it, it returns the value after the key.
		 * If the key is not found, it returns the default value.
		 * @param {string} key - the key to look for at the command line
		 * @param {string} defaultValue - the value to return if the key is not found
		 * @returns {string} - the value of the parameter
		 */
		function getCommandLineParameter(key, defaultValue = undefined) {
			// Find the index of the key in the command line arguments
			const index = process.argv.indexOf(`--${key}`);
			// If the key is found, return the value after it
			const value = index > -1 ? process.argv[index + 1] : undefined;
			// If the key is not found, return the default value
			return value !== undefined ? String(value) : defaultValue;
		}

		// Get the address and port from the command line, and if they are not provided, get them from the environment variables
		["address", "port"].forEach((key) => {
			config[key] = getCommandLineParameter(key, process.env[key.toUpperCase()]);
		});

		// Check if the "--use-tls" flag is provided, and if so, set the tls flag in the config object to true
		config["tls"] = process.argv.indexOf("--use-tls") > 0;
	}

	/**
	 * Gets the config from the specified server url
	 * @param {string} url location where the server is running.
	 * @returns {Promise} the config
	 */
	function getServerConfig(url) {
		// Return new pending promise
		return new Promise((resolve, reject) => {
			// Select http or https module, depending on requested url
			const lib = url.startsWith("https") ? require("https") : require("http");
			const request = lib.get(url, (response) => {
				let configData = "";

				// Gather incoming data
				response.on("data", function (chunk) {
					configData += chunk;
				});
				// Resolve promise at the end of the HTTP/HTTPS stream
				response.on("end", function () {
					resolve(JSON.parse(configData));
				});
			});

			request.on("error", function (error) {
				reject(new Error(`Unable to read config from server (${url} (${error.message}`));
			});
		});
	}

	/**
	 * This function is used to print an error message to the console and terminate the program.
	 *
	 * @param {string} message - This is the error message to be printed. If this is omitted or not a string,
	 *                           a generic error message will be printed.
	 * @param {number} code - This is the exit code for the program. If this is omitted, the program will exit with code 1.
	 *                        This is used to indicate the status of the program to the operating system.
	 *                        A code of 0 indicates success, while any other code indicates failure.
	 *
	 * @returns {void} This function does not return anything. Instead, it terminates the program.
	 */
	function fail(message, code = 1) {
		// Check if a message was provided and if it is a string
		if (message !== undefined && typeof message === "string") {
			// If a message was provided, print it to the console
			console.log(message);
		} else {
			// If no message was provided or it was not a string, print a generic error message to the console
			console.log("Usage: 'node clientonly --address 192.168.1.10 --port 8080 [--use-tls]'");
		}
		// Terminate the program with the specified exit code
		process.exit(code);
	}

	getServerAddress();

	(config.address && config.port) || fail();
	const prefix = config.tls ? "https://" : "http://";

	// Only start the client if a non-local server was provided
	if (["localhost", "127.0.0.1", "::1", "::ffff:127.0.0.1", undefined].indexOf(config.address) === -1) {
		getServerConfig(`${prefix}${config.address}:${config.port}/config/`)
			.then(function (configReturn) {
				// Pass along the server config via an environment variable
				const env = Object.create(process.env);
				const options = { env: env };
				configReturn.address = config.address;
				configReturn.port = config.port;
				configReturn.tls = config.tls;
				env.config = JSON.stringify(configReturn);

				// Spawn electron application
				const electron = require("electron");
				const child = require("child_process").spawn(electron, ["js/electron.js"], options);

				// Pipe all child process output to current stdout
				child.stdout.on("data", function (buf) {
					process.stdout.write(`Client: ${buf}`);
				});

				// Pipe all child process errors to current stderr
				child.stderr.on("data", function (buf) {
					process.stderr.write(`Client: ${buf}`);
				});

				child.on("error", function (err) {
					process.stdout.write(`Client: ${err}`);
				});

				child.on("close", (code) => {
					if (code !== 0) {
						console.log(`There something wrong. The clientonly is not running code ${code}`);
					}
				});
			})
			.catch(function (reason) {
				fail(`Unable to connect to server: (${reason})`);
			});
	} else {
		fail();
	}
})();
