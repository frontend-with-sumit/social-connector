import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2i34cbuku56HLyzQHpLk3rzCnQawt8Gw",
  authDomain: "social-connector-c2ed1.firebaseapp.com",
  projectId: "social-connector-c2ed1",
  storageBucket: "social-connector-c2ed1.appspot.com",
  messagingSenderId: "29011116271",
  appId: "1:29011116271:web:7842c812a1b7393cf6db1a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fileStorage = getStorage(app);

export { fileStorage };
