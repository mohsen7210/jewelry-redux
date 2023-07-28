import React from "react";

import "./styles/info.css";
import AmimatedSection from "../Components/AmimatedSection";

const cardVariants = {
  offscreen: {
    x: -500,
    // opacity: 0,
  },
  onscreen: {
    x: 0,
    // opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.1,
      duration: 2,
    },
  },
};

const Info = () => {
  return (
    <section className="info" id="info">
      <AmimatedSection
        transform={"translateX(300px)"}
        className="info__container"
        // variants={cardVariants}
        margin="-300px 0px 0px 0px"
      >
        <h1 className="info__title">Our Collections</h1>
        <p className="info__description">
          Discover the jewelry collections that feature Kilanche's most iconic
          designst!
        </p>
      </AmimatedSection>
    </section>
  );
};

export default Info;
