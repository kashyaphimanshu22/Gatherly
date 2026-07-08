import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaChair, FaMoneyBillWave } from 'react-icons/fa';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setBookingLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            if (!showOTP) {
                await api.post('/bookings/send-otp');
                setShowOTP(true);
                setSuccessMsg('OTP sent to your email. Please verify to confirm booking.');
            } else {
                await api.post('/bookings', { eventId: event._id, otp });
                setSuccessMsg('Booking requested! Awaiting admin confirmation.');
                setShowOTP(false);
                // Update local seats count dynamically after booking
                setEvent({ ...event, availableSeats: event.availableSeats - 1 });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

   if (loading)
    return (

        <div className="min-h-screen flex items-center justify-center">

            <div className="text-center">

                <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

                <p className="mt-6 text-xl font-bold text-gray-700">

                    Loading Event...

                </p>

            </div>

        </div>

    );
    if (error && !event) return <div className="min-h-screen flex items-center justify-center">

    <div className="text-center">

        <h1 className="text-7xl mb-4">

            😢

        </h1>

        <h2 className="text-4xl font-black mb-4">

            Event Not Found

        </h2>

        <p className="text-gray-500 mb-8">

            The event you're looking for doesn't exist or has been removed.

        </p>

        <button

            onClick={() => navigate("/")}

            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold"

        >

            Back to Events

        </button>

    </div>

</div>

    const isSoldOut = event.availableSeats <= 0;

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4 fade-in">
            {event.image ? (
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[500px] object-cover hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-white">
                        <p className="uppercase tracking-[4px] text-sm font-bold">
                            {event.category}
                        </p>
                        <h2 className="text-5xl font-black mt-2">
                            {event.title}
                        </h2>
                    </div>
                </div>
                
            ) : (
                <div className="w-full h-64 bg-gray-900 flex items-center justify-center text-white/50 text-6xl font-black uppercase tracking-widest">
                    {event.category}
                </div>
            )}
            {event.availableSeats <= 10 && event.availableSeats > 0 && (
                <div className="mt-6 inline-flex items-center gap-2 bg-red-100 text-red-600 px-5 py-3 rounded-full font-bold animate-pulse">
                    🔥 Hurry! Only {event.availableSeats} seats left
                    </div>
            )}

            <div className="grid lg:grid-cols-3 gap-10 mt-10">
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-10">
                    <div>
                        <div className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-bold uppercase tracking-wider shadow-lg mb-6">
                            🎉 {event.category}
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6"></h1>
                        <p className="text-xl text-gray-600 leading-9 mb-10"></p>
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-8">
                            <h2 className="text-2xl font-black text-gray-900 mb-5">About this Event</h2>
                            <p className="text-gray-600 leading-8">
                                Join this exciting event and connect with professionals, students,and enthusiasts. Enjoy expert sessions, networking opportunities,interactive activities, and hands-on experiences designed to helpyou learn and grow.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-blue-50 rounded-2xl p-6">
                                <p className="text-blue-600 text-sm font-bold uppercase">Event Type</p>
                                <h3 className="text-2xl font-black mt-2">
                                    {event.category}</h3>
                            </div>
                            <div className="bg-green-50 rounded-2xl p-6">
                                <p className="text-green-600 text-sm font-bold uppercase">Entry</p>
                                <h3 className="text-2xl font-black mt-2">{event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice}`}

                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="sticky top-28 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 h-fit transition duration-300 hover:shadow-3xl hover:-translate-y-1">
                        <div className="text-center mb-8">
                            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">Reserve Your Seat</p>
                            <h3 className="text-3xl font-black text-gray-900 mt-2">Booking Details</h3>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-xl">
                                <p className="uppercase text-sm tracking-widest opacity-80">Ticket Price</p>
                                <h2 className="text-4xl font-black mt-2">{event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice}`}</h2>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold text-gray-700">
                                        Available Seats
                                    </span>
                                    <span className="font-bold text-gray-800">
                                        {event.availableSeats}/{event.totalSeats}
                                    </span>
                                </div>
                                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-green-500 to-blue-600 transition-all duration-500"
                                style={{
                                    width: `${(event.availableSeats / event.totalSeats) * 100}%`,
                                }}>

                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            {event.availableSeats > 20
                            ? "Seats available"
                            : event.availableSeats > 5
                            ? "Limited seats left"
                            : "Almost sold out!"}
                        </p>
                             </div>

                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 shrink-0">
                                    <FaCalendarAlt />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-400 uppercase">Date</p>
                                    <p className="font-bold text-gray-800">{new Date(event.date).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-400 uppercase">Location</p>
                                    <p className="font-bold text-gray-800">{event.location}</p>
                                </div>
                            </div>
                        </div>

                        {showOTP && (
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Enter OTP to Confirm</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="6-digit code"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-700 transition shadow-sm font-bold tracking-widest text-center text-lg"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                />
                            </div>
                        )}

                        <button
                            onClick={handleBooking}
                            disabled={isSoldOut || bookingLoading || (showOTP && !otp)}
                            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition shadow-lg ${isSoldOut || (successMsg && !showOTP)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-900 hover:bg-black text-white hover:shadow-xl hover:-translate-y-1'
                                }`}
                        >
                            {bookingLoading ? 'Processing...' : (showOTP ? 'Verify OTP & Confirm' : (successMsg && !showOTP ? 'Request Sent' : (isSoldOut ? 'Sold Out' : 'Confirm Registration')))}
                        </button>
                        {error && <p className="text-red-500 mt-4 text-center font-medium bg-red-50 p-2 rounded">{error}</p>}
                        {successMsg && <p className="text-green-600 mt-4 text-center font-medium bg-green-50 p-2 rounded">{successMsg}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
