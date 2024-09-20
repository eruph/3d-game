import Scene from "../components/Scene";
import React from "react";
import { Canvas } from "@react-three/fiber";
const Main = () => {
  return (
    <div className="bg-black h-screen w-screen">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
};
export default Main;
