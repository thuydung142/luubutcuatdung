import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBbSVZLvkDTdoBbXleMlKXCM9ikVX6Es0",
  authDomain: "luubutcuatdung.firebaseapp.com",
  projectId: "luubutcuatdung",
  storageBucket: "luubutcuatdung.firebasestorage.app",
  messagingSenderId: "733698874554",
  appId: "1:733698874554:web:8496438be5353c73b67683"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
