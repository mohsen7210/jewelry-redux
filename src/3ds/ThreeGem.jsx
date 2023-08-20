import React, { useRef, useState } from "react";
import * as THREE from "three";

import { useFrame, useLoader } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  MeshRefractionMaterial,
  OrbitControls,
} from "@react-three/drei";

import { RGBELoader } from "three-stdlib";

// redux
import { useSelector } from "react-redux";

const ThreeGem = () => {
  const [smoothedPos] = useState(() => new THREE.Vector3(10, 10, 10));
  const cubeRef = useRef();
  const orbitRef = useRef();
  const ringColorRef = useRef();

  // redux
  const ringData = useSelector((state) => state.ring);
  const { rotate } = useSelector((state) => state.camera);
  const cameraPos = new THREE.Vector3(...ringData.cameraPosition);
  const ringColor2 = new THREE.Color(...ringData.ringColor);
  const gemColor2 = new THREE.Color(ringData.gemColor);

  useFrame((state, delta) => {
    ringColorRef.current.color.lerp(ringColor2, 5 * delta);

    if (rotate) {
      cameraPos.copy(state.camera.position);
      smoothedPos.copy(state.camera.position);
      // state.camera.position.copy(smoothedPos);
      state.camera.lookAt(0, 0, 0);
    } else {
      smoothedPos.lerp(cameraPos, 5 * delta);
      state.camera.position.copy(smoothedPos);
      state.camera.lookAt(0, 0, 0);
    }

    // camPos.copy(orbitRef.current.object.position);
  });

  const eventHandler = () => {
    console.log(orbitRef.current.getDistance());
  };

  const ringModel = useGLTF("./ring002.glb");
  const config = {
    bounces: 2,
    aberrationStrength: 0.01,
    ior: 2.75,
    fresnel: 1,
    color: "red",
    fastChroma: true,
  };
  const texture = useLoader(RGBELoader, "././studio_small_08_1k.hdr");

  return (
    <>
      <Environment preset="warehouse" />

      <OrbitControls ref={orbitRef} maxDistance={10} minDistance={2} />
      <group scale={8} ref={cubeRef} position={[0, -1, 0]}>
        <mesh
          geometry={ringModel.nodes.Circle.geometry}
          position={ringModel.nodes.Circle.position}
          onClick={eventHandler}
        >
          <meshStandardMaterial
            // color={smoothedRingColor}
            roughness={0.12}
            metalness={1.1}
            ref={ringColorRef}
          />
        </mesh>

        <mesh
          geometry={ringModel.nodes.bigGem.geometry}
          rotation={ringModel.nodes.bigGem.rotation}
          position={ringModel.nodes.bigGem.position}

          // position={ringModel.nodes.bigGem.position}
        >
          <MeshRefractionMaterial
            envMap={texture}
            {...config}
            color={ringData.gemColor}
          />
        </mesh>

        <mesh
          geometry={ringModel.nodes.smallGem.geometry}
          rotation={ringModel.nodes.smallGem.rotation}
          position={ringModel.nodes.smallGem.position}

          // position={ringModel.nodes.bigGem.position}
        >
          <MeshRefractionMaterial
            envMap={texture}
            {...config}
            color={gemColor2}
          />
        </mesh>
      </group>
    </>
  );
};

export default ThreeGem;
