import React from "react";
import "./styles/navbar.css";
import logo from "../assets/logo.webm";

const NavBar = () => {
  return (
    <nav>
      <div className="nav__logo">
        <a href="#">
          <video
            className="service__video"
            playsinline
            loop={true}
            autoPlay={true}
            muted
          >
            <source src={logo} />
          </video>
        </a>
        <div className="nav__logo__text">
          <p className="logo">Jewelry</p>
        </div>
      </div>

      <div className="nav__links">
        <ul>
          <li>
            <a href="#56"> Contact</a>
          </li>
          <li>
            <a href="#566"> About</a>
          </li>
          <li>
            <a href="#56">Costumize</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
