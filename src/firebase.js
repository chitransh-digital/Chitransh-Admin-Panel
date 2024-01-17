// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDduEMAjfmJH53V6mdKuc0_oH1-4K9cs9s",
  authDomain: "community-app-a2ac0.firebaseapp.com",
  projectId: "community-app-a2ac0",
  storageBucket: "community-app-a2ac0.appspot.com",
  messagingSenderId: "748985961633",
  appId: "1:748985961633:web:e5a82d8f99cbccc71ff4e0",
  measurementId: "G-QR8EYRKTV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
