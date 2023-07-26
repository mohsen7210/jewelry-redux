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
        <h1 className="header__title">Find Best For Whome You Love</h1>
        <p className="text1 header__describtion">
          Amet porro beatae iusto laudantium tenetur assumenda, illo voluptates
          nobis vitae! Reiciendis ad suscipit facilis quisquam
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
