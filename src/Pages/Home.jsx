import React, { useEffect } from "react";
import Info from "../Sections/Info";
import Action from "../Sections/Action";
import Header from "../Sections/Header";
import { Ring } from "../3ds/Ring";
import useStore from "../stores/useStore";
import Loading from "../Components/Loading";
import useWindowSize from "../hooks/useWindowSize";
import { useScroll } from "framer-motion";

const Home = () => {
  const handleDistance = useStore((state) => state.handleDistance);
  const windoSize = useWindowSize();
  const { scollY } = useScroll;

  useEffect(() => {
    windoSize.innerWidth > 1500
      ? handleDistance([-2, 1])
      : windoSize.innerWidth > 950
      ? handleDistance([-1.5, 1])
      : windoSize.innerWidth > 850
      ? handleDistance([-1, 1])
      : handleDistance([-0.2, 0]);

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
