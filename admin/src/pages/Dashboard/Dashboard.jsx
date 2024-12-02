import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBookings } from '../../features/booking/bookingSlice';
import BookingList from '../../components/BookingList/BookingList';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { bookings, isLoading, isError, message } = useSelector((state) => state.booking);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            dispatch(getBookings());
        }
    }, [user, dispatch, navigate]);

    if (isLoading) {
        return <div>Loading...</div>; // Add a loading state
    }


    return (
        <div>
            <h1 className="heading center">Dashboard</h1>
            {bookings && bookings.length > 0 ? <BookingList data={bookings} /> : null}
        </div> 
    );
};

export default Dashboard;
