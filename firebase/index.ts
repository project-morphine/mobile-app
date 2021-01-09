import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCOtvTtP42s2FK73VLSqbjAS75lWLQL2jE",
  authDomain: "project-morphine.firebaseapp.com",
  projectId: "project-morphine",
  storageBucket: "project-morphine.appspot.com",
  messagingSenderId: "141134045475",
  appId: "1:141134045475:web:605e90c66c8cebadf02c96",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
