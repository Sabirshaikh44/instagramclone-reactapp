import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyANL8o8vBDkN4NR_ukdkKbNX0Ogws5hVvc",
    authDomain: "instagramclone-reactapp.firebaseapp.com",
    projectId: "instagramclone-reactapp",
    storageBucket: "instagramclone-reactapp.appspot.com",
    messagingSenderId: "656112345077",
    appId: "1:656112345077:web:f30db53c3c2a9b860ccabc",
    measurementId: "G-CLBZGQ2M1X",
})


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();




export {db,auth,storage}
