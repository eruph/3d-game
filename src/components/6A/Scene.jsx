import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import Box from "./Box";
const Scene = () => {
  const camera = useRef();
  const modelRef = useRef();
  const boxRefs = useRef([]);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls camera={camera.current} />
      <gridHelper args={[1000, 50, "green", "green"]} />
      <axesHelper args={[50,50,50]}/>
      <Model url="/models/robot.glb" modelRef={modelRef} boxes={boxRefs.current} />
      {[3, -3].map((pos, index) => (
        <Box
          key={index}
          position={[pos, 1, 15]}
          ref={(ref) => {
            if (ref && !boxRefs.current.includes(ref)) {
              boxRefs.current.push(ref); // Добавляем ссылку на бокс
            }
          }}
        />
      ))}
    </>
  );
};

export default Scene;
