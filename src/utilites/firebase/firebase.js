import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configure Firebase.
const firebaseConfig = {
  // Insert your Firebase project's configuration here
  apiKey: "AIzaSyDVVAr_Bsq6u5HfnoU5Knb3VKH3quLZk8E",
  authDomain: "cukernia-test.firebaseapp.com",
  projectId: "cukernia-test",
  storageBucket: "cukernia-test.appspot.com",
  messagingSenderId: "361647375434",
  appId: "1:361647375434:web:2be807618439e0ecd712b3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
