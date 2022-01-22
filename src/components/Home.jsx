import React from "react";
import { Link } from "react-router-dom";
import collection from "../assets/elements/collection.svg";
import logo from "../assets/elements/logo.png";
import "../styles/home.css";
import AdvertisementForm from "./AdvertisementForm";

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <div className="collection">
          <div className="user">
            Hi, <em>John</em>
          </div>
          <img src={collection} alt="Collection" />
          <span className="text">Your Collection</span>
        </div>
        <div className="logo">
          <img src={logo} alt="Swayam" />
        </div>
        <ul className="menu-list">
          <li className="menu-item">Profile</li>
          <li className="menu-item">
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </header>
      <div className="advertisement">
        <h2>Create Advertisement</h2>
        <AdvertisementForm />
      </div>
    </div>
  );
}
