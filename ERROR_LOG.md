#Install system dependencies
sudo apt update
sudo apt install -y python3 python3-pip python3-venv \ portaudio19-dev alsa-utils

# portaudio alternative (no portaudio needed!)

sudo apt-get update
sudo apt-get install -y python3-pip python3-dev libasound2-dev

# Install Python packages

pip3 install vosk sounddevice requests numpy

# install Vosk

pip3 install --upgrade pip
pip3 install vosk

# verify

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
