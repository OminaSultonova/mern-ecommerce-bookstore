// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpvjXuMBWcuafpu_IzQQXL7OSQoTzGPP8",
  authDomain: "ecommerce-52299.firebaseapp.com",
  projectId: "ecommerce-52299",
  storageBucket: "ecommerce-52299.appspot.com",
  messagingSenderId: "6447870233",
  appId: "1:6447870233:web:71e3ba09558f75cedf5588"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const storage = getStorage(app);


export { auth, provider, storage };