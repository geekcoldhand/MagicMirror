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

COPY BELOW

#

#

#

#

cd ~/MagicMirror/modules/MMM-VoskHotword

# Determine your architecture

ARCH=$(uname -m)
echo "Your architecture: $ARCH"

# Download Vosk library for your architecture

if [ "$ARCH" = "aarch64" ]; then # 64-bit ARM
wget https://github.com/alphacep/vosk-api/releases/download/v0.3.45/vosk-linux-aarch64-0.3.45.zip
unzip vosk-linux-aarch64-0.3.45.zip

    # Move to correct location
    mkdir -p node_modules/vosk/lib/linux-aarch64
    cp -r vosk-linux-aarch64-0.3.45/* node_modules/vosk/lib/linux-aarch64/
    rm -rf vosk-linux-aarch64-0.3.45*

elif [ "$ARCH" = "armv7l" ]; then # 32-bit ARM (Pi 2/3)
wget https://github.com/alphacep/vosk-api/releases/download/v0.3.45/vosk-linux-armv7l-0.3.45.zip
unzip vosk-linux-armv7l-0.3.45.zip

    mkdir -p node_modules/vosk/lib/linux-armv7l
    cp -r vosk-linux-armv7l-0.3.45/* node_modules/vosk/lib/linux-armv7l/
    rm -rf vosk-linux-armv7l-0.3.45*

elif [ "$ARCH" = "armv6l" ]; then
echo "⚠️ Pi Zero/1 (ARMv6) not officially supported by Vosk"
echo "Try using ARMv7 binaries (may work on some Pi Zero 2 W)"
wget https://github.com/alphacep/vosk-api/releases/download/v0.3.45/vosk-linux-armv7l-0.3.45.zip
unzip vosk-linux-armv7l-0.3.45.zip

    mkdir -p node_modules/vosk/lib/linux-armv7l
    cp -r vosk-linux-armv7l-0.3.45/* node_modules/vosk/lib/linux-armv7l/
    rm -rf vosk-linux-armv7l-0.3.45*

else
echo "Unknown architecture: $ARCH"
fi

# Verify installation

ls -lh node_modules/vosk/lib/linux-\*/

#

#

#

END

cat > package.json << 'EOF'
{
"name": "mmm-vosk-hotword",
"version": "1.0.0",
"description": "Offline hotword detection using Vosk",
"main": "node_helper.js",
"dependencies": {
"vosk": "https://github.com/alphacep/vosk-api/releases/download/v0.3.45/vosk-0.3.45.tgz",
"mic": "^2.1.2"
}
}
EOF

arecord -f S16_LE -r 16000 -c 1 | \
vosk-transcriber --model model --sample-rate 16000

geek-pi@raspberrypi:~/MagicMirror $ npm run server

> magicmirror@2.24.0 server
> node ./serveronly

