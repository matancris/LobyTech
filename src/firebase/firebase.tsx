// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue, set, remove, update } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { config } from "../config"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: "lobbytech1.firebaseapp.com",
    databaseURL: "https://lobbytech1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lobbytech1",
    storageBucket: "lobbytech1.firebasestorage.app",
    messagingSenderId: "853874475524",
    appId: "1:853874475524:web:c171e567b290289e47ab51",
    measurementId: "G-H1CYMS7WKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);
// connectDatabaseEmulator(db, "localhost", 9000);

const auth = getAuth(app);

const connectedRef = ref(db, ".info/connected");
onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
        console.log("Connected to Firebase!");
    } else {
        console.log("Not connected to Firebase.");
    }
});


export const firebase = {
    ref,
    child,
    get,
    db,
    set,
    remove,
    update,
    auth,
    signInWithEmailAndPassword
}