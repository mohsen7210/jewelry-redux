import React, { useRef, useState, Suspense } from "react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  MeshRefractionMaterial,
} from "@react-three/drei";
import { useScroll, useTransform } from "framer-motion";

import { RGBELoader } from "three-stdlib";
import * as THREE from "three";

// redux
import { useSelector } from "react-redux";

import PlaceHolder from "./PlaceHolder";

const Model = () => {
  const { scrollYProgress } = useScroll();
  const positionRef = useRef();
  const meshRef = useRef();
  const [initialPosition] = useState(() => new THREE.Vector3(0, 0, 0));

  const ringModel = useGLTF("./Ring01.glb");
  console.log(ringModel);

  const ringData = useSelector((state) => state.ring);

  const radiuse = useTransform(scrollYProgress, [0, 1], [7, 6]); // 950> ==> 5,4
  const distance = useTransform(scrollYProgress, [0, 1], ringData.distance);

  const xpos = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.PI / 2, 1.5 * Math.PI]
  );

  useFrame(({ camera }, delta) => {
    initialPosition.set(distance.get(), 0, 0);
    camera.position.setFromSphericalCoords(radiuse.get(), 0, 0);
    positionRef.current.position.copy(initialPosition);
    positionRef.current.rotation.set(
      positionRef.current.rotation.x,
      positionRef.current.rotation.y,
      xpos.get()
    );

    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  const config = {
    bounces: 3,
    aberrationStrength: 0.01,
    ior: 2.75,
    fresnel: 1,
    fastChroma: true,
  };
  const texture = useLoader(RGBELoader, "./studio_small_08_1k.hdr");
  console.log(meshRef);

  return (
    <>
      <Environment preset="warehouse" />

      <group ref={positionRef} position={[0, 0, 0]}>
        <mesh
          geometry={ringModel.nodes.Ring.geometry}
          position={ringModel.nodes.Ring.position}
        >
          <meshStandardMaterial
            color="#FFeeee"
            roughness={0.1}
            metalness={1.1}
          />
        </mesh>

        <mesh
          geometry={ringModel.nodes.gem.geometry}
          rotation={ringModel.nodes.gem.rotation}
          position={ringModel.nodes.gem.position}
          // ref={meshRef}
          // material={costumShader}
        >
          <MeshRefractionMaterial
            envMap={texture}
            {...config}
            color="#ccffcc"
          />
        </mesh>
      </group>
    </>
  );
};

export const Ring = () => {
  return (
    <div className="video__container" style={{ zIndex: -4 }}>
      <Canvas
        camera={{
          fov: 45,
        }}
      >
        <Suspense fallback={<PlaceHolder />}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Ring;
