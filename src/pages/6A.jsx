import { Canvas } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
import Scene from "../components/6A/Scene";
import { Leva } from "leva";
import { Stats } from "@react-three/drei";
import { Suspense } from "react";
const Main6A = () => {
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
    <div className="h-screen w-screen bg-black ">
      <Suspense fallback={null}>
        <Canvas>
          <Scene />
          <Stats />
        </Canvas>
        <Leva collapsed />
      </Suspense>
    </div>
  );
};

export default Main6A;
