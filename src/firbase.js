import firebase from 'firebase'

export const firebaseConfig = {
  apiKey: "AIzaSyCQlcW6s4uQuatRlCXXf3MuYZoOwX8qMis",
  authDomain: "whatsup-clone-7a595.firebaseapp.com",
  databaseURL: "https://whatsup-clone-7a595.firebaseio.com",
  projectId: "whatsup-clone-7a595",
  storageBucket: "whatsup-clone-7a595.appspot.com",
  messagingSenderId: "619255255414",
  appId: "1:619255255414:web:8302d37276a45e5766ea57",
  measurementId: "G-6LCFNCXZK8"
};

const firebaseapp = firebase.initializeApp(firebaseConfig)

const db = firebaseapp.firestore();
const auth = firebase.auth();
const myStorage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider();

export {
  auth,
  provider,
  myStorage,
};
export default db;