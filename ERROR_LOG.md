# Download lightweight English model (40MB)

wget https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip

# Extract

unzip vosk-model-small-en-us-0.15.zip

# Rename to "model"

mv vosk-model-small-en-us-0.15 model

# Clean up zip file

rm vosk-model-small-en-us-0.15.zip

# Verify model exists

ls -lh model/

# Should see: am/, conf/, graph/, ivector/

geek-pi@raspberrypi:~/MagicMirror $ npm run server

> magicmirror@2.24.0 server
> node ./serveronly

[2026-01-02 22:36:53.445] [LOG] Starting MagicMirror: v2.24.0
[2026-01-02 22:36:53.459] [LOG] Loading config ...
[2026-01-02 22:36:53.476] [DEBUG] config template file not exists, no envsubst
[2026-01-02 22:36:53.504] [LOG] Loading module helpers ...
[2026-01-02 22:36:53.513] [LOG] No helper found for module: MMM-WakeAnimation.
[2026-01-02 22:36:53.582] [ERROR] Whoops! There was an uncaught exception...
[2026-01-02 22:36:53.615] [ERROR] Error: Cannot find module 'vosk'
Require stack:

- /home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_helper.js
- /home/geek-pi/MagicMirror/js/app.js
- /home/geek-pi/MagicMirror/serveronly/index.js
  at Module.\_resolveFilename (node:internal/modules/cjs/loader:1077:15)
  at Module.\_resolveFilename (/home/geek-pi/MagicMirror/node_modules/module-alias/index.js:49:29)
  at Module.\_load (node:internal/modules/cjs/loader:922:27)
  at Module.require (node:internal/modules/cjs/loader:1143:19)
  at require (node:internal/modules/cjs/helpers:121:18)
  at Object.<anonymous> (/home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_helper.js:2:14)
  at Module.\_compile (node:internal/modules/cjs/loader:1256:14)
  at Module.\_extensions..js (node:internal/modules/cjs/loader:1310:10)
  at Module.load (node:internal/modules/cjs/loader:1119:32)
  at Module.\_load (node:internal/modules/cjs/loader:960:12)
  at Module.require (node:internal/modules/cjs/loader:1143:19)
  at require (node:internal/modules/cjs/helpers:121:18)
  at loadModule (/home/geek-pi/MagicMirror/js/app.js:180:19)
  at loadModules (/home/geek-pi/MagicMirror/js/app.js:210:10)
  at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
  at async App.start (/home/geek-pi/MagicMirror/js/app.js:258:3) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
  '/home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_helper.js',
  '/home/geek-pi/MagicMirror/js/app.js',
  '/home/geek-pi/MagicMirror/serveronly/index.js'
  ]
  }
  [2026-01-02 22:36:53.621] [ERROR] MagicMirror² will not quit, but it might be a good idea to check why this happened. Maybe no internet connection?
  [2026-01-02 22:36:53.623] [ERROR] If you think this really is an issue, please open an issue on GitHub: https://github.com/MichMich/MagicMirror/issues
