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

geek-pi@raspberrypi:~/MagicMirror/modules/MMM-VoskHotword $ npm install
npm ERR! code E404
npm ERR! 404 Not Found - GET https://github.com/alphacep/vosk-api/releases/download/v0.3.45/vosk-0.3.45.tgz
npm ERR! 404
npm ERR! 404 'vosk@https://github.com/alphacep/vosk-api/releases/download/v0.3.45/vosk-0.3.45.tgz' is not in this registry.
npm ERR! 404
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.

npm ERR! A complete log of this run can be found in: /home/geek-pi/.npm/\_logs/2026-01-03T23_56_58_837Z-debug-0.log

#Install system dependencies
sudo apt update
sudo apt install -y python3 python3-pip python3-venv \ portaudio19-dev alsa-utils

# install Vosk

pip3 install --upgrade pip
pip3 install vosk
python3 - <<EOF
from vosk import Model, KaldiRecognizer
print("Vosk OK")
EOF

# Download Small Model

mkdir -p ~/vosk
cd ~/vosk
wget https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip
unzip vosk-model-small-en-us-0.15.zip
mv vosk-model-small-en-us-0.15 model
