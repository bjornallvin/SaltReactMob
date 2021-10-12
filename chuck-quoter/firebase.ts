// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/firestore";
import "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2ICTEWr_AtIUfwBxgVc8vtgBg7knPeA4",
  authDomain: "chuckquoter.firebaseapp.com",
  projectId: "chuckquoter",
  storageBucket: "chuckquoter.appspot.com",
  messagingSenderId: "120688749166",
  appId: "1:120688749166:web:fe0b7e46d640dff8d1947f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const db = firebase.firestore();

// Initialize Firebase
