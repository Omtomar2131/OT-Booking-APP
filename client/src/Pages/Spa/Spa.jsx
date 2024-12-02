import React, { useEffect, useState } from "react";

const Spa = () => {
  const images = [
    "/images/spa/spa-1.jpg",
    "/images/spa/spa-2.jpg",
    "/images/spa/spa-3.jpg",
    "/images/spa/spa-4.jpg",
    "/images/spa/spa-5.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3-second transition

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  return (
    <>
      <div className="carousel-container">
        <img
          src={images[currentIndex]}
          alt="Slideshow"
          className="carousel-image active"
        />
      </div>

      <div className="text-container">
        <h1 className="heading center">
          REJUVENATE YOUR BODY AND SOUL WITH OUR EXCLUSIVE SPA AND WELLNESS EXPERIENCE
        </h1>
        <div>
          <p>
            Escape to a world of tranquility at our luxurious spa, where relaxation meets rejuvenation. <br /> 
            Our expertly crafted wellness treatments are designed to refresh your body, calm your mind, and restore your spirit. <br />
            Indulge in a range of personalized spa therapies, from soothing massages to invigorating skin treatments. <br />
            Whether you're seeking relaxation or a detoxifying experience, our spa offers the perfect environment to unwind and rejuvenate in peace and luxury.
          </p>
        </div>
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        /* Wrapper for carousel section */
        .carousel-container {
          position: relative;
          margin-top:30px;
          width: 100%;
          height: 80vh; /* Full viewport height */
          overflow: hidden; /* Hide overflowing content */
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
        }

        /* Carousel images */
        .carousel-container img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Keep image proportions */
          position: absolute;
          opacity: 0; /* Hidden by default */
          transition: opacity 1s ease-in-out; /* Smooth transition for opacity */
          z-index: 1;
        }

        /* Active image style */
        .carousel-container img.active {
          opacity: 1; /* Make active image visible */
          z-index: 2;
        }

        /* Text container section */
        .text-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          height: auto; /* Ensure it adjusts with content */
          padding: 20px; /* Add some padding */
        }

        /* Text container heading */
        .text-container .heading {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        /* Center the heading */
        .center {
          text-align: center;
        }

        /* Text container paragraph */
        .text-container p {
          margin: 0;
          padding-top: 20px;
          font-size: 1.1rem;
          max-width: 800px;
          line-height: 1.6;
          color: #333; /* Use a neutral color for readability */
        }
      `}</style>
    </>
  );
};

export default Spa;
