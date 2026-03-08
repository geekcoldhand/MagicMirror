import json
import queue
import sys
import time
import socketio
import sounddevice as sd
import numpy as np
from scipy.signal import resample_poly
from vosk import Model, KaldiRecognizer

# ============================================================================
# CONFIGURATION
# ============================================================================

MAIN_PI_URL = "http://192.168.1.90:3000/"
# BEARER_TOKEN = "xxx"
HOTWORDS = ["mirror mirror", "hey mirror", "thy face", "ok computer"]

INPUT_SAMPLE_RATE = 48000
VOSK_SAMPLE_RATE = 16000
BLOCK_SIZE = 1024
MIC_DEVICE = 0

MODEL_PATH = "./model"
SOURCE_ID = "pi_zero_2w"

# Query collection settings
COLLECTION_TIMEOUT = 7.0  # Max seconds to wait for query
EARLY_EXIT_TIMEOUT = 1.5   # Seconds after final result to stop early
PARTIAL_EXTEND_TIMEOUT = 0.5  # Extend deadline while user is speaking

# ============================================================================
# AUDIO CALLBACK
# ============================================================================

audio_queue = queue.Queue(maxsize=10)

def audio_callback(indata, frames, time_info, status):
    if status:
        print(f"Audio status: {status}", file=sys.stderr)
    try:
        audio_queue.put_nowait(bytes(indata))
    except queue.Full:
        pass

# ============================================================================
#   MAGIC MIRROR SOCKET
# ============================================================================
# Socket connection - established once at startup
sio = socketio.Client(reconnection=True, reconnection_attempts=0)

@sio.event
def connect():
    print("✓ Connected to MagicMirror")

@sio.event
def disconnect():
    print("✗ Disconnected from MagicMirror - will reconnect")

def connect_socket():
    try:
        sio.connect(MAIN_PI_URL)
    except Exception as e:
        print(f"✗ Connection failed: {e}")

def send_hotword_detection(hotword, full_transcript, query):
    try:
        sio.emit("HOTWORD_DETECTED", {
            "hotword": hotword,
            "transcript": full_transcript,
            "query": query,
            "source": SOURCE_ID,
            "timestamp": time.time()
        })
        print(f"✓ Sent: hotword='{hotword}', query='{query}'")
    except Exception as e:
        print(f"✗ Failed to send: {e}")

# ============================================================================
# HOTWORD DETECTION WITH QUERY COLLECTION
# ============================================================================



def contains_hotword(text):
    """Check if text contains any configured hotword"""
    text_lower = text.lower()
    for hotword in HOTWORDS:
        if hotword in text_lower:
            return hotword
    return None

def extract_query_from_text(text, hotword):
    """Extract the query part after the hotword"""
    text_lower = text.lower()
    hotword_lower = hotword.lower()
    
    idx = text_lower.find(hotword_lower)
    if idx == -1:
        return ""
    
    query = text[idx + len(hotword):].strip()
    return query

def collect_query_after_hotword(recognizer, hotword, initial_text):
    """
    After detecting hotword, continue listening for up to 7 seconds
    to collect the full query.
    """
    print(f"📝 Collecting query after hotword '{hotword}'...")
    
    # Check if query was in the same utterance as hotword
    initial_query = extract_query_from_text(initial_text, hotword)
    
    collected_parts = []
    if initial_query:
        collected_parts.append(initial_query)
        print(f"   Initial query tail: '{initial_query}'")
    
    deadline = time.time() + COLLECTION_TIMEOUT
    last_partial_time = time.time()
    
    while time.time() < deadline:
        if audio_queue.empty():
            time.sleep(0.01)
            continue
        
        raw = audio_queue.get()
        audio = np.frombuffer(raw, dtype=np.int16)
        
        # Resample
        audio_float = audio.astype(np.float32) / 32768.0
        audio_16k_float = resample_poly(audio_float, up=1, down=3)
        audio_16k = (audio_16k_float * 32768.0).astype(np.int16)
        
        if recognizer.AcceptWaveform(audio_16k.tobytes()):
            result = json.loads(recognizer.Result())
            text = result.get("text", "").strip()
            
            if text:
                print(f"   + '{text}'")
                collected_parts.append(text)
                
                # Smart early exit: stop 1.5s after getting a complete utterance
                deadline = min(deadline, time.time() + EARLY_EXIT_TIMEOUT)
        else:
            # Partial result - user is still speaking
            partial = json.loads(recognizer.PartialResult())
            partial_text = partial.get("partial", "").strip()
            
            if partial_text:
                # Extend deadline while user is actively speaking
                last_partial_time = time.time()
                if time.time() + PARTIAL_EXTEND_TIMEOUT < deadline:
                    deadline = time.time() + PARTIAL_EXTEND_TIMEOUT
    
    full_query = " ".join(collected_parts).strip()
    full_transcript = f"{hotword} {full_query}".strip()
    
    print(f"✅ Collection complete: '{full_query}'")
    return full_transcript, full_query

