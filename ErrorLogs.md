geek-pi@raspberrypi:~/MagicMirror $ npm run server

> magicmirror@2.24.0 server
> node ./serveronly

[2025-12-29 19:23:30.732] [LOG]   Starting MagicMirror: v2.24.0 
[2025-12-29 19:23:30.755] [LOG]   Loading config ... 
[2025-12-29 19:23:30.770] [DEBUG] config template file not exists, no envsubst 
[2025-12-29 19:23:30.803] [LOG]   Loading module helpers ... 
[2025-12-29 19:23:30.824] [LOG]   No helper found for module: MMM-WakeAnimation. 
[2025-12-29 19:23:30.827] [WARN]  No /home/geek-pi/MagicMirror/js/../modules/MMM-NotificationTrigger/MMM-NotificationTrigger.js found for module: MMM-NotificationTrigger. 
[2025-12-29 19:23:30.830] [LOG]   No helper found for module: MMM-NotificationTrigger. 
[2025-12-29 19:23:30.834] [WARN]  No /home/geek-pi/MagicMirror/js/../modules/MMM-Hotword/MMM-Hotword.js found for module: MMM-Hotword. 
[2025-12-29 19:23:30.843] [LOG]   No helper found for module: MMM-Hotword. 
[2025-12-29 19:23:35.680] [LOG]   Initializing new module helper ... 
[2025-12-29 19:23:35.692] [LOG]   Module helper loaded: MMM-AssistantMk2 
[2025-12-29 19:23:35.698] [LOG]   No helper found for module: alert. 
[2025-12-29 19:23:35.705] [LOG]   No helper found for module: clock. 
[2025-12-29 19:23:37.168] [LOG]   Initializing new module helper ... 
[2025-12-29 19:23:37.176] [LOG]   Module helper loaded: calendar 
[2025-12-29 19:23:37.187] [LOG]   No helper found for module: weather. 
[2025-12-29 19:23:37.191] [LOG]   All module helpers loaded. 
[2025-12-29 19:23:37.351] [LOG]   Starting server on port 8080 ...  
[2025-12-29 19:23:37.492] [LOG]   Server started ... 
[2025-12-29 19:23:37.496] [LOG]   Connecting socket for: MMM-AssistantMk2 
[2025-12-29 19:23:37.498] [LOG]   MMM-AssistantMk2 started 
[2025-12-29 19:23:37.502] [LOG]   Connecting socket for: calendar 
[2025-12-29 19:23:37.507] [LOG]   Starting node helper for: calendar 
[2025-12-29 19:23:37.511] [LOG]   Sockets connected & modules started ... 
[2025-12-29 19:23:37.515] [LOG]   
Ready to go! Please point your browser to: http://localhost:8080 
[2025-12-29 19:23:51.498] [LOG]   Create new calendarfetcher for url: https://calendar.google.com/calendar/ical/horatiousaharris%40gmail.com/private-69fd1f9a040d7228d85e5a7a1bfc3f69/basic.ics - Interval: 3600000 
[2025-12-29 19:23:59.827] [INFO]  Calendar-Fetcher: Broadcasting 0 events. 
[2025-12-29 19:24:50.397] [LOG]   assistant ready 
[2025-12-29 19:24:54.224] [LOG]   Transcription: hello  --- Done: false 
[2025-12-29 19:24:54.811] [LOG]   Transcription: hello  --- Done: false 
[2025-12-29 19:25:03.031] [LOG]   end-of-utterance 
[2025-12-29 19:25:03.037] [LOG]   Transcription: hello  --- Done: true 
[2025-12-29 19:25:03.315] [ERROR] (node:2611) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 finish listeners added to [WriteStream]. Use emitter.setMaxListeners() to increase limit
(Use `node --trace-warnings ...` to show where the warning was created) 
[2025-12-29 19:25:03.533] [LOG]   Device Action: { requestId: '6954c6b3-0000-2ee7-9012-d4f547ff3288' } 
[2025-12-29 19:25:03.585] [LOG]   Assistant Text Response:  
^C[2025-12-29 19:25:12.696] [LOG]   [SIGINT] Received. Shutting down server... 
[2025-12-29 19:25:12.699] [LOG]   Stopping module helper: MMM-AssistantMk2 
[2025-12-29 19:25:12.701] [LOG]   Stopping module helper: calendar 
[2025-12-29 19:25:12.705] [LOG]   Node_helpers stopped ... 
