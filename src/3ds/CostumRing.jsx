import React, { useEffect, useRef, useState, Suspense } from "react";
import Costumizer from "../Pages/Costumizer";
import ThreeGem from "./ThreeGem";
import { OpenRing } from "./OpenRing";
import * as THREE from "three";
import "../Pages/styles/costumizer.css";

import { Canvas } from "@react-three/fiber";
import useStore from "../stores/useStore";
import PlaceHolder from "./PlaceHolder";
import BigRing from "./BigRing";

const CostumRing = () => {
  const [action, setAction] = useState("ring1");
  const canvasRef = useRef();

  const handleRotation = useStore((state) => state.handleRotation);

  useEffect(() => {
    const unsubscribeActiveRing = useStore.subscribe(
      (state) => state.activeRing,
      (activeRing) => {
        setAction(activeRing);
        console.log(activeRing, "fn");
      }
    );

    const unsubRot = useStore.subscribe(
      (state) => state.rotate,
      (value) => {
        console.log(value, "5555");
      }
    );

    return () => {
      unsubscribeActiveRing();
      unsubRot();
    };
  }, []);

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
            handleRotation(true);
          }}
          onPointerDown={() => {
            handleRotation(true);
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
            {action == "ring1" ? (
              <ThreeGem />
            ) : action == "ring2" ? (
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
