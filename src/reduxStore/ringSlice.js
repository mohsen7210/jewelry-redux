import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ringName: "ring1",
  ringColor: [1, 1, 1],
  gemColor: 0xffffff,
  cameraPosition: [4, 4, 4],
  rotate: false,
  distance: [6, 4],
  loading: true,
};

const ringSlice = createSlice({
  name: "ring",
  initialState,
  reducers: {
    changeRing(state, action) {
      state.ringName = action.payload;
    },
    changeRingColor(state, action) {
      state.ringColor = action.payload;
    },
    changeGemColor(state, action) {
      state.gemColor = action.payload;
    },

    handleDistance(state, action) {
      state.distance = action.payload;
    },
    moveCamera(state, action) {
      state.cameraPosition = action.payload;
    },
    handleLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  changeGemColor,
  changeRing,
  changeRingColor,
  moveCamera,
  handleDistance,
  handleLoading,
} = ringSlice.actions;
export default ringSlice.reducer;
