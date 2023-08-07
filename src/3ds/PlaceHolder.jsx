import React, { useEffect } from "react";
import * as THREE from "three";
import useStore from "../stores/useStore";

const geometry = new THREE.TorusGeometry(1, 0.15, 16, 100);

const PlaceHolder = () => {
  const setLoading = useStore((state) => state.setLoading);
  useEffect(() => {
    setLoading(true);

    return () => {
      setLoading(false);
    };
  }, []);
  return (
    <mesh geometry={geometry} scale={0.6}>
      <meshBasicMaterial color="#81F499" wireframe={true} />
    </mesh>
  );
};

export default PlaceHolder;
