// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQCs6m-XiKXTjSHPpqBkxbjBy07VvjmiQ",
  authDomain: "todo-71d1b.firebaseapp.com",
  projectId: "todo-71d1b",
  storageBucket: "todo-71d1b.appspot.com",
  messagingSenderId: "742448826040",
  appId: "1:742448826040:web:613f58da28893952e8164d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appAuthWorker = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = initializeFirestore(app, { experimentalForceLongPolling: true, });
export const auth = getAuth(app);
export const authWorker = getAuth(appAuthWorker);
export const storage = getStorage(app);
export const functions = getFunctions(app);
