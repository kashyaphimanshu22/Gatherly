import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400); // 400ms debounce
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get(`/events?search=${search}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-black text-white rounded-3xl overflow-hidden mb-12 shadow-2xl">
                <div className="absolute inset-0 bg-cover bg-center scale-110"style={{backgroundImage:"url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=2000&auto=format&fit=crop')"}}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/80"></div>
                <div className="relative p-10 md:p-20 text-center flex flex-col items-center z-10">
                    <span className="bg-white/20 text-white backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">Welcome to Gatherly</span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight drop-shadow-lg">
                        Discover Amazing<br /><span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">Events Near You</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Book concerts, hackathons, workshops, conferences and networking events with a secure and seamless booking experience.
                    </p>

                    <div className="relative w-full max-w-4xl mx-auto">                        
                        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                        <input 
                        type="text"
                        placeholder="Search events by title..."
                        className="w-full pl-16 pr-40 py-5 rounded-full text-lg text-black bg-white shadow-2xl focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}/>
                        <button onClick={() =>document.getElementById("events-section")?.scrollIntoView({behavior: "smooth",})}className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition">Explore →</button>                    </div>
                </div>
            </div>

            {/* Why Choose Us / Features row */}
            {/* ===== Why Choose Gatherly ===== */}

<section className="mb-20">

    <div className="text-center mb-12">

        <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">

            Why Choose Us

        </span>

        <h2 className="text-4xl font-black text-gray-900 mt-3">

            Book Events With Confidence

        </h2>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">

            Gatherly provides a secure, fast and modern platform for discovering
            and booking amazing events.

        </p>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Card 1 */}

        <div className="group bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-3 transition duration-300">

            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl mb-6 group-hover:rotate-6 transition">

                <FaRegClock />

            </div>

            <h3 className="text-2xl font-bold mb-4">

                Fast Booking

            </h3>

            <p className="text-blue-100 leading-7">

                Reserve your seats within seconds using our optimized booking
                system and instant confirmation.

            </p>

        </div>

        {/* Card 2 */}

        <div className="group bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-3 transition duration-300">

            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl mb-6 group-hover:rotate-6 transition">

                <FaTicketAlt />

            </div>

            <h3 className="text-2xl font-bold mb-4">

                Instant Tickets

            </h3>

            <p className="text-purple-100 leading-7">

                Receive your booking confirmation instantly and manage all
                your registrations from your dashboard.

            </p>

        </div>

        {/* Card 3 */}

        <div className="group bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-3 transition duration-300">

            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl mb-6 group-hover:rotate-6 transition">

                <FaShieldAlt />

            </div>

            <h3 className="text-2xl font-bold mb-4">

                Secure Platform

            </h3>

            <p className="text-green-100 leading-7">

                OTP verification, encrypted authentication and secure APIs
                keep your account protected.

            </p>

        </div>

    </div>

</section>

            <div className="flex items-center justify-between mb-8 px-2 border-b border-gray-200 pb-4">
                <h2 className="text-3xl font-extrabold text-gray-900">Upcoming Events</h2>
                <div className="text-gray-500 font-medium">{events.length} results found</div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-xl font-semibold text-gray-600">Loading events...</div>
            ) : events.length === 0 ? (
                <div className="text-center py-20 text-xl text-gray-500">No events found matching your search.</div>
            ) : (
                <div id="events-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => (
                        <div
        key={event._id}
        className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-300 flex flex-col"
    >

        {/* Image */}

        <div className="relative overflow-hidden h-60">

            {event.image ? (

                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

            ) : (

                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-3xl font-black">

                    {event.category}

                </div>

            )}

            {/* Category */}

            <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">

                {event.category}

            </span>

            {/* Price */}

            <span className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">

                {event.ticketPrice === 0 ? (
                    <span className="text-green-600">FREE</span>
                ) : (
                    <>₹{event.ticketPrice}</>
                )}

            </span>

        </div>

        {/* Content */}

        <div className="p-6 flex flex-col flex-grow">

            <h2 className="text-2xl font-extrabold text-gray-900 mb-3 line-clamp-2">

                {event.title}

            </h2>

            <p className="text-gray-500 text-sm mb-5 line-clamp-2">

                {event.description}

            </p>

            <div className="space-y-3 text-gray-600 mb-6">

                <div className="flex items-center gap-3">

                    <FaCalendarAlt className="text-blue-600" />

                    <span>

                        {new Date(event.date).toLocaleDateString()}

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <FaMapMarkerAlt className="text-red-500" />

                    <span>

                        {event.location}

                    </span>

                </div>

            </div>

            {/* Seats */}

            <div className="mb-6">

                <div className="flex justify-between text-sm mb-2">

                    <span className="font-semibold">

                        Seats Left

                    </span>

                    <span>

                        {event.availableSeats}/{event.totalSeats}

                    </span>

                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                    <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-600"
                        style={{
                            width: `${(event.availableSeats / event.totalSeats) * 100}%`,
                        }}
                    ></div>

                </div>

            </div>

            <Link
                to={`/events/${event._id}`}
                className="mt-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white py-3 rounded-xl font-bold shadow-lg transition duration-300"
            >

                View Details →

            </Link>

        </div>

    </div>
                    ))}
                </div>
            )}

            {/* Footer Section */}
            {/* ===== Premium Footer ===== */}

<footer className="mt-24 bg-gray-900 text-white rounded-t-[40px] overflow-hidden">

    <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid md:grid-cols-4 gap-12">

            {/* Brand */}

            <div>

                <div className="flex items-center gap-3 mb-5">

                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">

                        <FaTicketAlt className="text-2xl" />

                    </div>

                    <h2 className="text-3xl font-black">

                        Gatherly

                    </h2>

                </div>

                <p className="text-gray-400 leading-8">

                    India's modern event booking platform for
                    conferences, hackathons, workshops,
                    concerts and much more.

                </p>

            </div>

            {/* Quick Links */}

            <div>

                <h3 className="font-bold text-xl mb-5">

                    Quick Links

                </h3>

                <ul className="space-y-3 text-gray-400">

                    <li>
                        <Link to="/" className="hover:text-white transition">
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/" className="hover:text-white transition">
                            Events
                        </Link>
                    </li>

                    <li>
                        <Link to="/login" className="hover:text-white transition">
                            Login
                        </Link>
                    </li>

                    <li>
                        <Link to="/register" className="hover:text-white transition">
                            Register
                        </Link>
                    </li>

                </ul>

            </div>

            {/* Categories */}

            <div>

                <h3 className="font-bold text-xl mb-5">

                    Categories

                </h3>

                <ul className="space-y-3 text-gray-400">

                    <li>Technology</li>

                    <li>Business</li>

                    <li>Music</li>

                    <li>Workshop</li>

                    <li>Sports</li>

                </ul>

            </div>

            {/* Contact */}

            <div>

                <h3 className="font-bold text-xl mb-5">

                    Contact

                </h3>

                <p className="text-gray-400 mb-3">

                    📧 support@gatherly.com

                </p>

                <p className="text-gray-400 mb-3">

                    📍 New Delhi, India

                </p>

                <p className="text-gray-400">

                    ☎ +91 98765 43210

                </p>

            </div>

        </div>

        <div className="border-t border-gray-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center">

            <p className="text-gray-500">

                © {new Date().getFullYear()} Gatherly. All rights reserved.

            </p>

            <p className="text-gray-500 mt-4 md:mt-0">

                Built with ❤️ using React + Node.js

            </p>

        </div>

    </div>

</footer>
        </div>
    );
};

export default Home;
