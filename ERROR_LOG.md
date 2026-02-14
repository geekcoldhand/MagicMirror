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

=====
Jan 4th 20:00 working but very slow
======

====
server logs
====
geek-pi@raspberrypi:~/MagicMirror $ npm run server

> magicmirror@2.24.0 server
> node ./serveronly

[2026-01-04 19:39:21.009] [LOG] Starting MagicMirror: v2.24.0
[2026-01-04 19:39:21.080] [LOG] Loading config ...
[2026-01-04 19:39:21.108] [DEBUG] config template file not exists, no envsubst
[2026-01-04 19:39:21.143] [LOG] Loading module helpers ...
[2026-01-04 19:39:21.165] [LOG] No helper found for module: MMM-WakeAnimation.
[2026-01-04 19:39:21.288] [LOG] Initializing new module helper ...
[2026-01-04 19:39:21.299] [LOG] Module helper loaded: MMM-VoskHotword
[2026-01-04 19:39:32.248] [LOG] Initializing new module helper ...
[2026-01-04 19:39:32.282] [LOG] Module helper loaded: MMM-AssistantMk2
[2026-01-04 19:39:32.315] [LOG] No helper found for module: alert.
[2026-01-04 19:39:32.325] [LOG] No helper found for module: clock.
[2026-01-04 19:39:34.681] [LOG] Initializing new module helper ...
[2026-01-04 19:39:34.688] [LOG] Module helper loaded: calendar
[2026-01-04 19:39:34.712] [LOG] No helper found for module: weather.
[2026-01-04 19:39:34.716] [LOG] All module helpers loaded.
[2026-01-04 19:39:34.794] [LOG] Starting server on port 8080 ...  
[2026-01-04 19:39:34.938] [LOG] Server started ...
[2026-01-04 19:39:34.948] [LOG] Connecting socket for: MMM-VoskHotword
[2026-01-04 19:39:34.956] [LOG] MMM-VoskHotword helper started
[2026-01-04 19:39:34.961] [LOG] Connecting socket for: MMM-AssistantMk2
[2026-01-04 19:39:34.964] [LOG] MMM-AssistantMk2 started
[2026-01-04 19:39:34.973] [LOG] Connecting socket for: calendar
[2026-01-04 19:39:34.995] [LOG] Starting node helper for: calendar
[2026-01-04 19:39:35.018] [LOG] Sockets connected & modules started ...
[2026-01-04 19:39:35.023] [LOG]  
Ready to go! Please point your browser to: http://localhost:8080
[2026-01-04 19:40:29.284] [LOG] Python hotword listener started
[2026-01-04 19:40:29.369] [LOG] Create new calendarfetcher for url: https://calendar.google.com/calendar/ical/horatiousaharris%40gmail.com/private-69fd1f9a040d7228d85e5a7a1bfc3f69/basic.ics - Interval: 3600000
[2026-01-04 19:40:49.107] [INFO] Calendar-Fetcher: Broadcasting 0 events.
[2026-01-04 19:40:49.144] [ERROR] Python stderr: LOG (VoskAPI:ReadDataFiles():model.cc:213) Decoding params beam=10 max-active=3000 lattice-beam=2
LOG (VoskAPI:ReadDataFiles():model.cc:216) Silence phones 1:2:3:4:5:6:7:8:9:10
LOG (VoskAPI:RemoveOrphanNodes():nnet-nnet.cc:948) Removed 0 orphan nodes.
LOG (VoskAPI:RemoveOrphanComponents():nnet-nnet.cc:847) Removing 0 orphan components.
LOG (VoskAPI:ReadDataFiles():model.cc:248) Loading i-vector extractor from model/ivector/final.ie
LOG (VoskAPI:ComputeDerivedVars():ivector-extractor.cc:183) Computing derived variables for iVector extractor
LOG (VoskAPI:ComputeDerivedVars():ivector-extractor.cc:204) Done.
LOG (VoskAPI:ReadDataFiles():model.cc:282) Loading HCL and G from model/graph/HCLr.fst model/graph/Gr.fst

