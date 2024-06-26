// plugins/firebaseConfig.js
import { defineNuxtPlugin } from "#app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBw_u3dWyIKzvILhgJ599Ov9y1aFtROtyM",
    authDomain: "quotedata-420d7.firebaseapp.com",
    projectId: "quotedata-420d7",
    storageBucket: "quotedata-420d7.appspot.com",
    messagingSenderId: "522906777781",
    appId: "1:522906777781:web:8c4d52c8857a78a35766fc"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  nuxtApp.provide("db", db);
});
