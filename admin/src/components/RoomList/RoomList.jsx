import React from 'react';
import { Link } from 'react-router-dom';
import './RoomList.styles.scss';
import Carousel from '../Carousel/Carousel';

const RoomList = ({ data = [] }) => {
  // Always call hooks at the top of the component
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No rooms available.</p>;
  }

  return (
    <div className="room-list">
      {data.map((item) => (
        <Link to={`/rooms/all/${item._id}`} key={item._id} className="room-card">
          <div className="img-container">
            <Carousel data={item.img} />
          </div>
          <p className="room-name">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default RoomList;
