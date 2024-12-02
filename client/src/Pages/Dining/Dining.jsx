import React, { useEffect, useState } from "react";

const Dining = () => {
  const images = [
    "/images/dining/dining-1.jpg",
    "/images/dining/dining-2.jpg",
    "/images/dining/dining-3.jpg",
    "/images/dining/dining-4.jpg",
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
          INDULGE IN LUXURIOUS SPA TREATMENTS FOR ULTIMATE RELAXATION
        </h1>
        <div>
          <p>
            Rejuvenate your mind, body, and spirit at our serene spa retreat.
            <br />
            Experience the healing power of expertly crafted treatments,
            designed to relieve stress and promote wellness.
            <br />
            From soothing massages to invigorating facials, our spa offers a
            range of services tailored to your needs.
            <br />
            Immerse yourself in tranquility and emerge feeling refreshed,
            revitalized, and ready to take on the world.
          </p>
        </div>
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        /* Wrapper for carousel section */
        .carousel-container {
          margin-top: 30px;
          position: relative;
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

export default Dining;
