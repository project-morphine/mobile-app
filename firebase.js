import * as firebase from "firebase";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCOtvTtP42s2FK73VLSqbjAS75lWLQL2jE",
  authDomain: "project-morphine.firebaseapp.com",
  databaseURL: "https://project-morphine-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-morphine",
  storageBucket: "project-morphine.appspot.com",
  messagingSenderId: "141134045475",
  appId: "1:141134045475:web:605e90c66c8cebadf02c96"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
};

const auth = firebase.auth();

export { auth };