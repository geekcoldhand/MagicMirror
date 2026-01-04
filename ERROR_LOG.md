#Install system dependencies
sudo apt update
sudo apt install -y python3 python3-pip python3-venv \ portaudio19-dev alsa-utils

# Install Python packages

sudo apt-get update
sudo apt-get install -y libportaudio2
pip3 install vosk sounddevice requests numpy

# verify

python3 - <<'EOF'
import sounddevice as sd
print(sd.query_devices())
EOF

# Download Small Model

mkdir -p ~/vosk
cd ~/vosk
wget https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip
unzip vosk-model-small-en-us-0.15.zip
mv vosk-model-small-en-us-0.15 model

=====
browser console
=====
VM21:465 Initializing MagicMirror².
VM16:120 Loading core translation file: translations/en.json
VM16:136 Loading core translation fallback file: translations/en.json
VM20:162 Load script: modules/MMM-WakeAnimation/MMM-WakeAnimation.js
VM18:481 Module registered: MMM-WakeAnimation
VM20:135 Bootstrapping module: MMM-WakeAnimation
VM20:139 Scripts loaded for: MMM-WakeAnimation
VM20:177 Load stylesheet: modules/MMM-WakeAnimation/MMM-WakeAnimation.css
VM20:142 Styles loaded for: MMM-WakeAnimation
VM20:145 Translations loaded for: MMM-WakeAnimation
VM20:162 Load script: modules/MMM-VoskHotword/MMM-VoskHotword.js
VM18:481 Module registered: MMM-VoskHotword
VM20:135 Bootstrapping module: MMM-VoskHotword
VM20:139 Scripts loaded for: MMM-VoskHotword
VM20:142 Styles loaded for: MMM-VoskHotword
VM20:145 Translations loaded for: MMM-VoskHotword
VM20:162 Load script: modules/MMM-AssistantMk2/MMM-AssistantMk2.js
VM18:481 Module registered: MMM-AssistantMk2
VM20:135 Bootstrapping module: MMM-AssistantMk2
VM20:139 Scripts loaded for: MMM-AssistantMk2
VM20:177 Load stylesheet: modules/MMM-AssistantMk2/MMM-AssistantMk2.css
VM20:142 Styles loaded for: MMM-AssistantMk2
VM20:145 Translations loaded for: MMM-AssistantMk2
VM20:162 Load script: modules/default/alert/alert.js
VM18:481 Module registered: alert
VM20:135 Bootstrapping module: alert
VM20:162 Load script: modules/default/alert/notificationFx.js
VM20:139 Scripts loaded for: alert
VM20:177 Load stylesheet: vendor/css/font-awesome.css
VM20:177 Load stylesheet: modules/default/alert/./styles/notificationFx.css
VM20:177 Load stylesheet: modules/default/alert/./styles/center.css
VM20:142 Styles loaded for: alert
VM16:103 alert - Load translation: translations/en.json
VM16:103 alert - Load translation fallback: translations/bg.json
VM20:145 Translations loaded for: alert
VM20:162 Load script: modules/default/clock/clock.js
VM18:481 Module registered: clock
VM20:135 Bootstrapping module: clock
VM20:162 Load script: vendor/node_modules/moment/min/moment-with-locales.js
VM20:162 Load script: vendor/node_modules/moment-timezone/builds/moment-timezone-with-data.js
VM20:162 Load script: vendor/node_modules/suncalc/suncalc.js
VM20:139 Scripts loaded for: clock
VM20:177 Load stylesheet: modules/default/clock/clock_styles.css
VM20:142 Styles loaded for: clock
VM20:145 Translations loaded for: clock
VM20:162 Load script: modules/default/calendar/calendar.js
VM18:473 Check MagicMirror² version for module 'calendar' - Minimum version: 2.1.0 - Current version: 2.24.0
VM18:475 Version is ok!
VM18:481 Module registered: calendar
VM20:135 Bootstrapping module: calendar
VM20:162 Load script: modules/default/calendar/calendarutils.js
VM20:233 File already loaded: moment.js
VM20:139 Scripts loaded for: calendar
VM20:177 Load stylesheet: modules/default/calendar/calendar.css
VM20:233 File already loaded: font-awesome.css
VM20:142 Styles loaded for: calendar
VM20:145 Translations loaded for: calendar
VM20:162 Load script: modules/default/weather/weather.js
VM18:481 Module registered: weather
VM20:135 Bootstrapping module: weather
VM20:233 File already loaded: moment.js
VM20:162 Load script: modules/default/weather/../utils.js
VM20:162 Load script: modules/default/weather/weatherutils.js
VM20:162 Load script: modules/default/weather/weatherprovider.js
VM20:162 Load script: modules/default/weather/weatherobject.js
VM20:233 File already loaded: suncalc.js
VM20:162 Load script: modules/default/weather/providers/openweathermap.js
VM20:139 Scripts loaded for: weather
VM20:233 File already loaded: font-awesome.css
VM20:177 Load stylesheet: vendor/node_modules/weathericons/css/weather-icons.css
VM20:177 Load stylesheet: modules/default/weather/weather.css
VM20:142 Styles loaded for: weather
VM20:145 Translations loaded for: weather
VM20:177 Load stylesheet: css/custom.css
localhost/:1 Refused to apply style from 'http://localhost:8080/css/custom.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
VM20:187 Error on loading stylesheet: css/custom.css
stylesheet.onerror @ VM20:187
VM23:10 Wake Animation module started
VM24:10 Starting MMM-VoskHotword
VM25:88 start
VM26:48 Starting module: alert
VM28:49 Starting module: clock
VM32:97 Starting module: calendar
VM38:35 Weather provider: OpenWeatherMap initialized.
VM38:46 Weather provider: OpenWeatherMap started.
VM21:482 All modules started!
VM23:36 MMM-WakeAnimation received: ALL_MODULES_STARTED
VM23:36 MMM-WakeAnimation received: MODULE_DOM_CREATED
VM23:36 MMM-WakeAnimation received: DOM_OBJECTS_CREATED
VM35:163 New weather information available.
VM23:36 MMM-WakeAnimation received: CURRENTWEATHER_TYPE
VM23:36 MMM-WakeAnimation received: WEATHER_UPDATED
www-widgetapi.js:178 Unrecognized feature: 'web-share'.
X @ www-widgetapi.js:178
13Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('<URL>') does not match the recipient window's origin ('<URL>').
Error with Permissions-Policy header: Unrecognized feature: 'ch-ua-form-factors'.
VM23:36 MMM-WakeAnimation received: CALENDAR_EVENTS
googleads.g.doubleclick.net/pagead/id:1 Failed to load resource: net::ERR_UNSAFE_REDIRECT
VM25:158 youtube error: 2
www.youtube.com/youtubei/v1/log_event?alt=json:1 Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
www.youtube.com/youtubei/v1/log_event?alt=json:1 Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
www.youtube.com/generate_204?YzeeaA:1 Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
VM8:-4876 [Violation] 'message' handler took 479ms
56[Violation] 'setTimeout' handler took <N>ms
chrome-extension://cjpalhdlnbpafiamejdnhcphjbkeiagm/js/contentscript.js:201 [Violation] 'requestAnimationFrame' handler took 64ms
localhost/:1 Refused to apply style from 'http://localhost:8080/css/custom.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
www.youtube.com/youtubei/v1/log_event?alt=json:1 Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
VM32:158 [Violation] 'setInterval' handler took 1546ms
[Violation] Forced reflow while executing JavaScript took 299ms
www-embed-player-es6.js:1593 [Violation] 'beforeunload' handler took 264ms
[Violation] Forced reflow while executing JavaScript took 209ms
[Violation] Forced reflow while executing JavaScript took 45ms
(unknown) POST https://www.youtube.com/youtubei/v1/log_event?alt=json net::ERR_BLOCKED_BY_CLIENT
send @ unknown
ap @ www-embed-player-es6.js:862
ep @ www-embed-player-es6.js:867
ku @ www-embed-player-es6.js:1178
sendAndWrite @ www-embed-player-es6.js:1111
sendAndWrite @ www-embed-player-es6.js:1174
m @ www-embed-player-es6.js:1190
(anonymous) @ www-embed-player-es6.js:1192
Promise.then (async)
tt @ www-embed-player-es6.js:1192
$v @ www-embed-player-es6.js:1277
bw @ www-embed-player-es6.js:1269
(anonymous) @ www-embed-player-es6.js:1267
bj @ www-embed-player-es6.js:417
Xv @ www-embed-player-es6.js:1267
c @ www-embed-player-es6.js:1270
(anonymous) @ www-embed-player-es6.js:1272
(anonymous) @ www-embed-player-es6.js:832
setTimeout (async)
apply @ unknown
So @ www-embed-player-es6.js:851
Yv @ www-embed-player-es6.js:1284
Zv @ www-embed-player-es6.js:1272
Vv @ www-embed-player-es6.js:1264
Pv @ www-embed-player-es6.js:1262
jw @ www-embed-player-es6.js:1293
Nq @ www-embed-player-es6.js:1294
flush @ www-embed-player-es6.js:1390
o @ www-embed-player-es6.js:459
(anonymous) @ www-embed-player-es6.js:497
(anonymous) @ www-embed-player-es6.js:492
VM8:-5057 GET http://localhost:8080/socket.io/?EIO=4&transport=polling&t=vlw7nm8t net::ERR_CONNECTION_REFUSED
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
(anonymous) @ VM8:-1603
setTimeout (async)
open @ VM8:-1606
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
VM8:-5057 GET http://localhost:8080/socket.io/?EIO=4&transport=polling&t=vme3dg1w net::ERR_CONNECTION_REFUSED
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
(anonymous) @ VM8:-1603
setTimeout (async)
open @ VM8:-1606
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
(anonymous) @ VM8:-1393
onError @ VM8:-1618
(anonymous) @ VM8:-1603
setTimeout (async)
open @ VM8:-1606
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
VM8:-5057 GET http://localhost:8080/socket.io/?EIO=4&transport=polling&t=vn48j3rz net::ERR_CONNECTION_REFUSED
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
(anonymous) @ VM8:-1603
setTimeout (async)
open @ VM8:-1606
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
(anonymous) @ VM8:-1393
onError @ VM8:-1618
(anonymous) @ VM8:-1603
setTimeout (async)
open @ VM8:-1606
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
(anonymous) @ VM8:-1393
onError @ VM8:-1618
(anonymous) @ VM8:-1603
setTimeout (async)
open @ VM8:-1606
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
VM8:-5057 GET http://localhost:8080/socket.io/?EIO=4&transport=polling&t=vnp46c1r net::ERR_CONNECTION_REFUSED
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
(anonymous) @ VM8:-1603
setTimeout (async)
open @ VM8:-1606
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
(anonymous) @ VM8:-1393
onError @ VM8:-1618
(anonymous) @ VM8:-1603
setTimeout (async)
open @ VM8:-1606
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
(anonymous) @ VM8:-1393
onError @ VM8:-1618
(anonymous) @ VM8:-1603
setTimeout (async)
open @ VM8:-1606
(anonymous) @ VM8:-1397
setTimeout (async)
reconnect @ VM8:-1403
(anonymous) @ VM8:-1393
onError @ VM8:-1618
(anonymous) @ VM8:-1603
setTimeout (async)
open @ VM8:-1606
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
VM10:161 crbug/1173575, non-JS module files deprecated.
(anonymous) @ VM10:161
Navigated to chrome-error://chromewebdata/

