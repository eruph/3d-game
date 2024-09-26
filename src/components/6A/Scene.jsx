import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import Box from "./Box";
import { Physics } from "@react-three/cannon";
const Scene = () => {
  const camera = useRef();
  const modelRef = useRef();

  return (
    <>
      <ambientLight intensity={0.5} />

      <directionalLight position={[5, 5, 5]} />
      <OrbitControls camera={camera.current} />
      <gridHelper args={[1000, 50, "green", "green"]} />
      <Physics>
        <Model url="/models/robot.glb" modelRef={modelRef} />
        <Box position={3} />
        <Box position={-3} />
      </Physics>
    </>
  );
};

export default Scene;
