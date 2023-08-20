import React, { useState } from "react";
import "./styles/costumizer.css";
import { PiCircleNotch, PiDownloadSimpleBold } from "react-icons/pi";
import { BsGem } from "react-icons/bs";
import { GiDiamondRing } from "react-icons/gi";
import Details from "../Components/Details";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import * as THREE from "three";

// redux
import { useDispatch } from "react-redux";
import { moveCamera } from "../reduxStore/ringSlice";
import { handleRotation } from "../reduxStore/cameraSlice";

const Costumizer = ({ href }) => {
  const [active, setActive] = useState("");

  // redux
  const dispatch = useDispatch();

  const handleOptions = (name, r, phi, teta) => {
    setActive(name);
    const newPosition = new THREE.Vector3();
    newPosition.setFromSphericalCoords(r, phi, teta);

    dispatch(moveCamera([newPosition.x, newPosition.y, newPosition.z]));
  };

  const handleScreenShot = () => {
    const link = document.createElement("a");
    link.setAttribute("download", "canvas.png");
    link.setAttribute("href", href());
    link.click();
  };

  return (
    <>
      <Loading />
      <div className="costumizer__nav">
        <Link className="primary__button " to="/#action">
          Exit
        </Link>
      </div>
      <div className="costumizer__container">
        <div className="costumizer__options">
          <div className="costumizer__menu">
            <button
              onPointerEnter={() => dispatch(handleRotation(true))}
              onPointerLeave={() => dispatch(handleRotation(true))}
              onPointerDown={() => dispatch(handleRotation(false))}
              onClick={() => handleOptions("body", 3, Math.PI / 3, 1.7)}
            >
              <PiCircleNotch color="white" />
            </button>
            <button
              onPointerEnter={() => dispatch(handleRotation(true))}
              onPointerLeave={() => dispatch(handleRotation(true))}
              onPointerDown={() => dispatch(handleRotation(false))}
              onClick={() => handleOptions("gem", 3, 0.3, 0.5)}
            >
              <BsGem color="white" />
            </button>
            <button
              onPointerEnter={() => dispatch(handleRotation(true))}
              onPointerLeave={() => dispatch(handleRotation(true))}
              onPointerDown={() => dispatch(handleRotation(false))}
              onClick={() => handleOptions("rings", 4, 2, 2)}
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