=======
server logs
=======

geek-pi@raspberrypi:~/MagicMirror $ npm run server

> magicmirror@2.24.0 server
> node ./serveronly

[2026-01-04 10:13:22.755] [LOG] Starting MagicMirror: v2.24.0
[2026-01-04 10:13:22.820] [LOG] Loading config ...
[2026-01-04 10:13:22.834] [DEBUG] config template file not exists, no envsubst
[2026-01-04 10:13:22.865] [LOG] Loading module helpers ...
[2026-01-04 10:13:22.869] [LOG] No helper found for module: MMM-WakeAnimation.
[2026-01-04 10:13:22.962] [LOG] Initializing new module helper ...
[2026-01-04 10:13:22.965] [LOG] Module helper loaded: MMM-VoskHotword
[2026-01-04 10:13:27.837] [LOG] Initializing new module helper ...
[2026-01-04 10:13:27.844] [LOG] Module helper loaded: MMM-AssistantMk2
[2026-01-04 10:13:27.852] [LOG] No helper found for module: alert.
[2026-01-04 10:13:27.862] [LOG] No helper found for module: clock.
[2026-01-04 10:13:28.959] [LOG] Initializing new module helper ...
[2026-01-04 10:13:28.962] [LOG] Module helper loaded: calendar
[2026-01-04 10:13:28.965] [LOG] No helper found for module: weather.
[2026-01-04 10:13:28.967] [LOG] All module helpers loaded.
[2026-01-04 10:13:29.035] [LOG] Starting server on port 8080 ...  
[2026-01-04 10:13:29.135] [LOG] Server started ...
[2026-01-04 10:13:29.139] [LOG] Connecting socket for: MMM-VoskHotword
[2026-01-04 10:13:29.144] [LOG] MMM-VoskHotword helper started
[2026-01-04 10:13:29.154] [LOG] Connecting socket for: MMM-AssistantMk2
[2026-01-04 10:13:29.159] [LOG] MMM-AssistantMk2 started
[2026-01-04 10:13:29.162] [LOG] Connecting socket for: calendar
[2026-01-04 10:13:29.164] [LOG] Starting node helper for: calendar
[2026-01-04 10:13:29.166] [LOG] Sockets connected & modules started ...
[2026-01-04 10:13:29.167] [LOG]  
Ready to go! Please point your browser to: http://localhost:8080

