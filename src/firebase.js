import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCa8QYWUcQ6e7DUMaSLNMeUCRuBe54mVA4",
    authDomain: "htnproject-5cbdb.firebaseapp.com",
    databaseURL: "https://htnproject-5cbdb.firebaseio.com",
    projectId: "htnproject-5cbdb",
    storageBucket: "htnproject-5cbdb.appspot.com",
    messagingSenderId: "796354320484",
    appId: "1:796354320484:web:37161e51ca83c1943aa771"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;