// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-blog-9f861.firebaseapp.com',
  projectId: 'mern-blog-9f861',
  storageBucket: 'mern-blog-9f861.appspot.com',
  messagingSenderId: '684184633643',
  appId: '1:684184633643:web:00612d7701b69cff11856e',
  measurementId: 'G-ZEC2C8BGXS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
