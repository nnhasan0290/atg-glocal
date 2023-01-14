import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhivuYywnOBoifzAgAB4xENObSAPGCn5Q",
  authDomain: "glocalbodh.firebaseapp.com",
  projectId: "glocalbodh",
  storageBucket: "glocalbodh.appspot.com",
  messagingSenderId: "601816233611",
  appId: "1:601816233611:web:843697475f3e772a94068e",
  measurementId: "G-DPM2N6KP64",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default auth;
