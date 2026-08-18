import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

/**
 * Register a new user and create their Firestore profile
 * @param {string} email 
 * @param {string} password 
 * @param {string} role - 'customer' | 'provider'
 * @param {object} additionalData - e.g., name, phone
 */
export const registerUser = async (email, password, role, additionalData = {}) => {
  try {
    // 1. Create Auth User
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Create Firestore User Document
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      role: role, // Crucial for role-based routing
      createdAt: serverTimestamp(),
      ...additionalData
    });

    return user;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
};

/**
 * Log in an existing user
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};

/**
 * Log out the current user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error in logoutUser:", error);
    throw error;
  }
};