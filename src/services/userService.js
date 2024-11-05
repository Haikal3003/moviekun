import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const addToFavorite = async (userId, data) => {
  try {
    await updateDoc(doc(db, 'Users', userId), {
      favorites: arrayUnion(data),
    });
    console.log('Added to favorites');
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const addToWatchlist = async (userId, data) => {
  try {
    await updateDoc(doc(db, 'Users', userId), {
      watchlist: arrayUnion(data),
    });
    console.log('Added to watchlist');
  } catch (error) {
    console.error('Error adding to watchlist:', error);
  }
};
