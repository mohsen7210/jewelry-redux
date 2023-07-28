import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";
import logo from "../assets/logo.webm";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenue = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <nav className="nav__larg">
        <div className="nav__logo">
          <Link to="/">
            <video
              className="service__video"
              playsinline
              loop={true}
              autoPlay={true}
              muted
            >
              <source src={logo} />
            </video>
          </Link>
          <div className="nav__logo__text">
            <p className="logo">Jewelry</p>
          </div>
        </div>

        <div
          onClick={handleMenue}
          className={
            isOpen ? "nav__menue--open nav__menue--close " : "nav__menue--open"
          }
        >
          <div className="nav__menu-top"></div>
          <div className="nav__menu-midlle"></div>
          <div className="nav__menu-bottom"></div>
        </div>

        <div className={isOpen ? "nav__links nav__links-inView" : "nav__links"}>
          <ul onClick={() => setIsOpen(false)}>
            <li onClick={() => setIsOpen(false)}>
              <a href="#56"> Contact</a>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link to="/about"> About</Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <a href="#56">Costumize</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
