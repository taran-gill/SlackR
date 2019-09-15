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

from gensim.summarization.summarizer import summarize

#Use a service account

cred = credentials.Certificate({
  "type": "service_account",
  "project_id": "htnproject-5cbdb",
  "private_key_id": "7cc18df7e1fffb66a4cf3c5ed33b017082fb2a18",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQClxm6u9Z5WIQ3V\n3MK/MJNa8lvRxfTYW1oWgDihRde6KGh9KDaMP7lKjxSBKVJn3Ym5IA40t0Wmj1Sa\ne2+U3lB6vOCZKf/z8vAtaL2zWewxbX1zqUQrPaCITJVQYmZi86VOljP1o2wYgCfP\ng3ci5HC788rhhePvPpJFu8lcXq0Yq1uHRBTXcM34eWQEjOq0spD6fNzyP3+jCF4L\nI6C9ZDDWe6ZrkSriqsuOqN4xGC7q7Zq7l6vmjRpj8P6MjNPxgiX/GlqYFseYSjpx\nv/hF8994MWXOol5k+ClNiidtKuKrKivHa6yXpBa5UeIuZt69F1ZxqtgtzpeF8dZO\noqftZ8/5AgMBAAECggEAE/FHJ20M2zemvm+MTgu97lbxjM7Poad7svFB3sTUKuTp\njQTlawHPfJSx1sftzejsxISCsPzLODpN5zeqOLJ15A4MxuAyllpHYm8TQxwyOc/+\nI4fdV4ZWZY8w9zafMpA09rtDDO3X9yqTn3clQeFRXor5gR/mR8WzOwhYNPB+ylTB\nLYnc5gezW84pvphjUJsp7DfpsF4dqh8ZXoMwrmuQSMRCe3i6J6waNQnUaKTVx7Tr\njiJsfnzlYckucPARmr+E6zgXm/UMHhdnWUruHrn4Hg6DH8zVVsClTNRqumfnkria\nYQlGsN+wT1L35QzkMkiv6E9L4CL8DXN3WpOvydLKwQKBgQDhe+3wzyySAwJumyNI\nsUlbOMcUg2dR6ptBtpCWOcQXchQIKaDaSZ2iS5kQS1OTBdrkjsZikEPDcwr3X29o\nZQDb9Poa9f2Nmt0hVPHamJT+GfyZKsQSI0VfhsyPoO/wLdq6foNKC3ebh36b9jJ6\npShozRjLeKMS1x9kqm/mkMOgFQKBgQC8Ndbn5lj4b4FtyfoARr1sEWYaQBfBY9ju\nK2IZ6wEqAa0AEYSWuMytk3VTd5YpczUnmAlwyr8l40605Cs8LgsbMVFh67iXRi0m\nFAdp3WyvffE4wgCuEnx+yScSk2LB0+/QC9+xDqET+C43zUkAf/DvbckdOKYfOtoU\ntV+/fpZFVQKBgQC6jr3EIrUerWzCtIrR5xTpa6WTPFEsvm3sRa+FC5BJUbJvOnoC\ngSvyDpg6mggwuYRs3BAZloDqYfGt0AEuH3tBgYO48NPy6DGTFWPxV5LWVgvfcjm9\nQ/9u1OnE4AQE9Ptml6vqhGhWfxlq0pzbSnCPnTmph0ttGB26PSXOXvHsLQKBgQCD\npxmb/6pOphkgRj+Ff/YyqP0F8b1sPr7Y4yntPVEEJEXynU5k7AHojRRt/WHhvr/4\n4UYBSyFojFda+5wurXqBW/80guINlz4vu6Tv7b6AB5X8AODe4vmI6oZVXRmgwfKn\nUhb4UGZmhJ031XZyTgyoPuCGe0Dg6ZbxE2pVlmPhPQKBgQDhKqcedskY5zCc46rj\nzEovqpwRVQbc7qhLuggPTCvhd6iHJRuCfnO3Jrdk7upuYdtsUuRvGGt50kAr1mYN\n9gCd+9QhykvuDwdNPSQUXuMULnwljUTQ8VE0pVATUfhNRsiZJJo+WD05rrpWF34J\nCn9a7iTMcGSI3hRvdfLeIlry9w==\n-----END PRIVATE KEY-----\n",
  "client_email": "htnproject-5cbdb@appspot.gserviceaccount.com",
  "client_id": "100754208010301599821",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/htnproject-5cbdb%40appspot.gserviceaccount.com"
})
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
# def make_speech_data(data, context):
#     print(context.resource)
#     path_parts = context.resource.split('/documents/')[1].split('/')
#     collection_path = path_parts[0]
#     document_path = '/'.join(path_parts[1:])

#     affected_doc = client.collection(collection_path).document(document_path)

#     cur_value = data["blob"]

#     cur_value = base64.b64decode(cur_value)

#     speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
#     audio_config = speechsdk.audio.AudioConfig(filename=cur_value)
#     # Creates a speech recognizer using a file as audio input.
#     # The default language is "en-us".
#     speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

#     result = speech_recognizer.recognize_once()
result = str(result)
result = summarize(result,ratio = 0.5)
#result = result.text()

# if result.reason == speechsdk.ResultReason.RecognizedSpeech:
#     print("Recognized: {}".format(result.text))
# elif result.reason == speechsdk.ResultReason.NoMatch:
#     print("No speech could be recognized: {}".format(result.no_match_details))
# elif result.reason == speechsdk.ResultReason.Canceled:
#     cancellation_details = result.cancellation_details
#     print("Speech Recognition canceled: {}".format(cancellation_details.reason))
# if cancellation_details.reason == speechsdk.CancellationReason.Error:
#     print("Error details: {}".format(cancellation_details.error_details))


affected_doc = db.collection("summaries").document("aaaahhh")
affected_doc.set({
    u'summary': result
})
print(result)
