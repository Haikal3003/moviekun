import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const userDocRef = doc(db, 'Users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