[2026-01-03 18:11:15.245] [LOG] Starting MagicMirror: v2.24.0
[2026-01-03 18:11:15.309] [LOG] Loading config ...
[2026-01-03 18:11:15.331] [DEBUG] config template file not exists, no envsubst
[2026-01-03 18:11:15.357] [LOG] Loading module helpers ...
[2026-01-03 18:11:15.376] [LOG] No helper found for module: MMM-WakeAnimation.
[2026-01-03 18:11:15.564] [LOG] Initializing new module helper ...
[2026-01-03 18:11:15.572] [LOG] Module helper loaded: MMM-VoskHotword
[2026-01-03 18:11:20.369] [LOG] Initializing new module helper ...
[2026-01-03 18:11:20.374] [LOG] Module helper loaded: MMM-AssistantMk2
[2026-01-03 18:11:20.381] [LOG] No helper found for module: alert.
[2026-01-03 18:11:20.397] [LOG] No helper found for module: clock.
[2026-01-03 18:11:21.553] [LOG] Initializing new module helper ...
[2026-01-03 18:11:21.559] [LOG] Module helper loaded: calendar
[2026-01-03 18:11:21.570] [LOG] No helper found for module: weather.
[2026-01-03 18:11:21.572] [LOG] All module helpers loaded.
[2026-01-03 18:11:21.649] [LOG] Starting server on port 8080 ...  
[2026-01-03 18:11:21.772] [LOG] Server started ...
[2026-01-03 18:11:21.774] [LOG] Connecting socket for: MMM-VoskHotword
[2026-01-03 18:11:21.777] [LOG] Starting MMM-VoskHotword helper
[2026-01-03 18:11:21.790] [LOG] Connecting socket for: MMM-AssistantMk2
[2026-01-03 18:11:21.805] [LOG] MMM-AssistantMk2 started
[2026-01-03 18:11:21.808] [LOG] Connecting socket for: calendar
[2026-01-03 18:11:21.811] [LOG] Starting node helper for: calendar
[2026-01-03 18:11:21.816] [LOG] Sockets connected & modules started ...
[2026-01-03 18:11:21.819] [LOG]  
Ready to go! Please point your browser to: http://localhost:8080
[2026-01-03 18:12:28.689] [LOG] Loading Vosk model from: modules/MMM-VoskHotword/model
[2026-01-03 18:12:28.755] [ERROR] ❌ Failed to start Vosk: ReferenceError: vosk is not defined
at Class.startVosk (/home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_helper.js:54:4)
at Class.socketNotificationReceived (/home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_helper.js:18:10)
at Socket.<anonymous> (/home/geek-pi/MagicMirror/js/node_helper.js:104:11)
at Socket.emit (node:events:514:28)
at Socket.emitUntyped (/home/geek-pi/MagicMirror/node_modules/socket.io/dist/typed-events.js:69:22)
at /home/geek-pi/MagicMirror/node_modules/socket.io/dist/socket.js:697:39
at process.processTicksAndRejections (node:internal/process/task_queues:77:11)

=====

