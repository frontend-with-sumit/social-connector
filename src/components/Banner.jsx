import React from "react";
import preview from "../assets/elements/preview.png";
import "../styles/banner.css";

function Banner({ sale, banner, tagline, message }) {
  return (
    <div className="banner-container">
      {banner ? (
        <div className="banner-image">
          <img src={banner} alt={sale} />
        </div>
      ) : (
        <div className="banner-preview">
          <img src={preview} alt="" />
          <p>See your masterpiece in real time</p>
        </div>
      )}
      {sale && (
        <div className="banner-content">
          <div className="banner-content--sale">
            <p>{sale}</p>
          </div>
          <div className="banner-content--tagline">
            <p>{tagline}</p>
          </div>
          <div className="banner-content--message">{message} </div>
          <div className="banner-content--footer">
            <p>*Terms & conditions apply</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
