import React, { useEffect } from 'react';
import { getRooms } from '../../features/room/roomSlice';
import { useDispatch, useSelector } from 'react-redux';
import RoomList from '../../components/RoomList/RoomList';

const Rooms = () => {
    const dispatch = useDispatch();
    const { rooms, isLoading, isError, message } = useSelector((state) => state.room);

    // Fetch rooms on component mount
    useEffect(() => {
        dispatch(getRooms());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div>
                <h1 className="heading center">Rooms</h1>
                <p>Loading...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <h1 className="heading center">Rooms</h1>
                <p>Error: {message || 'Failed to fetch rooms.'}</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="heading center">Rooms</h1>
            {rooms && rooms.length > 0 ? (
                <RoomList data={rooms} />
            ) : (
                <p>No rooms available.</p>
            )}
        </div>
    );
};

export default Rooms;
