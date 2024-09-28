import { useGLTF } from "@react-three/drei";
import { useRef ,useState, useEffect } from "react";
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
    position: [0, 0, 0],
    args: [2, 5, 2],
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
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [punch, setPunch] = useState(false);
  const [jumpVelocity, setJumpVelocity] = useState(0);


  useEffect(() => {
    if (actions) {
      if (!actions) return;

  if (punch && !actions["Punch"].isRunning()) {
    actions["Punch"].play();
  } else if (!punch && actions["Punch"].isRunning()) {
    actions["Punch"].stop();
  }

  if ((moveForward || moveBackward || moveLeft || moveRight) && !actions["Running"].isRunning()) {
    actions["Running"].play();
  } else if (!(moveForward || moveBackward || moveLeft || moveRight) && actions["Running"].isRunning()) {
    actions["Running"].stop();
  }

  if (isJumping && !actions["Jump"].isRunning()) {
    actions["Jump"].play();
    actions["Jump"].timeScale = animationSpeed;
  } else if (!isJumping && actions["Jump"].isRunning()) {
    actions["Jump"].stop();
  }
    }
  }, [
    actions,
    punch,
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    isJumping,
  ]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      switch (key) {
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
              setPunch(true);
              break;
        default:
        break;
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      switch (key) {
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
          setPunch(false);
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
  }, []);

  useFrame(() => {
    const model = modelRef.current;
  if (!model) return;

    
    const currentPosition = model.position.clone();

    if (moveForward && moveLeft) {
      scene.rotation.y = Math.PI / 4;
      currentPosition.z += speed;
      currentPosition.x += speed;
    } else if (moveForward && moveRight) {
      scene.rotation.y = (Math.PI * 7) / 4;
      currentPosition.z += speed;
      currentPosition.x -= speed;
    } else if (moveBackward && moveLeft) {
      scene.rotation.y = (Math.PI * 3) / 4;
      currentPosition.z -= speed;
      currentPosition.x += speed;
    } else if (moveBackward && moveRight) {
      scene.rotation.y = (Math.PI * 5) / 4;
      currentPosition.z -= speed;
      currentPosition.x -= speed;
    } else if (moveBackward) {
      scene.rotation.y = Math.PI;
      currentPosition.z -= speed; 
    } else if (moveForward) {
      scene.rotation.y = Math.PI * 2;
      currentPosition.z += speed; 
    } else if (moveRight) {
      scene.rotation.y = (Math.PI * 3) / 2;
      currentPosition.x -= speed;
    } else if (moveLeft) {
      currentPosition.x  += speed; 
      scene.rotation.y = Math.PI / 2;
    }

    if (isJumping) {
      currentPosition.y += jumpVelocity;
      setJumpVelocity((prev) => prev + gravity);
      if (currentPosition.y <= 0) {
        currentPosition.y = 0;
        setIsJumping(false);
        setJumpVelocity(0);
      }
    }

    if (!modelRef.current) return;

    api.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
    modelRef.current.position.copy(currentPosition);
  });

  return (
    <mesh ref={ref}>
      <CameraController modelRef={modelRef} addZ={addZ} addX={addX} />
      <primitive ref={modelRef} object={scene}  scale={1.5}/>
    </mesh>
  );
};

export default Model;
