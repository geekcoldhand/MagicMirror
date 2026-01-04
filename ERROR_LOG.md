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
