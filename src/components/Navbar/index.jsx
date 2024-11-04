import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { navigation } from '../../contants/navigation';
import { IoPersonCircleSharp, IoChevronForward } from 'react-icons/io5';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);

        const userDocRef = doc(db, 'Users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('User data not found in Firestore');
        }
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleModal = () => setShowModal((prev) => !prev);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      setIsAuthenticated(false);
      setUserData(null);
      setShowModal(false);

      // Set timeout to ensure sign-out completes before reload
      setTimeout(() => {
        navigate('/', { replace: true });
        window.location.reload();
      }, 500); // 500ms timeout
    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  return (
    <nav id="navbar" className="relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" id="logo-text" className="text-[2.3rem] font-bold">
            Moviekun.
          </NavLink>
          <ul className="flex text-[1.3rem] ml-[5rem] space-x-[5rem]">
            {navigation.map((link, i) => (
              <li key={i}>
                <NavLink to={link.href} className={({ isActive }) => (isActive ? 'text-black underline underline-offset-8 decoration-2 decoration-secondary' : 'text-black')}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <div onClick={toggleModal} className="flex items-center space-x-2 p-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-all">
                <IoPersonCircleSharp className="text-[3rem] text-black " />
                <div className="flex items-center">
                  <span className="text-[1.2rem] text-black font-semibold mr-4">{userData && `${userData.firstName} ${userData.lastName}`}</span>
                  <IoChevronForward className={`text-[1.4rem] ${showModal ? 'rotate-90' : ''}`} />
                </div>
              </div>
              {showModal && (
                <div className="absolute right-0 mt-[140px] text-[1.1rem] w-[160px] bg-white rounded-lg shadow-lg z-50 p-4">
                  <ul className="flex flex-col gap-2">
                    <Link to="/profile" className="w-full p-4 hover:bg-gray-100 rounded-lg">
                      <li>Profile</li>
                    </Link>
                    <Link className="w-full p-4 hover:bg-gray-100 rounded-lg" onClick={handleLogout}>
                      <li>Logout</li>
                    </Link>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="px-[4rem] py-4 bg-secondary text-white rounded-full font-semibold text-[1rem]">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
