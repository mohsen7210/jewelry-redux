import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { useFrame, useLoader } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  MeshRefractionMaterial,
  OrbitControls,
  useEnvironment,
} from "@react-three/drei";

import { RGBELoader } from "three-stdlib";
import { useSelector } from "react-redux";

export const OpenRing = () => {
  const ringModel = useGLTF("./ring003.glb");
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
  const rgbeTexture = useEnvironment({ files: "studio_small_08_1k.hdr" });

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
  // redux end

  console.log(ringModel);
  return (
    <>
      <Environment preset="warehouse" />
      <OrbitControls maxDistance={10} minDistance={1} />

      <group>
        <mesh
          geometry={ringModel.nodes.Ring.geometry}
          position={ringModel.nodes.Ring.position}
          rotation={ringModel.nodes.Ring.rotation}
        >
          <meshStandardMaterial
            ref={ringColorRef}
            roughness={0.15}
            metalness={1}
          />
        </mesh>

        <mesh
          geometry={ringModel.nodes.bigGems.geometry}
          rotation={ringModel.nodes.bigGems.rotation}
          position={ringModel.nodes.bigGems.position}

          // position={ringModel.nodes.bigGem.position}
        >
          <MeshRefractionMaterial
            envMap={rgbeTexture}
            {...config}
            color={gemColor2}
          />
        </mesh>

        <mesh
          geometry={ringModel.nodes.smallGems.geometry}
          rotation={ringModel.nodes.smallGems.rotation}
          position={ringModel.nodes.smallGems.position}

          // position={ringModel.nodes.bigGem.position}
        >
          <MeshRefractionMaterial
            envMap={rgbeTexture}
            {...config}
            color={"white"}
          />
        </mesh>
      </group>
    </>
  );
};

export default OpenRing;
