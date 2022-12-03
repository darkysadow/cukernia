// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDVVAr_Bsq6u5HfnoU5Knb3VKH3quLZk8E",
  authDomain: "cukernia-test.firebaseapp.com",
  projectId: "cukernia-test",
  storageBucket: "cukernia-test.appspot.com",
  messagingSenderId: "361647375434",
  appId: "1:361647375434:web:2be807618439e0ecd712b3"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;