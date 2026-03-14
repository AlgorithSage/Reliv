import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7I6HgtHg1Q7REYSJly_4xdTybXznJwmA",
  authDomain: "reliv-2026.firebaseapp.com",
  projectId: "reliv-2026",
  storageBucket: "reliv-2026.firebasestorage.app",
  messagingSenderId: "909024074928",
  appId: "1:909024074928:web:e8e7773f4c1b3fe3a4af75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Explicitly enable network to fix "client is offline" errors
enableNetwork(db).catch((err) => {
    console.error("Firestore enableNetwork failed:", err);
});

export default app;
