// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth"
import { firebaseOMG } from "./config/dev";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: firebaseOMG.apiKey,
    authDomain: firebaseOMG.authDomain,
    projectId: firebaseOMG.projectId,
    storageBucket: firebaseOMG.storageBucket,
    messagingSenderId: firebaseOMG.messagingSenderId,
    appId: firebaseOMG.appId,
    measurementId: firebaseOMG.measurementId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const analytics = getAnalytics(firebase.initializeApp(firebaseConfig));


export default firebase;