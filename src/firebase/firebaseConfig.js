import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBnuilmSi3FsEKvcwNcZJtWb8eAuRmXh3U",
    authDomain: "psychologists-7c733.firebaseapp.com",
    databaseURL: "https://psychologists-7c733-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "psychologists-7c733",
    storageBucket: "psychologists-7c733.appspot.com",
    messagingSenderId: "74559828757",
    appId: "1:74559828757:web:953a87e40cd0b5b508ef1c",
    measurementId: "G-SQLLQTGX3R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);