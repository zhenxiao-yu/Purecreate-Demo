import React, { useState, useEffect, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import { Vector3 } from 'three';

// Error Boundary to handle potential rendering issues gracefully
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please reload the page.</div>;
    }
    return this.props.children;
  }
}

// Custom Controls Component for 6DoF keyboard-based controls
const SixDoFControls = () => {
  const { camera } = useThree();

  // Movement speeds
  const translationSpeed = 0.2;
  const rotationSpeed = 0.01;

  const handleKeyDown = useCallback(
      (event) => {
        const move = new Vector3();

        switch (event.key) {
            // Translation (movement)
          case 'w': // Forward
            move.z = -translationSpeed;
            break;
          case 's': // Backward
            move.z = translationSpeed;
            break;
          case 'a': // Left
            move.x = -translationSpeed;
            break;
          case 'd': // Right
            move.x = translationSpeed;
            break;
          case 'q': // Down
            move.y = -translationSpeed;
            break;
          case 'e': // Up
            move.y = translationSpeed;
            break;

            // Rotation
          case 'ArrowUp': // Pitch up
            camera.rotation.x -= rotationSpeed;
            break;
          case 'ArrowDown': // Pitch down
            camera.rotation.x += rotationSpeed;
            break;
          case 'ArrowLeft': // Yaw left
            camera.rotation.y -= rotationSpeed;
            break;
          case 'ArrowRight': // Yaw right
            camera.rotation.y += rotationSpeed;
            break;
          case 'r': // Roll left
            camera.rotation.z -= rotationSpeed;
            break;
          case 'f': // Roll right
            camera.rotation.z += rotationSpeed;
            break;

          default:
            break;
        }

        // Apply translation
        camera.position.add(move);
      },
      [camera, translationSpeed, rotationSpeed]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return null;
};

const CanvasModel = () => {
  const [fov, setFov] = useState(25); // Default FOV

  // Adjust FOV dynamically based on window width
  useEffect(() => {
    const updateFov = () => {
      const width = window.innerWidth;
      if (width <= 600) setFov(35); // Wider FOV for smaller screens
      else if (width <= 1260) setFov(30);
      else setFov(25); // Default for larger screens
    };

    updateFov(); // Initial FOV setup
    window.addEventListener('resize', updateFov);

    return () => window.removeEventListener('resize', updateFov); // Cleanup listener
  }, []);

  return (
      <ErrorBoundary>
        <Canvas
            camera={{ position: [0, 0, 5], fov }} // Dynamic FOV and initial position
            gl={{ preserveDrawingBuffer: true }} // Enable saving canvas images
            shadows // Enable dynamic shadows
            className="w-full max-w-full h-full transition-all ease-in" // Responsive styling
        >
          {/* Ambient light for overall scene illumination */}
          <ambientLight intensity={0.5} />

          {/* Directional light with shadows */}
          <directionalLight
              castShadow
              position={[5, 5, 5]}
              intensity={0.5}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
          />

          {/* OrbitControls for mouse-driven interaction */}
          <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={2} // Minimum zoom distance
              maxDistance={10} // Maximum zoom distance
              maxPolarAngle={Math.PI / 2} // Limit vertical rotation to 90 degrees
              minPolarAngle={0} // Prevent flipping below the horizon
          />

          {/* Custom 6DoF keyboard controls */}
          <SixDoFControls />

          {/* CameraRig for dynamic camera positioning */}
          <CameraRig>
            {/* Backdrop for the scene's background */}
            <Backdrop />

            {/* Center ensures the Shirt model is centered */}
            <Center>
              <Shirt castShadow receiveShadow />
            </Center>
          </CameraRig>
        </Canvas>
      </ErrorBoundary>
  );
};

export default CanvasModel;
