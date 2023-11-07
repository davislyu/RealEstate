// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-902e6.firebaseapp.com",
  projectId: "mern-estate-902e6",
  storageBucket: "mern-estate-902e6.appspot.com",
  messagingSenderId: "376460166147",
  appId: "1:376460166147:web:b0e85e6cd9d8fb017e7a36",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
