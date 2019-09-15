import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('htnproject-5cbdb-7cc18df7e1ff.json')
firebase_admin.initialize_app(cred)

# import pyrebase

# config = {
#   "apiKey": "AIzaSyCa8QYWUcQ6e7DUMaSLNMeUCRuBe54mVA4",
#   "authDomain": "htnproject-5cbdb.firebaseapp.com",
#   "databaseURL": "https://htnproject-5cbdb.firebaseio.com",
#   "storageBucket": "htnproject-5cbdb.appspot.com"
# }

# firebase = pyrebase.initialize_app(config)

# db = firestore.client()

# doc_ref = db.collection(u'notes').document(u'a')
# doc_ref.set({
#     u'first': u'Alan',
# })

# users_ref = db.collection(u'notes')
# docs = users_ref.stream()

# for doc in docs: 
#     print(u'{} => {}'.format(doc.id, doc.to_dict()))
# import time
# import wave
# from pprint import pprint
# try:
#     import azure.cognitiveservices.speech as speechsdk
# except ImportError:
#     print("""
#     Importing the Speech SDK for Python failed.
#     Refer to
#     https://docs.microsoft.com/azure/cognitive-services/speech-service/quickstart-python for
#     installation instructions.
#     """)
#     import sys
#     sys.exit(1)


# # Set up the subscription info for the Speech Service:
# # Replace with your own subscription key and service region (e.g., "westus").

# speech_key, service_region = "a6fa0af422ed452ea8e75b094f4598cd", "eastus"

# # Creates an instance of a speech config with specified subscription key and service region.
# # Replace with your own subscription key and service region (e.g., "westus").
# speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)


# # Creates a recognizer with the given settings
# speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)

# print("Say something...")


# # # Starts speech recognition, and returns after a single utterance is recognized. The end of a
# # # single utterance is determined by listening for silence at the end or until a maximum of 15
# # # seconds of audio is processed.  The task returns the recognition text as result. 
# # # Note: Since recognize_once() returns only a single utterance, it is suitable only for single
# # # shot recognition like command or query. 
# # # For long-running multi-utterance recognition, use start_continuous_recognition() instead.
# result = speech_recognizer.recognize_once()

# # Checks result.
# if result.reason == speechsdk.ResultReason.RecognizedSpeech:
#     print("Recognized: {}".format(result.text))
# elif result.reason == speechsdk.ResultReason.NoMatch:
#     print("No speech could be recognized: {}".format(result.no_match_details))
# elif result.reason == speechsdk.ResultReason.Canceled:
#     cancellation_details = result.cancellation_details
#     print("Speech Recognition canceled: {}".format(cancellation_details.reason))
#     if cancellation_details.reason == speechsdk.CancellationReason.Error:
#         print("Error details: {}".format(cancellation_details.error_details))