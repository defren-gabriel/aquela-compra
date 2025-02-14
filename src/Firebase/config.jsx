// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn-j_vnVpbKX1ST_z8KJthrn19UXXxPls",
  authDomain: "aquela-compra.firebaseapp.com",
  projectId: "aquela-compra",
  storageBucket: "aquela-compra.firebasestorage.app",
  messagingSenderId: "837975569108",
  appId: "1:837975569108:web:ece04de4b5dfe2fa1bc141",
  measurementId: "G-RN3PKHC4XN"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };