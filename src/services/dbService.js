import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Fetch a user's profile document
 * @param {string} uid 
 */
export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

/**
 * Update a user's profile (e.g., updating their last known location)
 * @param {string} uid 
 * @param {object} dataToUpdate 
 */
export const updateUserProfile = async (uid, dataToUpdate) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, dataToUpdate);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

/**
 * Fetch all providers (to be filtered client-side by distance)
 * Note: For production scaling, consider adding basic geo-hashing, 
 * but client-side filtering works well for early-stage hyperlocal apps.
 */
export const getProviders = async () => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'provider'));
    
    const querySnapshot = await getDocs(q);
    const providers = [];
    
    querySnapshot.forEach((doc) => {
      providers.push({ id: doc.id, ...doc.data() });
    });
    
    return providers;
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw error;
  }
};