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
