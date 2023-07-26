import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import * as THREE from "three";

export default create(
  subscribeWithSelector((set) => {
    return {
      cameraPosition: new THREE.Vector3(4, 4, 4),
      ringColor: new THREE.Color(1, 1, 1),
      gemColor: new THREE.Color(0xffffff),
      activeRing: "ring1",
      rotate: false,
      distance: [6, 4],
      moveCamera: (r, phi, teta) => {
        set((state) => {
          return {
            cameraPosition: state.cameraPosition.setFromSphericalCoords(
              r,
              phi,
              teta
            ),
          };
        });
      },

      changeRingColor: (r, g, b) => {
        set(() => {
          return {
            ringColor: new THREE.Color(r, g, b),
          };
        });
      },
      changeGemColor: (color) => {
        set(() => {
          return {
            gemColor: new THREE.Color(color),
          };
        });
      },

      changeActiveRing: (name) => {
        set(() => {
          return {
            activeRing: name,
          };
        });
      },

      handleRotation: (value) => {
        set(() => {
          return {
            rotate: value,
          };
        });
      },
      handleDistance: (value) => {
        set(() => {
          return {
            distance: value,
          };
        });
      },
    };
  })
);
