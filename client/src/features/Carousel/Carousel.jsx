import React, { useEffect, useState } from 'react';
import './Carousel.styles.scss';

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(interval);
  }, [data.length]); // Add data.length as a dependency to update correctly if data changes

  return (
    <div className="carousel-wrapper">
      <img src={data[currentIndex]} alt={`Slide ${currentIndex}`} />
    </div>
  );
};

export default Carousel;
