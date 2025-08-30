 
import React from 'react';

// eslint-disable-next-line react/prop-types
function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className='flex justify-between bg-indigo-900 p-4'>
      <div className="logo">
        <span className='font-bold text-xl mx-8 text-white'>TODO LisT</span>
      </div>
      <div className="text-white mr-8">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-600 px-4 py-1 rounded hover:bg-red-800">
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;