# ============================================================================
# MAIN LOOP
# ============================================================================

def main():
    print("=" * 60)
    print("Vosk Hotword Detector - Raspberry Pi Zero 2 W")
    print("=" * 60)
    
    # Connect to main Pi
    connect_socket()

    # Load model
   # print(f"Loading model from {MODEL_PATH}...")
    try:
        model = Model(MODEL_PATH)
        print("✓ Model loaded")
    except Exception as e:
        print(f"✗ Failed to load model: {e}")
        sys.exit(1)
    
    recognizer = KaldiRecognizer(model, VOSK_SAMPLE_RATE)
    recognizer.SetWords(True)
    
    # print(f"Listening for hotwords: {', '.join(HOTWORDS)}")
    # print(f"Main Pi endpoint: {MAIN_PI_URL}")
    # print(f"Query collection timeout: {COLLECTION_TIMEOUT}s")
    # print("-" * 60)
    
    # Show audio devices
    devices = sd.query_devices()
    for i, dev in enumerate(devices):
        if dev['max_input_channels'] > 0:
            print(f"  [{i}] {dev['name']} (inputs: {dev['max_input_channels']})")
    
    print(f"\nUsing device: {MIC_DEVICE}")
    print("\n" + "=" * 60)
    
    try:
        with sd.RawInputStream(
            samplerate=INPUT_SAMPLE_RATE,
            blocksize=BLOCK_SIZE,
            device=MIC_DEVICE,
            dtype='int16',
            channels=1,
            callback=audio_callback
        ):
            print("✓ Audio stream started")
            print("Listening... (Press Ctrl+C to stop)\n")
            
            chunk_count = 0
            last_detection = 0
            cooldown = 2.0
            
            while True:
                raw = audio_queue.get()
                audio = np.frombuffer(raw, dtype=np.int16)
                
                # Resample
                audio_float = audio.astype(np.float32) / 32768.0
                audio_16k_float = resample_poly(audio_float, up=1, down=3)
                audio_16k = (audio_16k_float * 32768.0).astype(np.int16)
                
                chunk_count += 1
                if chunk_count == 1:
                    print("✓ Audio flowing\n")
                
                if recognizer.AcceptWaveform(audio_16k.tobytes()):
                    result = json.loads(recognizer.Result())
                    text = result.get("text", "")
                    
                    if text:
                        print(f"🎤 Heard: {text}")
                        
                        # Check cooldown
                        now = time.time()
                        if now - last_detection < cooldown:
                            continue
                        
                        # Check for hotword
                        detected_hotword = contains_hotword(text)
                        if detected_hotword:
                            print(f"🎯 HOTWORD: {detected_hotword}")
                            
                            # Collect query after hotword
                            full_transcript, query = collect_query_after_hotword(
                                recognizer, detected_hotword, text
                            )
                            
                            # Send complete payload
                            send_hotword_detection(detected_hotword, full_transcript, query)
                            last_detection = time.time()
                            print()
                            
    except KeyboardInterrupt:
        sio.disconnect()
        print("\n\nShutting down...")
    except Exception as e:
        print(f"\n✗ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
