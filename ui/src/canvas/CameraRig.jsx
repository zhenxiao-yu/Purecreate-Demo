import React, { useEffect, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { OrbitControls } from '@react-three/drei'; // Optional for better user interaction

// Breakpoints for responsiveness
const breakpoints = {
  isBreakpoint: 1260,
  isMobile: 600,
};

// Utility: Check if positions are approximately equal
const positionsAreEqual = (pos1, pos2) =>
    pos1.every((val, index) => Math.abs(val - pos2[index]) < 0.01);

const CameraRig = ({ children }) => {
  const { camera } = useThree();

  // Target position based on screen width
  const getTargetPosition = useCallback(() => {
    const { innerWidth } = window;
    if (innerWidth <= breakpoints.isMobile) return [0, 0.2, 2.5];
    if (innerWidth <= breakpoints.isBreakpoint) return [0, 0, 2];
    return [-0.4, 0, 2];
  }, []);

  // Update the camera position smoothly
  const updateCameraPosition = useCallback(() => {
    const targetPosition = getTargetPosition();
    if (!positionsAreEqual(camera.position.toArray(), targetPosition)) {
      gsap.to(camera.position, {
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2],
        duration: 0.7, // Adjust duration for smoother effect
        ease: 'power3.inOut', // Enhanced easing
      });
    }
  }, [getTargetPosition, camera.position]);

  useEffect(() => {
    // Debounced resize handler
    const handleResize = debounce(() => {
      updateCameraPosition();
    }, 200);

    // Initial setup
    updateCameraPosition();

    // Resize listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCameraPosition]);

  return (
      <>
        <OrbitControls enableDamping={true} dampingFactor={0.1} /> {/* Optional */}
        {children}
      </>
  );
};

export default CameraRig;

// Utility function: Debounce with clearTimeout
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
