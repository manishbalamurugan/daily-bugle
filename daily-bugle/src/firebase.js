// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzoO_-My9-cjcQsOc7NPTo6MF9yaQfiyg",
  authDomain: "daily-bugle-828c7.firebaseapp.com",
  projectId: "daily-bugle-828c7",
  storageBucket: "daily-bugle-828c7.appspot.com",
  messagingSenderId: "953750711794",
  appId: "1:953750711794:web:1bb4b55c570c8c96954f6b",
  measurementId: "G-9C49T48N1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;