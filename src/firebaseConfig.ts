// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBynz-4-HU1OZNwCnqvbwCbU_m38B36iQI",
  authDomain: "fir-nextjs-docker.firebaseapp.com",
  projectId: "fir-nextjs-docker",
  storageBucket: "fir-nextjs-docker.firebasestorage.app",
  messagingSenderId: "549516530472",
  appId: "1:549516530472:web:887fba06e57481b12cb61d",
  measurementId: "G-PS7VZ1Y1HL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();