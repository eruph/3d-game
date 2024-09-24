import React, { useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Model from "./Model";
const Scene = () => {
  const camera = useRef();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={[3, 0, 10]}
        fov={75}
      />
      <OrbitControls camera={camera.current} />

      <Model position={[0, 0, 0]} url="/dae/Lowpoly_Notebook_2.dae" />
    </>
  );
};

export default Scene;
