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
      <directionalLight
        position={[5, 5, 5]} // Позиция источника света
        castShadow // Включение теней для света
        shadow-camera-far={100}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={[0, 5, 5]}
        fov={75}
      />
      <OrbitControls camera={camera.current} />
      <axesHelper args={[5]} />
      <Sphere />
      <Box />
      <Plane />
    </>
  );
};

export default Scene;
