import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAJ7D7S4DpxmtMcvOHWzfY2DsV6_syCdI4",
    authDomain: "ur-code-base.firebaseapp.com",
    projectId: "ur-code-base",
    storageBucket: "ur-code-base.appspot.com",
    messagingSenderId: "827272485747",
    appId: "1:827272485747:web:fcc22beb104b59c5410306",
    measurementId: "G-R3EBK64QFZ"
  };

  firebase.initializeApp(config);
  export default firebase;