import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCPch54yL4xJoJlKSF9j5nelyModNllK6U",
  authDomain: "gestaoescolarapp-8a78c.firebaseapp.com",
  projectId: "gestaoescolarapp-8a78c",
  storageBucket: "gestaoescolarapp-8a78c.firebasestorage.app",
  messagingSenderId: "844532970505",
  appId: "1:844532970505:web:82e92c3df249a8bcef74d8",
  measurementId: "G-5898RR5QGC"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth };