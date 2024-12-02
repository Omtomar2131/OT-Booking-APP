import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ["/images/landing-1.jpeg", "/images/landing-2.jpeg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3-second transition

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  return (
    <>
      <div className="carousel-container">
        <img
          src={images[currentImageIndex]}
          alt="Slideshow"
          className="carousel-image active"
        />
      </div>
      <div className="content-section">
        <h1 className="content-heading">
          WELCOME TO THE OASIS OF LUXURY IN THE HEART OF THE CITY
        </h1>
        <p className="content-description">
          Discover the perfect blend of comfort and elegance at our exclusive
          resort. <br />
          Nestled in the heart of the city, our oasis offers a serene escape
          from the hustle and bustle. <br />
          Indulge in world-class amenities, personalized service, and a truly
          unforgettable experience. <br />
          Whether you're here for relaxation or adventure, we promise to exceed
          your expectations with every moment.
        </p>
        <div className="spa-section">
          <img src="/images/spa.jpg" alt="SPA" className="spa-image" />
          <Link to="/spa" className="button">
            SPA AT OTR
          </Link>{" "}
        </div>
      </div>

      {/* CSS */}
      <style>
        {`
          .carousel-container {
            position: relative;
            width: 100%;
            height: 80vh;
            margin-top:30px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
          }

          .carousel-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            opacity: 0;
            transition: opacity 1s ease-in-out;
            z-index: 1;
          }

          .carousel-image.active {
            opacity: 2;
            z-index: 2;
          }

          .content-section {
            margin-top:30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: auto;
            padding: 20px;
          }

          .content-heading {
            font-size: 2rem;
            margin-bottom: 20px;
          }

          .content-description {
            margin: 0;
            padding-top: 20px;
            font-size: 1.1rem;
            max-width: 800px;
            line-height: 1.6;
            color: #333;
          }

          .spa-section {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 50px;
            width: 80%;
          }

          .spa-image {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }

          .button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #d79e5e;
            color: #fff;
            padding: 10px 20px;
            border: none;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
            z-index: 3;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }

          .button:hover {
            background-color: #c88e3f;
            transform: translate(-50%, -50%) scale(1.05);
          }
        `}
      </style>
    </>
  );
};

export default Home;
