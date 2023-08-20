import React, { useEffect, useRef, useState, Suspense } from "react";
import Costumizer from "../Pages/Costumizer";
import ThreeGem from "./ThreeGem";
import { OpenRing } from "./OpenRing";
import * as THREE from "three";
import "../Pages/styles/costumizer.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { handleRotation } from "../reduxStore/cameraSlice";

import { Canvas } from "@react-three/fiber";
import PlaceHolder from "./PlaceHolder";
import BigRing from "./BigRing";

const CostumRing = () => {
  const canvasRef = useRef();
  const { ringName } = useSelector((state) => state.ring);

  // redux
  const dispatch = useDispatch();

  const generateImg = () => {
    return canvasRef.current
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
  };

  return (
    <div className="scroll">
      <Costumizer href={generateImg} />
      <div className="video__container">
        <Canvas
          ref={canvasRef}
          onPointerDownCapture={() => {
            dispatch(handleRotation(true));
          }}
          onPointerDown={() => {
            dispatch(handleRotation(true));
          }}
          camera={{
            fov: 45,
          }}
          gl={{
            toneMapping: THREE.NoToneMapping,
            preserveDrawingBuffer: true,
          }}
        >
          <Suspense fallback={<PlaceHolder />}>
            {ringName == "ring1" ? (
              <ThreeGem />
            ) : ringName == "ring2" ? (
              <OpenRing />
            ) : (
              <BigRing />
            )}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default CostumRing;
