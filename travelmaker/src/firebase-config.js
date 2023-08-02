// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5nOi8TiEmCtLeBBfNBqIz-pNklYR6L3Y",
  authDomain: "travelmaker-42df0.firebaseapp.com",
  projectId: "travelmaker-42df0",
  storageBucket: "travelmaker-42df0.appspot.com",
  messagingSenderId: "1036149221052",
  appId: "1:1036149221052:web:9394590f765f27407cd2b9",
  measurementId: "G-QXGDXBZH2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
