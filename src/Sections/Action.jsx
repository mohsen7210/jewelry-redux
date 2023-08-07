import React from "react";
import "./styles/action.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import AnimatedSection from "../Components/AmimatedSection";

const Action = () => {
  return (
    // <motion.section
    //   id="action"
    //   className="action"
    //   initial="offscreen"
    //   whileInView="onscreen"
    //   viewport={{ once: true, amount: "0.8" }}
    // >
    //   <motion.div className="action__conatiner" variants={cardVariants}>
    //     <h1 className="action__title">Colorful Gems</h1>
    //     <p className="action__description">
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
    //       consequuntur accusamus
    //     </p>
    //     <motion.div whileHover={{ scale: 1.1 }} className="action__buttons">
    //       <Link className="primary__button " to="/costumize">
    //         Costumize
    //       </Link>
    //     </motion.div>
    //   </motion.div>
    // </motion.section>

    <section id="action" className="action">
      <AnimatedSection
        transform={"translateX(-200px)"}
        className="action__container"
        // margin="-700px 0px 0px 0px"
      >
        <h1 className="action__title">Colorful Gems</h1>

        <p className="action__description">
          You can try many combinations and find out which one fits your style.
        </p>

        <motion.div whileHover={{ scale: 1.1 }} className="action__buttons">
          <Link className="primary__button " to="/costumize">
            Costumize
          </Link>
        </motion.div>
      </AnimatedSection>
    </section>
  );
};

export default Action;
