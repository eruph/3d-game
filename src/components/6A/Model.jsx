import { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import CameraController from "./CameraController";
import { useControls } from "leva";

const Model = ({ url }) => {
  // LEVA SETPARAMETERS
  const { speed, jumpHeight, gravity } = useControls({
    speed: { value: 0.15, min: 0, max: 15 },
    jumpHeight: { value: 0.9, min: 0, max: 100 },
    gravity: { value: -0.041, min: -1, max: 1 },
  });

  // ACTIONS
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const [isPuching, setIsPunching] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  // PARAMETERS
  const [jumpVelocity, setJumpVelocity] = useState(0);
  const modelRef = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, modelRef);
  const [addZ] = useState(25);
  const [addX] = useState(0);
  const animationSpeed = 0.5;

  // FUNCTIONS
  useEffect(() => {
    if (actions) {
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
      if (isDancing) {
        actions["Dance"].play();
      } else {
        actions["Dance"].stop();
      }
      if (isPuching) {
        actions["Punch"].play();
      } else {
        actions["Punch"].stop();
      }
      if (isWaving) {
        actions["Wave"].play();
      } else {
        actions["Wave"].stop();
      }
    }
  }, [
    actions,
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    isJumping,
    isDancing,
    isPuching,
    isWaving,
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
        case "r":
        case "к":
          if (!isPuching) {
            setIsPunching(true);
          }
          break;
        case "t":
        case "е":
          if (!isDancing) {
            setIsDancing(true);
          }
          break;
        case "y":
        case "н":
          if (!isWaving) {
            setIsWaving(true);
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
        case "r":
        case "к":
          setIsPunching(false);
          break;
        case "t":
        case "е":
          setIsDancing(false);
          break;
        case "y":
        case "н":
          setIsWaving(false);
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
  }, [isJumping, isDancing, isWaving, isPuching]);

  useFrame(() => {
    if (!modelRef.current) return;

    const model = modelRef.current;
    const movementSpeed = (speed * Math.sqrt(2)) / 2; // Adjust for diagonal speed normalization

    if (moveForward && moveLeft) {
      model.position.z += movementSpeed; // Diagonal forward-left (reversed)
      model.position.x += movementSpeed;
      scene.rotation.y = Math.PI / 4;
    } else if (moveForward && moveRight) {
      model.position.z += movementSpeed; // Diagonal forward-right (reversed)
      model.position.x -= movementSpeed;
      scene.rotation.y = (Math.PI * 7) / 4;
    } else if (moveBackward && moveLeft) {
      model.position.z -= movementSpeed; // Diagonal backward-left (reversed)
      model.position.x += movementSpeed;
      scene.rotation.y = (Math.PI * 3) / 4;
    } else if (moveBackward && moveRight) {
      model.position.z -= movementSpeed; // Diagonal backward-right (reversed)
      model.position.x -= movementSpeed;
      scene.rotation.y = (Math.PI * 5) / 4;
    } else if (moveBackward) {
      model.position.z -= speed; // Move backward (reversed to forward)
      scene.rotation.y = Math.PI;
    } else if (moveForward) {
      model.position.z += speed; // Move forward (reversed to backward)
      scene.rotation.y = Math.PI * 2;
    } else if (moveRight) {
      model.position.x -= speed; // Move right (reversed to left)
      scene.rotation.y = (Math.PI * 3) / 2;
    } else if (moveLeft) {
      model.position.x += speed; // Move left (reversed to right)
      scene.rotation.y = Math.PI / 2;
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
      <CameraController modelRef={modelRef} addZ={addZ} addX={addX} />
      <primitive ref={modelRef} object={scene} scale={1.5} />
    </>
  );
};

export default Model;
