import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Room.styles.scss';
import { deleteRoom } from '../../features/room/roomSlice';
import { useDispatch } from 'react-redux';
import Carousel from '../../components/Carousel/Carousel';

const Room = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.name) { // Ensure the response data is valid
            setRoom(data);
          } else {
            setError('Room data is malformed');
          }
        } else {
          setError('Failed to fetch room data');
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching room data');
      }
    };

    getRoom();

    // Cleanup function to reset state when the component is unmounted
    return () => {
      setRoom(null);
      setError(null);
    };
  }, [id]);

  const handleDelete = () => {
    if (!id) {
      console.error('Invalid room ID');
      return;
    }
    dispatch(deleteRoom(id));
    navigate('/rooms');

  };
  

  return (
    <div className="room-container">
      {error && <p className="error-message">{error}</p>}
      {!room && !error ? (
        <p className="loading-message">Loading...</p>
      ) : room ? (
        <div className="room-content">
          <h1 className="room-heading">{room.name}</h1>
          <div className="room-img-wrapper">
            <Carousel data={room.img}/>
            {/* <img src={room.img || '/default-image.jpg'} alt={room.name} /> */}
          </div>
          <p className="room-description">{room.desc}</p>
          <h2 className="room-price">${room.price}</h2>
          <div className="buttons">
            <Link to={`/rooms/edit/${room._id}`} className="edit">
              Edit
            </Link>
            <button onClick={handleDelete} className="button">
              Delete Room
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Room;
