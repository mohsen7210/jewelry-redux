import React from "react";
import * as THREE from "three";

const geometry = new THREE.TorusGeometry(1, 0.15, 16, 100);

const PlaceHolder = () => {
  return (
    <mesh geometry={geometry} scale={0.6}>
      <meshBasicMaterial color="#81F499" wireframe={true} />
    </mesh>
  );
};

export default PlaceHolder;
