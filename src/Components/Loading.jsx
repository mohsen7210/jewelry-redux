import React, { useEffect, useState } from "react";
import useStore from "../stores/useStore";
import logo from "../assets/logo.webm";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(
    useStore((state) => state.loading)
  );

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (state) => state.loading,
      (vlaue) => setIsLoading(vlaue)
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <div className={isLoading ? "loading" : "loading__hide"}>
        <video
          className="service__video"
          playsinline
          loop={true}
          autoPlay={true}
          muted
        >
          <source src={logo} />
        </video>

        <h3>Loading ...</h3>
      </div>
    </>
  );
};

export default Loading;
// it can be added later as loading indicator
