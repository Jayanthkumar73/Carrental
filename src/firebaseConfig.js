import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAVzl6zo6EEQFRpWJWV6zVhIePAUzFL_lA",
  authDomain: "car-bike-rental-e0e56.firebaseapp.com",
  projectId: "car-bike-rental-e0e56",
  storageBucket: "car-bike-rental-e0e56.firebasestorage.app",
  messagingSenderId: "697274893257",
  appId: "1:697274893257:web:6d829adf5a4ed0448b5e18",
  measurementId: "G-Y4N030ZLTY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
