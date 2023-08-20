import { configureStore } from "@reduxjs/toolkit";
import ringSlice from "./ringSlice";
import cameraSlice from "./cameraSlice";

const store = configureStore({
  reducer: {
    ring: ringSlice,
    camera: cameraSlice,
  },
});

export default store;
