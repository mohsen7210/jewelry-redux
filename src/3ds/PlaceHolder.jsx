import React, { useEffect } from "react";
import * as THREE from "three";

// redux
import { useDispatch } from "react-redux";
import { handleLoading } from "../reduxStore/ringSlice";

const geometry = new THREE.TorusGeometry(1, 0.15, 16, 100);

const PlaceHolder = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleLoading(true));

    return () => {
      dispatch(handleLoading(false));
    };
  }, []);

  return (
    <mesh geometry={geometry} scale={0.6}>
      <meshBasicMaterial color="#81F499" wireframe={true} />
    </mesh>
  );
};

export default PlaceHolder;
