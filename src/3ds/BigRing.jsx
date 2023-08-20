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

const BigRing = () => {
  const ringModel = useGLTF("./Ring01.glb");
  const config = {
    bounces: 2,
    aberrationStrength: 0.02,
    ior: 2.75,
    fresnel: 1,
    color: "red",
    fastChroma: true,
  };
  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );

  const [smoothedPos] = useState(() => new THREE.Vector3(10, 10, 10));
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

  console.log(ringModel);
  return (
    <>
      <Environment preset="warehouse" />
      <OrbitControls maxDistance={10} minDistance={1} />

      <group rotation={[Math.PI / 2, 0, 0]} scale={0.8}>
        <mesh
          geometry={ringModel.nodes.Ring.geometry}
          position={ringModel.nodes.Ring.position}
        >
          <meshStandardMaterial
            ref={ringColorRef}
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
            color={gemColor2}
          />
        </mesh>
      </group>
    </>
  );
};

export default BigRing;
