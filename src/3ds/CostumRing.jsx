import React, { useEffect, useRef, useState } from "react";
import Costumizer from "../Pages/Costumizer";
import ThreeGem from "./ThreeGem";
import { OpenRing } from "./OpenRing";
import * as THREE from "three";
import "../Pages/styles/costumizer.css";

import { Canvas } from "@react-three/fiber";
import useStore from "../stores/useStore";

const CostumRing = () => {
  const [action, setAction] = useState("ring1");

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

  console.log(action);

  return (
    <div className="scroll">
      <Costumizer />
      <div className="video__container">
        <Canvas
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
          }}
        >
          {action == "ring1" ? <ThreeGem /> : <OpenRing />}
        </Canvas>
      </div>
    </div>
  );
};

export default CostumRing;
