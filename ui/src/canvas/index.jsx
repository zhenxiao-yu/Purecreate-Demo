import React, { useState, useEffect, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';

import state from '../store';
import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import { calculateFov, handleKeyControls } from '../config/helpers';

// ErrorBoundary to catch rendering errors in the Canvas component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error details for debugging
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return <div>Something went wrong. Please reload the page.</div>;
    }
    return this.props.children;
  }
}

// Main Canvas component to render the 3D model
const CanvasModel = () => {
  const [fov, setFov] = useState(25); // Field of View for the camera
  const snap = useSnapshot(state); // Snapshot from Valtio state

  useEffect(() => {
    // Update FOV dynamically based on window width
    const updateFov = () => {
      setFov(calculateFov(window.innerWidth));
    };

    updateFov(); // Initial setup
    window.addEventListener('resize', updateFov); // Handle window resize

    return () => window.removeEventListener('resize', updateFov);
  }, []);

  return (
      <ErrorBoundary>
        <Canvas
            camera={{ position: [0, 0, 5], fov }} // Camera configuration
            gl={{ preserveDrawingBuffer: true }} // Preserve canvas drawing
            shadows // Enable shadows for realistic lighting
            className="w-full max-w-full h-full transition-all ease-in"
        >
          {/* Ambient light for general illumination */}
          <ambientLight intensity={0.5} />

          {/* Directional light for shadows and highlights */}
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

          {/* Orbit controls for intuitive camera movement */}
          <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={2}
              maxDistance={10}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={0}
          />

          {/* Custom camera rig for model interaction */}
          <CameraRig>
            {/* Backdrop for better visual context */}
            <Backdrop />

            {/* Centered 3D model with dynamic position */}
            <Center position={snap.intro ? [0.45, 0, 0] : [0, 0, 0]}>
              <Shirt castShadow receiveShadow />
            </Center>
          </CameraRig>
        </Canvas>
      </ErrorBoundary>
  );
};

export default CanvasModel;
