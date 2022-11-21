import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjdsgFcYExykyBqvI0ptQemeHuLx4Hq68",
  authDomain: "users-api-efaef.firebaseapp.com",
  projectId: "users-api-efaef",
  storageBucket: "users-api-efaef.appspot.com",
  messagingSenderId: "786864365903",
  appId: "1:786864365903:web:ab160b3ba8569c98d3253a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
