import React from 'react';
import { Link } from 'react-router-dom';
import './RoomList.styles.scss';
import Carousel from '../../features/Carousel/Carousel';

const RoomList = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No rooms available.</p>;
  }

  return (
    <div className="room-list">
      {data.map((item) => (
        <div key={item._id} className="room-cont">
          <p className="room-name">{item.name}</p>
          <div className="img-cont">
            <Carousel data={item.img} />
          </div>
          <Link to={`/rooms/all/${item._id}`} className="book-now-btn">
            Book Now
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
