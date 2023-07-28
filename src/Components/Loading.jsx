import React, { useEffect, useState } from "react";
import useStore from "../stores/useStore";

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
        <div className="circle"></div>
      </div>{" "}
    </>
  );
};

export default Loading;
// it can be added later as loading indicator
