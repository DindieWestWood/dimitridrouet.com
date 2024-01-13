// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb_OD3jnmjZec7A0swU-wQFOVqETNoA5Q",
  authDomain: "dimitri-drouet-com.firebaseapp.com",
  databaseURL: "https://dimitri-drouet-com-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dimitri-drouet-com",
  storageBucket: "dimitri-drouet-com.appspot.com",
  messagingSenderId: "575635575619",
  appId: "1:575635575619:web:480b51e31c45a05dfd55f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);