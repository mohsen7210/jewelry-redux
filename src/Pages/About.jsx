import React, { useEffect, useRef, useState } from "react";
import vid from "../assets/headSet.webm";
import { useScroll, motion, useTransform } from "framer-motion";

const VideoBg = () => {
  const vidRef = useRef();

  const { scrollYProgress } = useScroll();
  const [timer, setTimer] = useState(0);
  const vidTime = useTransform(scrollYProgress, [0, 1], [0, 0.5]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      // setTimer(vidTime.get());
      vidRef.current.currentTime = vidTime.get();
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setTimer(vidTime.get());
      });
    };
  }, []);

  return (
    <div className="video__container">
      <motion.video ref={vidRef} playsinline loop={false} autoPlay={true} muted>
        <source src={vid} />
      </motion.video>
    </div>
  );
};

export default VideoBg;
