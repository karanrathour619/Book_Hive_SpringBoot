// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "dummy-api-key-for-local-dev",
  authDomain: import.meta.env.VITE_Auth_Domain || "bookhive.firebaseapp.com",
  projectId: import.meta.env.VITE_Project_Id || "bookhive",
  storageBucket: import.meta.env.VITE_Storage_Bucket || "bookhive.appspot.com",
  messagingSenderId: import.meta.env.VITE_Messaging_SenderId || "123456789",
  appId: import.meta.env.VITE_App_Id || "1:123456789:web:abcdef"
};

let authInstance = null;
try {
  const app = initializeApp(firebaseConfig);
  authInstance = getAuth(app);
} catch (e) {
  console.warn("Firebase initialization skipped or failed due to missing configuration:", e);
}

export const auth = authInstance;