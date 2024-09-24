import { Canvas } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
import Scene from "../components/5B/Scene";
const Main5B = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-black h-screen w-screen">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <div className="h-screen w-screen ">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Main5B;
