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
  getDoc,
  updateDoc,
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

// function to check if user is logged in with firebase
const checkUserStatus = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      return { loggedIn: true, user: user };
    } else {
      return { loggedIn: false };
    }
  } catch (error) {
    console.error("Error checking user status:", error);
    return { loggedIn: false, error: error.message };
  }
};

const logout = () => {
  signOut(auth);
};

const readDataFromFirestore = async (collectionName, documentId = null) => {
  try {
    const collectionRef = collection(db, collectionName);
    if (documentId) {
      const docRef = doc(collectionRef, documentId);
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();
      return data;
    }
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.error("Error reading data from Firestore:", error);
    throw error;
  }
};

const writeDataToFirestore = async (collectionName, data, docID = null) => {
  try {
    const collectionRef = collection(db, collectionName);
    let docRef;
    if (docID) {
      docRef = doc(collectionRef, docID);
      await updateDoc(docRef, data);
    } else {
      docRef = await addDoc(collectionRef, data);
    }
    return docRef.id; // Return the ID of the document
  } catch (error) {
    console.error("Error writing data to Firestore:", error);
    throw error;
  }
};

module.exports = {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  checkUserStatus,
  readDataFromFirestore,
  writeDataToFirestore,
};
