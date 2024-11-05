import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { navigation } from '../../contants/navigation';
import { IoPersonCircleSharp, IoChevronForward } from 'react-icons/io5';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useUserContext } from '../../context/userContext';
import { FiSearch } from 'react-icons/fi';

const Navbar = () => {
  const { isAuthenticated, userData, setUserData } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (uid) => {
      const userDocRef = doc(db, 'Users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData({ ...userData, uid });
      } else {
        console.log('User data not found in Firestore');
      }
    };

    if (isAuthenticated) {
      const uid = auth.currentUser.uid;
      fetchUserData(uid);
    } else {
      setUserData(null);
    }
  }, [isAuthenticated, setUserData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((modalRef.current && !modalRef.current.contains(event.target)) || (searchInputRef.current && !searchInputRef.current.contains(event.target))) {
        setShowModal(false);
        setShowSearchInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleModal = () => setShowModal((prev) => !prev);
  const toggleSearch = () => setShowSearchInput((prev) => !prev);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/', { replace: true });
      window.location.reload();
    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  const handleProfileClick = () => {
    setShowModal((prev) => !prev);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${encodeURIComponent(e.target.value)}`);
      setShowSearchInput(false);
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

        <div className="relative flex items-center gap-6">
          <div className="p-3 text-[1.5rem] rounded-full border border-black cursor-pointer hover:bg-black hover:text-white" onClick={toggleSearch}>
            <FiSearch />
          </div>

          {showSearchInput ? (
            <div ref={searchInputRef} className="fixed top-[14%] left-1/2 -translate-x-1/2 w-[50%] p-5 text-[1.2rem] rounded-xl bg-white  z-50 border-2 border-black" onKeyDown={handleSearch}>
              <input type="search" className="bg-transparent w-full" placeholder="Search..." />
            </div>
          ) : (
            ''
          )}

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
                <div ref={modalRef} className="absolute right-0 mt-[140px] text-[1.1rem] w-[160px] bg-white rounded-lg shadow-lg z-50 p-4">
                  <ul className="flex flex-col gap-2">
                    <Link to="/profile" onClick={handleProfileClick} className="w-full p-4 hover:bg-gray-100 rounded-lg">
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
