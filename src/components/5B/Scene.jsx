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
        position={[15, 20, 15]}
        fov={75}
      />
      <OrbitControls camera={camera.current} />

      <Model
        url="/dlmodel.obj"
        rotationx={Math.PI / 2}
        rotationy={Math.PI / 2}
      />
    </>
  );
};

export default Scene;
