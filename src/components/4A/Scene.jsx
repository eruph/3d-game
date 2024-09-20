import React, { useRef } from "react";
import Box from "./Box";
import Plane from "./Plane";
import Sphere from "./Sphere";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
const Scene = () => {
  const camera = useRef();
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={[0, 0, 5]}
        fov={75}
      />
      <OrbitControls camera={camera.current} />

      <axesHelper args={[5]} />
      <Box />
      <Plane />
      <Sphere />
    </>
  );
};

export default Scene;
