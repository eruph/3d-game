import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import { useBox, usePlane } from "@react-three/cannon";
import CameraController from "./CameraController";
const Model = ({ url }) => {
  const modelRef = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, modelRef);

  const [boxRef] = useBox(() => ({
    mass: 1,
    position: [0, 0, 0],
    args: [1, 1, 1], // Размер коллайдера
  }));

  // Добавляем плоскость
  usePlane(() => ({
    position: [0, -0.5, 0],
    rotation: [-Math.PI / 2, 0, 0],
    type: "Static", // Статическая плоскость
  }));

  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpVelocity, setJumpVelocity] = useState(0);

  const speed = 0.15;
  const jumpHeight = 0.9;
  const gravity = -0.041;

  const animationSpeed = 0.2;
  useEffect(() => {
    if (actions) {
      actions["Dance"].play();
      if (moveForward || moveBackward || moveLeft || moveRight) {
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
  }, [actions, moveForward, moveBackward, moveLeft, moveRight, isJumping]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "w":
        case "W":
        case "ц":
        case "Ц":
          setMoveBackward(true);
          break;
        case "s":
        case "S":
        case "ы":
        case "Ы":
          setMoveForward(true);
          break;
        case "a":
        case "A":
        case "ф":
        case "Ф":
          setMoveRight(true);
          break;
        case "d":
        case "D":
        case "в":
        case "В":
          setMoveLeft(true);

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
      switch (event.key) {
        case "w":
        case "W":
        case "ц":
        case "Ц":
          setMoveBackward(false);

        break;
        case "s":
        case "S":
        case "ы":
        case "Ы":
          setMoveForward(false);

        break;
        case "a":
        case "A":
        case "ф":
        case "Ф":
          setMoveRight(false);

        break;
        case "d":
        case "D":
        case "в":
        case "В":
          setMoveLeft(false);

          break;
        case " ":
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

    if (moveForward) {
      model.position.z -= speed; // Вперёд
    }
    if (moveBackward) {
      model.position.z += speed; // Назад
    }
    if (moveLeft) {
      model.position.x -= speed; // Влево
    }
    if (moveRight) {
      model.position.x += speed; // Вправо
    }
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
    <>
      <CameraController modelRef={modelRef} />
      <primitive ref={modelRef} object={scene} scale={1.5} />
    </>
  );
};

export default Model;
