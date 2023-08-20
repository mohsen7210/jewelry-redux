import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rotate: false,
};

const cameraslice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    handleRotation(state, action) {
      state.rotate = action.payload;
    },
  },
});

export const { handleRotation } = cameraslice.actions;

export default cameraslice.reducer;