Initializing MagicMirror².
VM16:120 Loading core translation file: translations/en.json
VM16:136 Loading core translation fallback file: translations/en.json
VM19:162 Load script: modules/MMM-WakeAnimation/MMM-WakeAnimation.js
VM18:481 Module registered: MMM-WakeAnimation
VM19:135 Bootstrapping module: MMM-WakeAnimation
VM19:139 Scripts loaded for: MMM-WakeAnimation
VM19:177 Load stylesheet: modules/MMM-WakeAnimation/MMM-WakeAnimation.css
VM19:142 Styles loaded for: MMM-WakeAnimation
VM19:145 Translations loaded for: MMM-WakeAnimation
VM19:162 Load script: modules/MMM-VoskHotword/MMM-VoskHotword.js
VM18:481 Module registered: MMM-VoskHotword
VM19:135 Bootstrapping module: MMM-VoskHotword
VM19:139 Scripts loaded for: MMM-VoskHotword
VM19:142 Styles loaded for: MMM-VoskHotword
VM19:145 Translations loaded for: MMM-VoskHotword
VM19:162 Load script: modules/MMM-AssistantMk2/MMM-AssistantMk2.js
VM18:481 Module registered: MMM-AssistantMk2
VM19:135 Bootstrapping module: MMM-AssistantMk2
VM19:139 Scripts loaded for: MMM-AssistantMk2
VM19:177 Load stylesheet: modules/MMM-AssistantMk2/MMM-AssistantMk2.css
VM19:142 Styles loaded for: MMM-AssistantMk2
VM19:145 Translations loaded for: MMM-AssistantMk2
VM19:162 Load script: modules/default/alert/alert.js
VM18:481 Module registered: alert
VM19:135 Bootstrapping module: alert
VM19:162 Load script: modules/default/alert/notificationFx.js
VM19:139 Scripts loaded for: alert
VM19:177 Load stylesheet: vendor/css/font-awesome.css
VM19:177 Load stylesheet: modules/default/alert/./styles/notificationFx.css
VM19:177 Load stylesheet: modules/default/alert/./styles/center.css
VM19:142 Styles loaded for: alert
VM16:103 alert - Load translation: translations/en.json
VM16:103 alert - Load translation fallback: translations/bg.json
VM19:145 Translations loaded for: alert
VM19:162 Load script: modules/default/clock/clock.js
VM18:481 Module registered: clock
VM19:135 Bootstrapping module: clock
VM19:162 Load script: vendor/node_modules/moment/min/moment-with-locales.js
VM19:162 Load script: vendor/node_modules/moment-timezone/builds/moment-timezone-with-data.js
VM19:162 Load script: vendor/node_modules/suncalc/suncalc.js
VM19:139 Scripts loaded for: clock
VM19:177 Load stylesheet: modules/default/clock/clock_styles.css
VM19:142 Styles loaded for: clock
VM19:145 Translations loaded for: clock
VM19:162 Load script: modules/default/calendar/calendar.js
VM18:473 Check MagicMirror² version for module 'calendar' - Minimum version: 2.1.0 - Current version: 2.24.0
VM18:475 Version is ok!
VM18:481 Module registered: calendar
VM19:135 Bootstrapping module: calendar
VM19:162 Load script: modules/default/calendar/calendarutils.js
VM19:233 File already loaded: moment.js
VM19:139 Scripts loaded for: calendar
VM19:177 Load stylesheet: modules/default/calendar/calendar.css
VM19:233 File already loaded: font-awesome.css
VM19:142 Styles loaded for: calendar
VM19:145 Translations loaded for: calendar
VM19:162 Load script: modules/default/weather/weather.js
VM18:481 Module registered: weather
VM19:135 Bootstrapping module: weather
VM19:233 File already loaded: moment.js
VM19:162 Load script: modules/default/weather/../utils.js
VM19:162 Load script: modules/default/weather/weatherutils.js
VM19:162 Load script: modules/default/weather/weatherprovider.js
VM19:162 Load script: modules/default/weather/weatherobject.js
VM19:233 File already loaded: suncalc.js
VM19:162 Load script: modules/default/weather/providers/openweathermap.js
VM19:139 Scripts loaded for: weather
VM19:233 File already loaded: font-awesome.css
VM19:177 Load stylesheet: vendor/node_modules/weathericons/css/weather-icons.css
VM19:177 Load stylesheet: modules/default/weather/weather.css
VM19:142 Styles loaded for: weather
VM19:145 Translations loaded for: weather
VM19:177 Load stylesheet: css/custom.css
localhost/:1 Refused to apply style from 'http://localhost:8080/css/custom.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
VM19:187 Error on loading stylesheet: css/custom.css
stylesheet.onerror @ VM19:187
VM23:10 Wake Animation module started
VM25:10 Starting MMM-VoskHotword
VM26:88 start
VM27:48 Starting module: alert
VM29:49 Starting module: clock
VM33:97 Starting module: calendar
VM38:35 Weather provider: OpenWeatherMap initialized.
VM38:46 Weather provider: OpenWeatherMap started.
VM20:482 All modules started!
VM23:36 MMM-WakeAnimation received: ALL_MODULES_STARTED
VM23:36 MMM-WakeAnimation received: MODULE_DOM_CREATED
VM23:36 MMM-WakeAnimation received: DOM_OBJECTS_CREATED
VM35:163 New weather information available.
VM23:36 MMM-WakeAnimation received: CURRENTWEATHER_TYPE
VM23:36 MMM-WakeAnimation received: WEATHER_UPDATED
VM25:26 ❌ Vosk error: vosk is not defined
socketNotificationReceived @ VM25:26
VM23:36 MMM-WakeAnimation received: SHOW_ALERT
www-widgetapi.js:178 Unrecognized feature: 'web-share'.
X @ www-widgetapi.js:178
6Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('<URL>') does not match the recipient window's origin ('<URL>').
Error with Permissions-Policy header: Unrecognized feature: 'ch-ua-form-factors'.
googleads.g.doubleclick.net/pagead/id:1 Failed to load resource: net::ERR_UNSAFE_REDIRECT
VM23:36 MMM-WakeAnimation received: CALENDAR_EVENTS
VM26:158 youtube error: 2
www.youtube.com/youtubei/v1/log_event?alt=json:1 Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
generate_204:1 Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
www.youtube.com/youtubei/v1/log_event?alt=json:1 Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
font-awesome.css:1 GET http://localhost:8080/vendor/node_modules/@fortawesome/fontawesome-free/css/all.min.css net::ERR_CONNECTION_REFUSED
font-awesome.css:1 GET http://localhost:8080/vendor/node_modules/@fortawesome/fontawesome-free/css/v4-shims.min.css net::ERR_CONNECTION_REFUSED
VM8:-5057 GET http://localhost:8080/socket.io/?EIO=4&transport=polling&t=x4psjoph net::ERR_CONNECTION_REFUSED
\_create @ VM8:-5057
Request @ VM8:-5120
request @ VM8:-4938
doPoll @ VM8:-5145
\_poll @ VM8:-5302
doOpen @ VM8:-5342
open @ VM8:-5446
\_open @ VM8:-4445
SocketWithoutUpgrade @ VM8:-4491
SocketWithUpgrade @ VM8:-4093
Socket @ VM8:-3932
open @ VM8:-1634
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
onclose @ VM8:-1424
Emitter.emit @ VM8:-5646
\_onClose @ VM8:-4129
(anonymous) @ VM8:-4428
Emitter.emit @ VM8:-5646
onClose @ VM8:-5388
ws.onclose @ VM8:-4881
VM8:-5057 GET http://localhost:8080/socket.io/?EIO=4&transport=polling&t=x4r1tgy8 net::ERR_CONNECTION_REFUSED
\_create @ VM8:-5057
Request @ VM8:-5120
request @ VM8:-4938
doPoll @ VM8:-5145
\_poll @ VM8:-5302
doOpen @ VM8:-5342
open @ VM8:-5446
\_open @ VM8:-4445
SocketWithoutUpgrade @ VM8:-4491
SocketWithUpgrade @ VM8:-4093
Socket @ VM8:-3932
open @ VM8:-1634
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
(anonymous) @ VM8:-1393
onError @ VM8:-1618
Emitter.emit @ VM8:-5646
\_onError @ VM8:-4163
Emitter.emit @ VM8:-5646
onError @ VM8:-5454
(anonymous) @ VM8:-5142
Emitter.emit @ VM8:-5646
\_onError @ VM8:-5036
(anonymous) @ VM8:-5061
setTimeout (async)
xhr.onreadystatechange @ VM8:-5062
XMLHttpRequest.send (async)
\_create @ VM8:-5057
Request @ VM8:-5120
request @ VM8:-4938
doPoll @ VM8:-5145
\_poll @ VM8:-5302
doOpen @ VM8:-5342
open @ VM8:-5446
\_open @ VM8:-4445
SocketWithoutUpgrade @ VM8:-4491
SocketWithUpgrade @ VM8:-4093
Socket @ VM8:-3932
open @ VM8:-1634
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
onclose @ VM8:-1424
Emitter.emit @ VM8:-5646
\_onClose @ VM8:-4129
(anonymous) @ VM8:-4428
Emitter.emit @ VM8:-5646
onClose @ VM8:-5388
ws.onclose @ VM8:-4881
DevTools failed to load source map: Could not load content for http://localhost:8080/socket.io/socket.io.js.map: Connection error: net::ERR_CONNECTION_REFUSED
DevTools failed to load source map: Could not load content for http://localhost:8080/vendor/node_modules/nunjucks/browser/nunjucks.min.js.map: Connection error: net::ERR_CONNECTION_REFUSED
VM8:-5057 GET http://localhost:8080/socket.io/?EIO=4&transport=polling&t=x4uyp0le net::ERR_CONNECTION_REFUSED
\_create @ VM8:-5057
Request @ VM8:-5120
request @ VM8:-4938
doPoll @ VM8:-5145
\_poll @ VM8:-5302
doOpen @ VM8:-5342
open @ VM8:-5446
\_open @ VM8:-4445
SocketWithoutUpgrade @ VM8:-4491
SocketWithUpgrade @ VM8:-4093
Socket @ VM8:-3932
open @ VM8:-1634
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
(anonymous) @ VM8:-1393
onError @ VM8:-1618
Emitter.emit @ VM8:-5646
\_onError @ VM8:-4163
Emitter.emit @ VM8:-5646
onError @ VM8:-5454
(anonymous) @ VM8:-5142
Emitter.emit @ VM8:-5646
\_onError @ VM8:-5036
(anonymous) @ VM8:-5061
setTimeout (async)
xhr.onreadystatechange @ VM8:-5062
XMLHttpRequest.send (async)
\_create @ VM8:-5057
Request @ VM8:-5120
request @ VM8:-4938
doPoll @ VM8:-5145
\_poll @ VM8:-5302
doOpen @ VM8:-5342
open @ VM8:-5446
\_open @ VM8:-4445
SocketWithoutUpgrade @ VM8:-4491
SocketWithUpgrade @ VM8:-4093
Socket @ VM8:-3932
open @ VM8:-1634
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
(anonymous) @ VM8:-1393
onError @ VM8:-1618
Emitter.emit @ VM8:-5646
\_onError @ VM8:-4163
Emitter.emit @ VM8:-5646
onError @ VM8:-5454
(anonymous) @ VM8:-5142
Emitter.emit @ VM8:-5646
\_onError @ VM8:-5036
(anonymous) @ VM8:-5061
setTimeout (async)
xhr.onreadystatechange @ VM8:-5062
XMLHttpRequest.send (async)
\_create @ VM8:-5057
Request @ VM8:-5120
request @ VM8:-4938
doPoll @ VM8:-5145
\_poll @ VM8:-5302
doOpen @ VM8:-5342
open @ VM8:-5446
\_open @ VM8:-4445
SocketWithoutUpgrade @ VM8:-4491
SocketWithUpgrade @ VM8:-4093
Socket @ VM8:-3932
open @ VM8:-1634
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
onclose @ VM8:-1424
Emitter.emit @ VM8:-5646
\_onClose @ VM8:-4129
(anonymous) @ VM8:-4428
Emitter.emit @ VM8:-5646
onClose @ VM8:-5388
ws.onclose @ VM8:-4881
www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1593 [Violation] 'beforeunload' handler took 189ms
(unknown) POST https://www.youtube.com/youtubei/v1/log_event?alt=json net::ERR_BLOCKED_BY_CLIENT
send @
ap @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:862
ep @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:867
ku @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1178
sendAndWrite @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1111
sendAndWrite @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1174
m @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1190
(anonymous) @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1192
Promise.then (async)
tt @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1192
$v @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1277
bw @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1269
(anonymous) @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1267
bj @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:417
Xv @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1267
callback @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1700
(anonymous) @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1243
ov @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1250
(anonymous) @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1243
dq @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:916
H @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:925
uq @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:932
H @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:916
mv @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1243
(anonymous) @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1233
M @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1594
transition @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1250
u @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1594
transition @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1250
D @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1594
transition @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1250
(anonymous) @ www.youtube.com/s/embeds/da6a6a67/www-embed-player-es6.vflset/www-embed-player-es6.js:1593
VM10:161 crbug/1173575, non-JS module files deprecated.
(anonymous) @ VM10:161
Navigated to chrome-error://chromewebdata/

===

[ERROR] Whoops! There was an uncaught exception...
[2026-01-03 18:31:03.023] [ERROR] Error: Cannot find module 'vosk'
Require stack:

- /home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_helper.js
- /home/geek-pi/MagicMirror/js/app.js
- /home/geek-pi/MagicMirror/serveronly/index.js
  at Module.\_resolveFilename (node:internal/modules/cjs/loader:1077:15)
  at Module.\_resolveFilename (/home/geek-pi/MagicMirror/node_modules/module-alias/index.js:49:29)
  at Module.\_load (node:internal/modules/cjs/loader:922:27)
  at Module.require (node:internal/modules/cjs/loader:1143:19)
  at require (node:internal/modules/cjs/helpers:121:18)
  at Object.<anonymous> (/home/geek-pi/MagicMirror/modules/MMM-VoskHotword/node_helper.js:4:14)
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
  [2026-01-03 18:31:03.030] [ERROR] MagicMirror² will not quit, but it might be a good idea to check why this happened. Maybe no internet connection?
  [2026-01-03 18:31:03.031] [ERROR] If you think this really is an issu
