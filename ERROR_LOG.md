wget https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip
unzip vosk-model-small-en-us-0.15.zip
mv vosk-model-small-en-us-0.15 model
rm vosk-model-small-en-us-0.15.zip

geek-pi@raspberrypi:~/MagicMirror $ npm run server

> magicmirror@2.24.0 server
> node ./serveronly

[2026-01-02 22:36:53.445] [LOG] Starting MagicMirror: v2.24.0
[2026-01-02 22:36:53.459] [LOG] Loading config ...
[2026-01-02 22:36:53.476] [DEBUG] config template file not exists, no envsubst
[2026-01-02 22:36:53.504] [LOG] Loading module helpers ...
[2026-01-02 22:36:53.513] [LOG] No helper found for module: MMM-WakeAnimation.

[2026-01-03 08:52:55.892] [ERROR] Whoops! There was an uncaught exception...

[2026-01-03 08:52:55.915] [ERROR] Error: Dynamic Linking Error: /home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_modules/vosk/lib/linux-x86_64/libvosk.so: cannot open shared object file: No such file or directory
at new DynamicLibrary (/home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_modules/vosk/node_modules/ffi-napi/lib/dynamic_library.js:75:11)
at Object.Library (/home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_modules/vosk/node_modules/ffi-napi/lib/library.js:47:10)
at Object.<anonymous> (/home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_modules/vosk/index.js:84:21)
at Module.\_compile (node:internal/modules/cjs/loader:1256:14)
at Module.\_extensions..js (node:internal/modules/cjs/loader:1310:10)
at Module.load (node:internal/modules/cjs/loader:1119:32)
at Module.\_load (node:internal/modules/cjs/loader:960:12)
at Module.require (node:internal/modules/cjs/loader:1143:19)
at require (node:internal/modules/cjs/helpers:121:18)
at Object.<anonymous> (/home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_helper.js:2:14)
at Module.\_compile (node:internal/modules/cjs/loader:1256:14)
at Module.\_extensions..js (node:internal/modules/cjs/loader:1310:10)
at Module.load (node:internal/modules/cjs/loader:1119:32)
at Module.\_load (node:internal/modules/cjs/loader:960:12)
at Module.require (node:internal/modules/cjs/loader:1143:19)
at require (node:internal/modules/cjs/helpers:121:18)
[2026-01-03 08:52:55.922] [ERROR] MagicMirror² will not quit, but it might be a good idea to check why this happened. Maybe no internet connection?
[2026-01-03 08:52:55.925] [ERROR] If you think this really is an issue, please open an issue on GitHub: https://github.com/MichMich/MagicMirror/issues

Manual install?

# Install Vosk from GitHub (includes ARM binaries)

npm install https://github.com/alphacep/vosk-api/releases/download/v0.3.45/vosk-0.3.45.tgz

# Install mic separately

npm install mic@^2.1.2

ls -lh node_modules/vosk/lib/
