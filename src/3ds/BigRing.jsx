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
import useStore from "../stores/useStore";

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
  const rgbeTexture = useEnvironment({ files: "studio_small_08_1k.hdr" });

  const camPos = useStore((state) => state.cameraPosition);
  const [ringColor, setRingColor] = useState(() => new THREE.Color());
  const [gemColor, setGemColor] = useState(() => new THREE.Color());
  const [rotate, setRotate] = useState(useStore((state) => state.rotate));

  useEffect(() => {
    const unsubscribeRing = useStore.subscribe(
      (state) => state.ringColor,
      (color) => {
        setRingColor(color);
      }
    );

    const unsubscribeGem = useStore.subscribe(
      (state) => state.gemColor,
      (color) => {
        setGemColor(color);
      }
    );

    const unsubscribeRotate = useStore.subscribe(
      (state) => state.rotate,
      (value) => setRotate(value)
    );

    return () => {
      unsubscribeRing();
      unsubscribeGem();
      unsubscribeRotate();
    };
  }, []);

  useFrame((state, delta) => {
    ringColorRef.current.color.lerp(ringColor, 5 * delta);

    if (rotate) {
      camPos.copy(state.camera.position);
      smoothedPos.copy(state.camera.position);
      // state.camera.position.copy(smoothedPos);
      state.camera.lookAt(0, 0, 0);
    } else {
      smoothedPos.lerp(camPos, 5 * delta);
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
            color={gemColor}
          />
        </mesh>
      </group>
    </>
  );
};

export default BigRing;
