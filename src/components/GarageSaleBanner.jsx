import React from 'react';
import garageSaleImage from '../assets/garagesale/garagesale-banner.webp';
import './GarageSaleBanner.css';

const GarageSaleBanner = () => {
  return (
    <div className="garage-sale-banner w-full mt-24">
      <img
        className="w-full h-full object-cover"
        src={garageSaleImage}
        alt="Garage Sale promotional banner"
        loading="lazy"
      />
    </div>
  );
};

export default GarageSaleBanner;
