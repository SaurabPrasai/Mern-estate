// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-76d7d.firebaseapp.com",
  projectId: "mern-estate-76d7d",
  storageBucket: "mern-estate-76d7d.appspot.com",
  messagingSenderId: "946577544220",
  appId: "1:946577544220:web:22fdc01c4e92ea461cbbd9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);