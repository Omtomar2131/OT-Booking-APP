import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Room.styles.scss';
import Carousel from '../../features/Carousel/Carousel';

const Room = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setRoom(data);
      } catch (error) {
        setError('Failed to fetch room data');
      }
    };

    getRoom();
  }, [id]);

  return (
    <div className="room-container">
      {error && <p className="error-message">{error}</p>}
      {!room && !error ? (
        <p className="loading-message">Loading...</p>
      ) : room ? (
        <div className="room-details">
          <h1 className="room-name">{room.name}</h1>
          <div className="room-image-wrapper">
            <Carousel data={room.img} />
          </div>
          <p className="room-description">{room.desc}</p>
          <p className="room-price">${room.price}</p>
          <Link to={`/bookings/${room._id}`} className="book-now-link">
            Book Now
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Room;
