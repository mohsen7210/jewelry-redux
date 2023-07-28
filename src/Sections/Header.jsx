import React, { useRef, useEffect } from "react";
import "./styles/header.css";
import { motion, useScroll } from "framer-motion";
import AmimatedSection from "../Components/AmimatedSection";

const Header = () => {
  const headerREf = useRef();

  useEffect(() => {
    headerREf.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section ref={headerREf} className="header">
      <AmimatedSection
        transform="translateX(100px)"
        className="header__container"
      >
        <h1 className="header__title">Here's to Being Fashionably You</h1>
        <p className="text1 header__describtion">
          Take your outfit to the next level with bold details. We only make
          100% original jewelry that impresses anyone.
        </p>
        <motion.div whileHover={{ scale: 1.1 }} className="header__buttons">
          <a className="primary__button" href="#action">
            Shop Now
          </a>
        </motion.div>
      </AmimatedSection>
    </section>
  );
};

export default Header;
