import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC2xCd22FD8TfITEogBcDoabLL9oTqaJb0",
    authDomain: "chat-app-a250c.firebaseapp.com",
    projectId: "chat-app-a250c",
    storageBucket: "chat-app-a250c.appspot.com",
    messagingSenderId: "757339160982",
    appId: "1:757339160982:web:753bfefb7c29f9afbbddb7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);