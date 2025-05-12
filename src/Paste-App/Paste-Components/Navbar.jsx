import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 shadow-md">
      <div className="max-w-[65%] mx-auto flex items-center justify-between py-4 px-4 sm:px-0">
        <div className="flex gap-8 items-center text-lg font-medium text-white">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-white border-b-2 border-indigo-500 pb-1'
                : 'text-gray-400 hover:text-white transition'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              isActive
                ? 'text-white border-b-2 border-indigo-500 pb-1'
                : 'text-gray-400 hover:text-white transition'
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
