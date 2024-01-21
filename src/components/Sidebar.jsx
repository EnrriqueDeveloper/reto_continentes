import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ openSideBar, setOpenSideBar }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setOpenSideBar(false);  // Cierra la barra lateral al hacer clic en un enlace
  };

  return (
    <div className={`${!openSideBar && "hidden"} md:block bg-gray-800 w-9/12 text-white fixed md:relative z-[100] h-screen md:w-[300px]  top-0 left-0`}>
      <div className="p-4">
        <div className="mb-4 text-center flex md:block justify-between">
          <Link to='/'>
            <img src={logo} alt="Logo" className="mx-auto mb-2 w-16 h-16" />
          </Link>
          <button onClick={() => setOpenSideBar(false)} className="md:hidden text-3xl">
            <FaTimes />
          </button>
        </div>
        <ul>
          <li className="mb-2">
            <Link to="/" className={`text-2xl block py-2 px-4 rounded focus:outline-none ${activeLink === '/' ? 'bg-gray-700' : ''}`} onClick={() => handleLinkClick('/')}>
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/vista1" className={`text-2xl block py-2 px-4 rounded focus:outline-none ${activeLink === '/vista1' ? 'bg-gray-700' : ''}`} onClick={() => handleLinkClick('/vista1')}>
              Vista 1
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/vista2" className={`text-2xl block py-2 px-4 rounded focus:outline-none ${activeLink === '/vista2' ? 'bg-gray-700' : ''}`} onClick={() => handleLinkClick('/vista2')}>
              Vista 2
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