[2026-01-04 19:40:54.189] [ERROR] Python stderr: LOG (VoskAPI:ReadDataFiles():model.cc:308) Loading winfo model/graph/phones/word_boundary.int

[2026-01-04 19:41:00.311] [ERROR] JSON parse error: Listening...
[2026-01-04 19:41:08.667] [ERROR] Python stderr: Recording WAVE 'stdin' : Signed 16 bit Little Endian, Rate 16000 Hz, Mono

[2026-01-04 19:41:48.535] [LOG] HOTWORD event received: undefined
[2026-01-04 19:42:39.847] [LOG] assistant ready
[2026-01-04 19:42:50.770] [LOG] HOTWORD event received: undefined
^C[2026-01-04 19:45:17.187] [LOG] HOTWORD event received: undefined
[2026-01-04 19:45:17.377] [ERROR] Python stderr: Aborted by signal Interrupt...
Traceback (most recent call last):
File "/home/geek-pi/MagicMirror/modules/MMM-VoskHotword/hotword_listener.py", line 23, in <module>
if rec.AcceptWaveform(data):
File "/home/geek-pi/.local/lib/python3.9/site-packages/vosk/**init**.py", line 182, in AcceptWaveform
res = \_c.vosk_recognizer_accept_waveform(self.\_handle, data, len(data))
KeyboardInterrupt

[2026-01-04 19:45:17.478] [LOG] [SIGINT] Received. Shutting down server...
[2026-01-04 19:45:17.514] [LOG] Stopping module helper: MMM-VoskHotword
[2026-01-04 19:45:17.524] [LOG] Stopping module helper: MMM-AssistantMk2
[2026-01-04 19:45:17.533] [LOG] Stopping module helper: calendar
[2026-01-04 19:45:17.555] [LOG] Node_helpers stopped ...

geek-pi@raspberrypi:~/MagicMirror $ killall chromium-browser
geek-pi@raspberrypi:~/MagicMirror $ npm run server

> magicmirror@2.24.0 server
> node ./serveronly

[2026-01-04 19:55:51.020] [LOG] Starting MagicMirror: v2.24.0
[2026-01-04 19:55:51.086] [LOG] Loading config ...
[2026-01-04 19:55:51.107] [DEBUG] config template file not exists, no envsubst
[2026-01-04 19:55:51.148] [LOG] Loading module helpers ...
[2026-01-04 19:55:51.170] [LOG] No helper found for module: MMM-WakeAnimation.
[2026-01-04 19:55:51.272] [LOG] Initializing new module helper ...
[2026-01-04 19:55:51.275] [LOG] Module helper loaded: MMM-VoskHotword
[2026-01-04 19:55:56.229] [LOG] Initializing new module helper ...
[2026-01-04 19:55:56.236] [LOG] Module helper loaded: MMM-AssistantMk2
[2026-01-04 19:55:56.241] [LOG] No helper found for module: alert.
[2026-01-04 19:55:56.254] [LOG] No helper found for module: clock.
[2026-01-04 19:55:57.414] [LOG] Initializing new module helper ...
[2026-01-04 19:55:57.419] [LOG] Module helper loaded: calendar
[2026-01-04 19:55:57.426] [LOG] No helper found for module: weather.
[2026-01-04 19:55:57.430] [LOG] All module helpers loaded.
[2026-01-04 19:55:57.495] [LOG] Starting server on port 8080 ...  
[2026-01-04 19:55:57.600] [LOG] Server started ...
[2026-01-04 19:55:57.602] [LOG] Connecting socket for: MMM-VoskHotword
[2026-01-04 19:55:57.604] [LOG] MMM-VoskHotword helper started
[2026-01-04 19:55:57.608] [LOG] Connecting socket for: MMM-AssistantMk2
[2026-01-04 19:55:57.610] [LOG] MMM-AssistantMk2 started
[2026-01-04 19:55:57.612] [LOG] Connecting socket for: calendar
[2026-01-04 19:55:57.616] [LOG] Starting node helper for: calendar
[2026-01-04 19:55:57.621] [LOG] Sockets connected & modules started ...
[2026-01-04 19:55:57.625] [LOG]  
Ready to go! Please point your browser to: http://localhost:8080
[2026-01-04 19:56:41.883] [LOG] Python hotword listener started
[2026-01-04 19:56:41.990] [LOG] Create new calendarfetcher for url: https://calendar.google.com/calendar/ical/horatiousaharris%40gmail.com/private-69fd1f9a040d7228d85e5a7a1bfc3f69/basic.ics - Interval: 3600000
[2026-01-04 19:56:58.980] [INFO] Calendar-Fetcher: Broadcasting 0 events.
[2026-01-04 19:56:59.180] [ERROR] Python stderr: LOG (VoskAPI:ReadDataFiles():model.cc:213) Decoding params beam=10 max-active=3000 lattice-beam=2
LOG (VoskAPI:ReadDataFiles():model.cc:216) Silence phones 1:2:3:4:5:6:7:8:9:10
LOG (VoskAPI:RemoveOrphanNodes():nnet-nnet.cc:948) Removed 0 orphan nodes.
LOG (VoskAPI:RemoveOrphanComponents():nnet-nnet.cc:847) Removing 0 orphan components.
LOG (VoskAPI:ReadDataFiles():model.cc:248) Loading i-vector extractor from model/ivector/final.ie
LOG (VoskAPI:ComputeDerivedVars():ivector-extractor.cc:183) Computing derived variables for iVector extractor
LOG (VoskAPI:ComputeDerivedVars():ivector-extractor.cc:204) Done.
LOG (VoskAPI:ReadDataFiles():model.cc:282) Loading HCL and G from model/graph/HCLr.fst model/graph/Gr.fst

