import Scene from "../components/4A/Scene";
import { Canvas } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
const Main4A = () => {
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
    <div className="bg-black h-screen w-screen">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
};
export default Main4A;
