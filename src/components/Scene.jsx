import React, { useRef } from "react";
import Box from "./Box";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
const Scene = () => {
  const { gl, scene, size } = useThree();

  const leftCamera = useRef();
  const rightCamera = useRef();

  useFrame(() => {
    const halfWidth = size.width / 2;

    gl.setViewport(0, 0, halfWidth, size.height);
    gl.setScissor(0, 0, halfWidth, size.height);
    gl.setScissorTest(true);
    gl.render(scene, leftCamera.current);

    gl.setViewport(halfWidth, 0, halfWidth, size.height);
    gl.setScissor(halfWidth, 0, halfWidth, size.height);
    gl.render(scene, rightCamera.current);

    gl.setScissorTest(true);
  });
  return (
    <>
      <PerspectiveCamera
        ref={leftCamera}
        makeDefault
        position={[0, 0, 5]}
        fov={75}
      />
      <OrbitControls camera={leftCamera.current} />

      <PerspectiveCamera
        ref={rightCamera}
        makeDefault
        position={[0, 0, 5]}
        fov={75}
      />
      <OrbitControls camera={rightCamera.current} />
      <Box />
    </>
  );
};

export default Scene;
