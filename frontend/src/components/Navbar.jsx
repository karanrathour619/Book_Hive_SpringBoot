import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineUser, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import logo from "../assets/logo.png";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Admin Portal", href: "/admin" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.cartItems);
  const wishlistItems = useSelector(state => state.cart.wishlistItems); // Fetch wishlist items
  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
    navigate("/")
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='max-w-screen-2xl mx-auto px-4 py-6'>
      <nav className='flex justify-between items-center'>
        {/* LEFT SIDE */}
        <div className='flex items-center md:gap-16 gap-4'>
          <Link to="/" className=''>
            <img src={logo} className='h-10' alt="Logo" />
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className='relative flex items-center md:space-x-3 space-x-2'>
          <div ref={dropdownRef}>
            {currentUser ? (
              <>
                <button
                  className='pt-2'
                  onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                >
                  <img
                    src={avatarImg}
                    alt="Avatar"
                    className={`size-6 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`}
                  />
                </button>
                {/* SHOW DROPDOWN */}
                {isDropDownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                    <ul className='py-2'>
                      {navigation.map((item) => (
                        <li key={item.name} onClick={() => setIsDropDownOpen(false)}>
                          <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className='size-6' />
              </Link>
            )}
          </div>

          <button className='hidden sm:block'>
            <Link to="/wishlist" className='flex items-center bg-red-600 sm:px-4 px-2 py-1 rounded-lg'>
              <HiOutlineHeart className='size-5' />
              {/* Show Wishlist Count */}
              {wishlistItems.length > 0 ? (
                <span className='text-sm font-semibold sm:ml-1'>{wishlistItems.length}</span>
              ) : (
                <span className='text-sm font-semibold sm:ml-1'>0</span>
              )}
            </Link>
          </button>

          <Link
            to="/cart"
            className='bg-primary p1 sm:px-4 px-2 py-1 flex items-center rounded-lg'
          >
            <HiOutlineShoppingCart className='size-5' />
            {/* Show Cart Count */}
            {cartItems.length > 0 ? (
              <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span>
            ) : (
              <span className='text-sm font-semibold sm:ml-1'>0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
