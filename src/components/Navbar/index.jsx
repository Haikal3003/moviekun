import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdNotifications } from 'react-icons/io';
import { HiOutlineSearch } from 'react-icons/hi';
import { navigation } from '../../contants/navigation';

const Navbar = () => (
  <nav id="navbar" className="relative ">
    <div className="flex justify-between items-center ">
      <div className="flex items-center">
        <NavLink to={'/'} id="logo-text" className="text-[2.3rem] font-bold">
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
        <div id="search" className="flex items-center">
          <div className="flex justify-center items-center w-[35px] h-[35px] border-2 border-secondary rounded-full text-[1.5rem] cursor-pointer">
            <HiOutlineSearch />
          </div>
        </div>

        <div id="notif-icon" className="flex justify-center items-center w-[35px] h-[35px] text-[1.5rem] bg-white border-2 border-secondary rounded-full cursor-pointer">
          <IoMdNotifications />
        </div>

        <button type="button" className="px-[4rem] py-4 bg-secondary text-white rounded-full font-semibold text-[1rem]">
          Login
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