[2026-01-04 19:57:03.831] [ERROR] Python stderr: LOG (VoskAPI:ReadDataFiles():model.cc:308) Loading winfo model/graph/phones/word_boundary.int

[2026-01-04 19:57:04.679] [ERROR] JSON parse error: Listening...
[2026-01-04 19:57:05.503] [ERROR] Python stderr: Recording WAVE 'stdin' : Signed 16 bit Little Endian, Rate 16000 Hz, Mono

^C[2026-01-04 19:59:24.967] [LOG] [SIGINT] Received. Shutting down server...
[2026-01-04 19:59:25.169] [LOG] Stopping module helper: MMM-VoskHotword
[2026-01-04 19:59:25.182] [LOG] Stopping module helper: MMM-AssistantMk2
[2026-01-04 19:59:25.186] [LOG] Stopping module helper: calendar
[2026-01-04 19:59:25.341] [LOG] Node_helpers stopped ...

geek-pi@raspberrypi:~/MagicMirror $

====
broswer logs
====

VM21:465 Initializing MagicMirror².
VM15:120 Loading core translation file: translations/en.json
VM15:136 Loading core translation fallback file: translations/en.json
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
VM15:103 alert - Load translation: translations/en.json
VM15:103 alert - Load translation fallback: translations/bg.json
VM19:145 Translations loaded for: alert
VM19:162 Load script: modules/default/clock/clock.js
VM18:481 Module registered: clock
VM19:135 Bootstrapping module: clock
VM19:162 Load script: vendor/node*modules/moment/min/moment-with-locales.js
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
VM24:10 Starting MMM-VoskHotword
VM25:88 start
VM26:48 Starting module: alert
VM28:49 Starting module: clock
VM33:97 Starting module: calendar
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
www-widgetapi.js:194 Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.youtube.com') does not match the recipient window's origin ('http://localhost:8080').
n.sendMessage @ www-widgetapi.js:194
www-widgetapi.js:194 Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.youtube.com') does not match the recipient window's origin ('http://localhost:8080').
n.sendMessage @ www-widgetapi.js:194
www-widgetapi.js:194 Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.youtube.com') does not match the recipient window's origin ('http://localhost:8080').
n.sendMessage @ www-widgetapi.js:194
localhost/:1 [Intervention] Slow network is detected. See https://www.chromestatus.com/feature/5636954674692096 for more details. Fallback font will be used while loading: http://localhost:8080/vendor/node_modules/weathericons/font/weathericons-regular-webfont.woff
Error with Permissions-Policy header: Unrecognized feature: 'ch-ua-form-factors'.
www-widgetapi.js:194 Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.youtube.com') does not match the recipient window's origin ('http://localhost:8080').
n.sendMessage @ www-widgetapi.js:194
googleads.g.doubleclick.net/pagead/id:1 Failed to load resource: net::ERR_UNSAFE_REDIRECT
VM23:36 MMM-WakeAnimation received: CALENDAR_EVENTS
localhost/:1 Refused to apply style from 'http://localhost:8080/css/custom.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
19[Violation] 'setTimeout' handler took <N>ms
VM25:158 youtube error: 2
send @ VM13:812
ap @ www-embed-player-es6.js:862
ep @ www-embed-player-es6.js:867
ku @ www-embed-player-es6.js:1178
sendAndWrite @ www-embed-player-es6.js:1111
sendAndWrite @ www-embed-player-es6.js:1174
J @ base.js:2093
(anonymous) @ base.js:2101
Promise.then (async)
g.rd @ base.js:2101
MCj @ base.js:2196
LtP @ base.js:2187
(anonymous) @ base.js:2185
g.UI @ base.js:1170
cp @ base.js:2185
m @ base.js:2188
(anonymous) @ base.js:2190
(anonymous) @ base.js:1679
setTimeout (async)
apply @ VM13:1368
g.s7 @ base.js:1704
Wl @ base.js:2215
l4P @ base.js:2190
Q2G @ base.js:2181
X6Q @ base.js:2178
T$ @ base.js:2227
g.qd @ base.js:2229
pG.tick @ base.js:9117
OY @ base.js:2554
(anonymous) @ base.js:1679
UY @ base.js:2580
(anonymous) @ base.js:2587
(anonymous) @ base.js:1679
iU @ base.js:2587
g.eJ @ base.js:3226
g.V.GS @ base.js:12388
g.V.AE @ base.js:11910
g.V.j9 @ base.js:11864
g.A.dispose @ base.js:8203
g.V.Jc @ base.js:10890
g.V.j9 @ base.js:10889
g.A.dispose @ base.js:8203
$9 @ base.js:7335
g.V.stopVideo @ base.js:13663
g.V.PO* @ base.js:10527
S.state.V.<computed> @ base.js:4604
g.V.handleExternalCall @ base.js:10500
S.state.C.<computed> @ base.js:4607
(anonymous) @ www-embed-player-es6.js:1688
onMessage @ www-embed-player-es6.js:1652
u @ www-embed-player-es6.js:1643
VM8:-4876 [Violation] 'message' handler took 179ms
send @ VM13:812
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
apply @ VM13:1368
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
setTimeout (async)
apply @ VM13:1368
Xj @ www-embed-player-es6.js:492
i @ www-embed-player-es6.js:499
i @ www-embed-player-es6.js:490
(anonymous) @ www-embed-player-es6.js:592
load (async)
WA @ www-embed-player-es6.js:1560
il @ www-embed-player-es6.js:1559
hl @ www-embed-player-es6.js:573
await in hl (async)
(anonymous) @ www-embed-player-es6.js:591
Fk.a.xc @ www-embed-player-es6.js:531
Dk @ www-embed-player-es6.js:532
wk @ www-embed-player-es6.js:528
(unknown) GET https://googleads.g.doubleclick.net/pagead/id net::ERR_UNSAFE_REDIRECT
send @ VM13:812
ap @ VM14 www-embed-player-es6.js:862
ep @ VM14 www-embed-player-es6.js:867
(anonymous) @ VM14 www-embed-player-es6.js:1333
bj @ VM14 www-embed-player-es6.js:417
Sw @ VM14 www-embed-player-es6.js:1330
(anonymous) @ VM14 www-embed-player-es6.js:1351
(anonymous) @ VM14 www-embed-player-es6.js:832
VM33:158 [Violation] 'setInterval' handler took 111ms
[Violation] Forced reflow while executing JavaScript took 198ms
www-embed-player-es6.js:1593 [Violation] 'beforeunload' handler took 446ms
VM8:-4882 [Violation] 'close' handler took 853ms
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
