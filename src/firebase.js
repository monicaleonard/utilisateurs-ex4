import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/firestore';

// Configuration (mettez-y les vôtres !)
const firebaseConfig = {
  apiKey: "AIzaSyBbip3noGuvFzsY6-FFwIfOa38yyie595U",
  authDomain: "monicaleonard-react.firebaseapp.com",
  projectId: "monicaleonard-react",
  storageBucket: "monicaleonard-react.appspot.com",
  messagingSenderId: "1011201813009",
  appId: "1:1011201813009:web:9094df5401658057f5dfb0"
};

// Initialiser Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialiser FirebaseUI
export const instanceFirebaseUI = new firebaseui.auth.AuthUI(firebase.auth());

// Initialiser Firestore
export const firestore = firebase.firestore();
