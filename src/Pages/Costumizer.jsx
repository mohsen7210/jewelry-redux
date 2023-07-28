import React, { useState } from "react";
import "./styles/costumizer.css";
import { PiCircleNotch, PiDownloadSimpleBold } from "react-icons/pi";
import { BsGem } from "react-icons/bs";
import { GiDiamondRing } from "react-icons/gi";
import { LuRotate3D } from "react-icons/lu";
import Details from "../Components/Details";
import useStore from "../stores/useStore";
import { Link } from "react-router-dom";

const Costumizer = ({ href }) => {
  const handleRotation = useStore((state) => state.handleRotation);
  const [active, setActive] = useState("");

  const setCamPos = useStore((state) => state.moveCamera);

  const handleOptions = (name, r, phi, teta) => {
    // handleRotation(false);
    setActive(name);
    setCamPos(r, phi, teta);
  };

  const handleScreenShot = () => {
    const link = document.createElement("a");
    link.setAttribute("download", "canvas.png");
    link.setAttribute("href", href());
    link.click();
  };

  return (
    <>
      <div className="costumizer__nav">
        <Link className="primary__button " to="/#action">
          Exit
        </Link>
      </div>
      <div className="costumizer__container">
        <div className="costumizer__options">
          <div className="costumizer__menu">
            <button
              onPointerEnter={() => handleRotation(false)}
              onPointerLeave={() => handleRotation(true)}
              onPointerDown={handleRotation(false)}
              onClick={() => handleOptions("body", 3, Math.PI / 3, 1.7)}
            >
              <PiCircleNotch color="white" />
            </button>
            <button
              onPointerEnter={() => handleRotation(false)}
              onPointerLeave={() => handleRotation(true)}
              onPointerDown={handleRotation(false)}
              onClick={() => handleOptions("gem", 3, 0.3, 0.5)}
            >
              <BsGem color="white" />
            </button>
            <button
              onPointerEnter={() => handleRotation(false)}
              onPointerLeave={() => handleRotation(true)}
              onClick={() => handleOptions("rings", 4, 2, 2)}
              onPointerDown={handleRotation(false)}
            >
              <GiDiamondRing color="white" />
            </button>
            <button onClick={handleScreenShot}>
              <PiDownloadSimpleBold color="white" />
            </button>
          </div>
          <div className="costumizer__details">
            <Details active={active} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Costumizer;
