import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { FaUserCircle, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/facilities', label: 'All Facilities' },
  ];

  const privateLinks = [
    { to: '/my-bookings', label: 'My Bookings' },
    { to: '/add-facility', label: 'Add Facility' },
    { to: '/manage-facilities', label: 'Manage Facilities' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">SportNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                {link.label}
              </Link>
            ))}
            
            {user && privateLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                {link.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-gray-500" />
                  )}
                  <span className="text-gray-700 dark:text-gray-300">{user.name?.split(' ')[0]}</span>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                {link.label}
              </Link>
            ))}
            {user && privateLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left py-2 text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 btn-primary text-center">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;