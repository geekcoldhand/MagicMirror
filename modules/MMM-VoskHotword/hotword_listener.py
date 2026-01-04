import json
import subprocess
from vosk import Model, KaldiRecognizer

MODEL_PATH = "model"
HOTWORDS = ["mirror mirror"]

model = Model(MODEL_PATH)
rec = KaldiRecognizer(model, 16000)

arecord = subprocess.Popen(
    ["arecord", "-f", "S16_LE", "-r", "16000", "-c", "1"],
    stdout=subprocess.PIPE
)

print("Listening...", flush=True)

while True:
    data = arecord.stdout.read(4000)
    if not data:
        break

    if rec.AcceptWaveform(data):
        result = json.loads(rec.Result())
        text = result.get("text", "").lower()

        if any(hw in text for hw in HOTWORDS):
            print(json.dumps({
                "event": "HOTWORD",
                "text": text
            }), flush=True)
