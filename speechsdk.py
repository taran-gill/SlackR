import time
import wave
try:
    import azure.cognitiveservices.speech as speechsdk
except ImportError:
    print("""
    Importing the Speech SDK for Python failed.
    Refer to
    https://docs.microsoft.com/azure/cognitive-services/speech-service/quickstart-python for
    installation instructions.
    """)
    import sys
    sys.exit(1)


# Set up the subscription info for the Speech Service:
# Replace with your own subscription key and service region (e.g., "westus").

speech_key, service_region = "a6fa0af422ed452ea8e75b094f4598cd", "eastus"

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

#Use a service account

cred = credentials.Certificate('htnproject-5cbdb-7cc18df7e1ff.json')
firebase_admin.initialize_app(cred)

# import pyrebase

# config = {
#   "apiKey": "AIzaSyCa8QYWUcQ6e7DUMaSLNMeUCRuBe54mVA4",
#   "authDomain": "htnproject-5cbdb.firebaseapp.com",
#   "databaseURL": "https://htnproject-5cbdb.firebaseio.com",
#   "storageBucket": "htnproject-5cbdb.appspot.com"
# }

#firebase = pyrebase.initialize_app(config)

db = firestore.client()

#-----------------------------------------------------------------
from google.cloud import firestore
client = firestore.Client()

import base64

# Converts strings added to /messages/{pushId}/original to uppercase
def make_speech_data(data, context):
    path_parts = context.resource.split('audio_blobs/blobs/')[1].split('/')
    collection_path = path_parts[0]
    document_path = '/'.join(path_parts[1:])

    affected_doc = client.collection(collection_path).document(document_path)

    cur_value = data["value"]["fields"]["original"]["stringValue"]

    cur_value = base64.b64decode(cur_value)

    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
    audio_config = speechsdk.audio.AudioConfig(filename=cur_value)
    # Creates a speech recognizer using a file as audio input.
    # The default language is "en-us".
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

    result = speech_recognizer.recognize_once()

    if result.reason == speechsdk.ResultReason.RecognizedSpeech:
        print("Recognized: {}".format(result.text))
    elif result.reason == speechsdk.ResultReason.NoMatch:
        print("No speech could be recognized: {}".format(result.no_match_details))
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        print("Speech Recognition canceled: {}".format(cancellation_details.reason))
    if cancellation_details.reason == speechsdk.CancellationReason.Error:
        print("Error details: {}".format(cancellation_details.error_details))

    affected_doc.set({
        u'blob': cur_value
    })
