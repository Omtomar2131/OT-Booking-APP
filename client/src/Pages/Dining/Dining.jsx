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
          SAVOR EXQUISITE FLAVORS IN A LUXURIOUS DINING EXPERIENCE
        </h1>
        <div>
          <p>
            Indulge in a culinary journey like no other at our world-class dining establishment. <br />
            Experience a symphony of flavors crafted by expert chefs, using only the finest ingredients. <br />
            From gourmet dishes to exquisite desserts, each meal is a celebration of taste and artistry. <br />
            Whether you're seeking an intimate dinner or a vibrant gathering with friends, our restaurant offers the perfect setting for every occasion. <br />
            Immerse yourself in luxury and let your taste buds explore the ultimate in fine dining.
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

        /* Responsive styles for mobile */
        @media (max-width: 768px) {
          .carousel-container {
            height: 50vh; /* Adjust height for smaller screens */
          }

          .text-container .heading {
            font-size: 1.5rem; /* Smaller font size for headings */
            margin-bottom: 15px;
          }

          .text-container p {
            font-size: 1rem; /* Adjust paragraph font size */
            line-height: 1.4; /* Reduce line spacing */
            padding: 0 10px; /* Add horizontal padding */
          }
        }
      `}</style>
    </>
  );
};

export default Dining;
