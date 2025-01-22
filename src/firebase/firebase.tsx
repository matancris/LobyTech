// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue, set, remove, update } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, listAll, deleteObject, uploadBytesResumable } from 'firebase/storage';

import { config } from "../config"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(config.firebase);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

const connectedRef = ref(db, ".info/connected");
onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
        console.log("Connected to Firebase!!");
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
    signInWithEmailAndPassword,
    storage,
    storageRef,
    uploadBytes,
    getDownloadURL,
    listAll,
    deleteObject,
    uploadBytesResumable
}