=======
vosk python logs
========
geek-pi@raspberrypi:~/MagicMirror/modules/MMM-VoskHotword $ python3 hotword_listener.py
LOG (VoskAPI:ReadDataFiles():model.cc:213) Decoding params beam=10 max-active=3000 lattice-beam=2
LOG (VoskAPI:ReadDataFiles():model.cc:216) Silence phones 1:2:3:4:5:6:7:8:9:10
LOG (VoskAPI:RemoveOrphanNodes():nnet-nnet.cc:948) Removed 0 orphan nodes.
LOG (VoskAPI:RemoveOrphanComponents():nnet-nnet.cc:847) Removing 0 orphan components.
LOG (VoskAPI:ReadDataFiles():model.cc:248) Loading i-vector extractor from model/ivector/final.ie
LOG (VoskAPI:ComputeDerivedVars():ivector-extractor.cc:183) Computing derived variables for iVector extractor
LOG (VoskAPI:ComputeDerivedVars():ivector-extractor.cc:204) Done.
LOG (VoskAPI:ReadDataFiles():model.cc:282) Loading HCL and G from model/graph/HCLr.fst model/graph/Gr.fst
LOG (VoskAPI:ReadDataFiles():model.cc:308) Loading winfo model/graph/phones/word_boundary.int
Listening...
Recording WAVE 'stdin' : Signed 16 bit Little Endian, Rate 16000 Hz, Mono
{"event": "HOTWORD", "text": "mirror mirror"}
{"event": "HOTWORD", "text": "mirror mirror"}
{"event": "HOTWORD", "text": "mirror mirror"}
