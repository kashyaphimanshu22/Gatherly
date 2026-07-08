import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
    FaTicketAlt,
    FaBars,
    FaTimes,
    FaUserCircle
} from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const activeClass = (path) =>
        location.pathname === path
            ? 'text-blue-600 font-bold'
            : 'text-gray-700 hover:text-blue-600';

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/90 backdrop-blur-lg shadow-lg'
                    : 'bg-white'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex items-center justify-between h-20">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition">
                            <FaTicketAlt />
                        </div>

                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900">
                                Gatherly
                            </h1>

                            <p className="text-xs text-gray-500 -mt-1">
                                Event Booking Platform
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}

                    <div className="hidden md:flex items-center gap-8">

                        <Link
                            className={activeClass('/')}
                            to="/"
                        >
                            Events
                        </Link>

                        {user && (
                            <Link
                                className={activeClass(
                                    user.role === 'admin'
                                        ? '/admin'
                                        : '/dashboard'
                                )}
                                to={
                                    user.role === 'admin'
                                        ? '/admin'
                                        : '/dashboard'
                                }
                            >
                                Dashboard
                            </Link>
                        )}

                    </div>

                    {/* Right Side */}

                    <div className="hidden md:flex items-center gap-4">

                        {user ? (
                            <>
                                <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">

                                    <FaUserCircle className="text-2xl text-blue-600" />

                                    <div>

                                        <p className="font-semibold text-sm">
                                            {user.name}
                                        </p>

                                        <p className="text-xs text-gray-500 capitalize">
                                            {user.role}
                                        </p>

                                    </div>

                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition shadow-md"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="font-semibold text-gray-700 hover:text-blue-600"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Button */}

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-2xl"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                </div>

                {/* Mobile Menu */}

                {menuOpen && (

                    <div className="md:hidden border-t py-5 space-y-4">

                        <Link
                            onClick={() => setMenuOpen(false)}
                            to="/"
                            className="block"
                        >
                            Events
                        </Link>

                        {user && (
                            <Link
                                onClick={() => setMenuOpen(false)}
                                to={
                                    user.role === 'admin'
                                        ? '/admin'
                                        : '/dashboard'
                                }
                                className="block"
                            >
                                Dashboard
                            </Link>
                        )}

                        {user ? (
                            <>
                                <div className="font-semibold">
                                    {user.name}
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-500 text-white py-3 rounded-xl"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    onClick={() => setMenuOpen(false)}
                                    to="/login"
                                    className="block"
                                >
                                    Login
                                </Link>

                                <Link
                                    onClick={() => setMenuOpen(false)}
                                    to="/register"
                                    className="block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl text-center"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                    </div>

                )}

            </div>
        </header>
    );
};

export default Navbar;