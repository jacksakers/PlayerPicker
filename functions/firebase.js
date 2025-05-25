const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} = require("firebase/auth");
const {
  getFirestore,
  query,
  getDocs,
  setDoc,
  doc,
  collection,
  where,
  addDoc,
} = require("firebase/firestore");
const firebaseAPIKey = require("./apiKeys").firebaseAPIKey;
const firebaseConfig = {
  apiKey: firebaseAPIKey,
  authDomain: "playerpicker.firebaseapp.com",
  projectId: "playerpicker",
  storageBucket: "playerpicker.firebasestorage.app",
  messagingSenderId: "130339742848",
  appId: "1:130339742848:web:667e50d1155db12c823265",
  measurementId: "G-G29T6GH5JP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userid = user.uid;
    await setDoc(doc(db, "users", userid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
module.exports = {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
