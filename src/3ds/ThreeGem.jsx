import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { useFrame, useLoader } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  MeshRefractionMaterial,
  OrbitControls,
} from "@react-three/drei";
import {
  useTime,
  useTransform,
  useMotionValue,
  animate,
  useScroll,
} from "framer-motion";
import { degreesToRadians } from "popmotion";
import { RGBELoader } from "three-stdlib";
import useStore from "../stores/useStore";

const ThreeGem = () => {
  // const { scrollYProgress } = useScroll();
  const [smoothedPos] = useState(() => new THREE.Vector3(10, 10, 10));
  const cubeRef = useRef();
  const orbitRef = useRef();
  const ringColorRef = useRef();

  // const posx = useMotionValue(0);

  // change initial value for ring and gem callers like rotate!!!
  const camPos = useStore((state) => state.cameraPosition);
  const [ringColor, setRingColor] = useState(() => new THREE.Color());
  const [gemColor, setGemColor] = useState(() => new THREE.Color());
  const [rotate, setRotate] = useState(useStore((state) => state.rotate));

  useEffect(() => {
    // if (action) {
    //   const animation = animate(posx, 1, { duration: 1.5 });
    // }
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
    ringColorRef.current.color.lerp(ringColor, 2 * delta);

    if (rotate) {
      camPos.copy(state.camera.position);
      smoothedPos.copy(state.camera.position);
      state.camera.lookAt(0, 0, 0);

      // cubeRef.current.rotation.set(
      //   cubeRef.current.rotation.x,
      //   cubeRef.current.rotation.y,
      //   cubeRef.current.rotation.z + delta * 0.1
      // );
    } else {
      smoothedPos.lerp(camPos, 5 * delta);
      state.camera.position.copy(smoothedPos);
      state.camera.lookAt(0, 0, 0);
    }

    // camPos.copy(orbitRef.current.object.position);
  });

  // useFrame(({ camera }, delta) => {
  //   if (!rotate) {
  //     camera.position.setFromSphericalCoords(
  //       distance.get(),
  //       yAngle.get(),
  //       cupos.get()
  //     );
  //     camera.updateProjectionMatrix();
  //     camera.lookAt(0, 0, 0);
  //     // cubeRef.current.position.set(cupos.get(), 0, 0);
  //   } else {
  //     // cubeRef.current.position.set(0, 0, 0);
  //     cubeRef.current.rotation.set(
  //       0,
  //       0,
  //       cubeRef.current.rotation.z + delta * 0.1
  //     ); // I should use delta to solve jump???!!
  //     // console.log(orbitRef.current);
  //   }
  //   // console.log(orbitRef.current);
  // });

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
  const texture = useLoader(RGBELoader, "././studio_small_08_4k.hdr");

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
            color={gemColor}
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
            color={gemColor}
          />
        </mesh>
      </group>
    </>
  );
};

export default ThreeGem;
