import React, { useRef } from "react";
import { useInView } from "framer-motion";

const AmimatedSection = ({
  className,
  transform,
  margin = "0px 0px 0px 0px",
  children,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: margin,
  });
  return (
    <div className={className} ref={ref}>
      <div
        style={{
          transform: isInView ? "none" : transform,
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
        className="animated__div"
      >
        {children}
      </div>
    </div>
  );
};

export default AmimatedSection;
