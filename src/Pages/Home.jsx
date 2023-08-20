import React, { useEffect } from "react";
import Info from "../Sections/Info";
import Action from "../Sections/Action";
import Header from "../Sections/Header";
import { Ring } from "../3ds/Ring";

import useWindowSize from "../hooks/useWindowSize";

import { useDispatch } from "react-redux";
import { handleDistance } from "../reduxStore/ringSlice";

const Home = () => {
  const windoSize = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    windoSize.innerWidth > 1500
      ? dispatch(handleDistance([-2, 1]))
      : windoSize.innerWidth > 950
      ? dispatch(handleDistance([-1.5, 1]))
      : windoSize.innerWidth > 850
      ? dispatch(handleDistance([-1, 1]))
      : dispatch(handleDistance([-0.2, 0]));

    console.log(windoSize);
  }, [windoSize]);

  return (
    <main>
      <Ring />
      <Header />
      {windoSize.innerWidth < 900 ? <section /> : null}
      <Info />
      <Action />
    </main>
  );
};

export default Home;
