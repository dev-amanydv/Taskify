import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjmuRBoLwx49it3cfrv1LlbPMtABzhluw",
  authDomain: "taskify-453001.firebaseapp.com",
  projectId: "taskify-453001",
  storageBucket: "taskify-453001.firebasestorage.app",
  messagingSenderId: "312233782837",
  appId: "1:312233782837:web:bfbe096a8bae499dd68b7c",
  measurementId: "G-67L15GZVX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };