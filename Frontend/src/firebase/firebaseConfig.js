import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8EZx9qKmO_gzFKMuCT0_citAk1BsImrg",
  authDomain: "taskify-e5c12.firebaseapp.com",
  projectId: "taskify-e5c12",
  storageBucket: "taskify-e5c12.firebasestorage.app",
  messagingSenderId: "taskify-e5c12.firebasestorage.app",
  appId: "1:1023248745864:web:6a91c36927fafd1d93e63d",
  measurementId: "G-STJSBVM945"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };