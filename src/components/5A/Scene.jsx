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
        position={[-0.5, 0.2, 0.4]}
        fov={75}
      />
      <OrbitControls camera={camera.current} />

      <Model
        rotationX={0}
        rotationY={0}
        position={[0, 0, 0]}
        scale={2}
        url="/gltfmodel/dlmodel.glb"
      />
    </>
  );
};

export default Scene;
