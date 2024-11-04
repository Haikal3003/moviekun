// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAyoc3RAlGyvgnh7UGpL9a4tJZybZshLE8',
  authDomain: 'moviekun-ccaaf.firebaseapp.com',
  projectId: 'moviekun-ccaaf',
  storageBucket: 'moviekun-ccaaf.firebasestorage.app',
  messagingSenderId: '81495337022',
  appId: '1:81495337022:web:16927c386b3df49d30096f',
  measurementId: 'G-8RHTW8S0W9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
