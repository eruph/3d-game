import { Canvas } from "@react-three/fiber";
import React from "react";
import Scene from "../components/4B/Scene";
const Main4B = () => {
  return (
    <div className="bg-black h-screen w-screen">
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Main4B;
