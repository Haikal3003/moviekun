import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export const registerUser = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      await setDoc(doc(db, 'Users', user.uid), {
        email: email,
        firstName: firstName,
        lastName: lastName,
        favorites: [],
        watchlist: [],
      });

      console.log('User Registered Successfully!!');
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    console.log('User Login Successfully!!');

    return userCredential.user;
  } catch (error) {
    console.log(error);
  }
};
