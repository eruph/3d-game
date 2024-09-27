import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import { useBox, usePlane } from "@react-three/cannon";
import CameraController from "./CameraController";
import { useControls } from "leva";

const Model = ({ url }) => {
  const modelRef = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, modelRef);
  const [addZ, setAddZ] = useState(25);
  const [addX, setAddX] = useState(0);

  const [ref, api] = useBox(() => ({
    mass: 2,
    position: [0, 1, 0],
    args: [2, 2, 2],
    material: {
      friction: 1,
      restitution: 0.1,
    },
    onCollide: (e) => {
      console.log("Collision detected with:", e.body);
    },
  }));
  const { speed, jumpHeight, gravity } = useControls({
    speed: { value: 0.15, min: 0, max: 15 },
    jumpHeight: { value: 0.9, min: 0, max: 100 },
    gravity: { value: -0.041, min: -1, max: 1 },
  });
  const animationSpeed = 0.5;

  const [moveForward, setMoveForward] = useState(false);
  const [moveForwardLeft, setMoveForwardLeft] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpVelocity, setJumpVelocity] = useState(0);

  useEffect(() => {
    if (actions) {
      actions["Dance"].play();
      if (
        moveForward ||
        moveBackward ||
        moveLeft ||
        moveRight ||
        moveForwardLeft
      ) {
        actions["Running"].play();
      } else {
        actions["Running"].stop();
      }
      if (isJumping) {
        actions["Jump"].play();
        actions["Jump"].timeScale = animationSpeed;
      } else {
        actions["Jump"].stop();
      }
    }
  }, [
    actions,
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    isJumping,
    moveForwardLeft,
  ]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key.toLowerCase()) {
        case "w":
        case "ц":
          setMoveForward(true);
          break;
        case "s":
        case "ы":
          setMoveBackward(true);
          break;
        case "a":
        case "ф":
          setMoveLeft(true);
          break;
        case "d":
        case "в":
          setMoveRight(true);
          break;
        case " ":
          if (!isJumping) {
            setIsJumping(true);
            setJumpVelocity(jumpHeight);
          }
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key.toLowerCase()) {
        case "w":
        case "ц":
          setMoveForward(false);
          break;
        case "s":
        case "ы":
          setMoveBackward(false);
          break;
        case "a":
        case "ф":
          setMoveLeft(false);
          break;
        case "d":
        case "в":
          setMoveRight(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isJumping]);

  useFrame(() => {
    if (!modelRef.current) return;

    const model = modelRef.current;

    const currentPosition = model.position.clone();

    let newPosition = [model.position.x, model.position.y, model.position.z];

    if (moveForward && moveLeft) {
      model.position.z += speed; // Diagonal forward-left (reversed)
      model.position.x += speed;
      scene.rotation.y = Math.PI / 4;
      currentPosition.z += speed;
      currentPosition.x += speed;
    } else if (moveForward && moveRight) {
      model.position.z += speed; // Diagonal forward-right (reversed)
      model.position.x -= speed;
      scene.rotation.y = (Math.PI * 7) / 4;
      currentPosition.z += speed;
      currentPosition.x -= speed;
    } else if (moveBackward && moveLeft) {
      model.position.z -= speed; // Diagonal backward-left (reversed)
      model.position.x += speed;
      scene.rotation.y = (Math.PI * 3) / 4;
      currentPosition.z -= speed;
      currentPosition.x += speed;
    } else if (moveBackward && moveRight) {
      model.position.z -= speed; // Diagonal backward-right (reversed)
      model.position.x -= speed;
      scene.rotation.y = (Math.PI * 5) / 4;
      currentPosition.z -= speed;
      currentPosition.x -= speed;
    } else if (moveBackward) {
      model.position.z -= speed; // Move backward (reversed to forward)
      scene.rotation.y = Math.PI;
      newPosition[2] -= speed;
      currentPosition.z -= speed;
    } else if (moveForward) {
      model.position.z += speed; // Move forward (reversed to backward)
      scene.rotation.y = Math.PI * 2;
      newPosition[2] += speed;
      currentPosition.z += speed;
    } else if (moveRight) {
      model.position.x -= speed; // Move right (reversed to left)
      scene.rotation.y = (Math.PI * 3) / 2;
      newPosition[0] -= speed;
      currentPosition.x -= speed;
    } else if (moveLeft) {
      model.position.x += speed; // Move left (reversed to right)
      scene.rotation.y = Math.PI / 2;
      currentPosition.x += speed;
      newPosition[0] += speed;
    }

    model.position.copy(currentPosition);
    api.position.set(currentPosition.x, jumpVelocity, currentPosition.z);
    if (isJumping) {
      model.position.y += jumpVelocity;
      setJumpVelocity((prev) => prev + gravity);
      if (model.position.y <= 0) {
        model.position.y = 0;
        setIsJumping(false);
        setJumpVelocity(0);
      }
    }
  });

  return (
    <mesh ref={ref}>
      <CameraController modelRef={modelRef} addZ={addZ} addX={addX} />
      <primitive ref={modelRef} object={scene} scale={1.5} />
    </mesh>
  );
};

export default Model;
