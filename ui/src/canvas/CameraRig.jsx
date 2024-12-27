import React, { useEffect, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';

// Immutable breakpoints for screen sizes
const breakpoints = Object.freeze({
  isBreakpoint: 1260,
  isMobile: 600,
});

// Utility function to debounce calls
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const CameraRig = ({ children }) => {
  const { camera } = useThree();

  // Determine the target camera position based on screen width
  const getTargetPosition = useCallback(() => {
    const { innerWidth } = window;
    if (innerWidth <= breakpoints.isMobile) return [0, 0.2, 2.5];
    if (innerWidth <= breakpoints.isBreakpoint) return [0, 0, 2];
    return [-0.4, 0, 2];
  }, []);

  // Update the camera position with animation
  const updateCameraPosition = useCallback(() => {
    const targetPosition = getTargetPosition();
    gsap.to(camera.position, {
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [getTargetPosition, camera.position]);

  useEffect(() => {
    // Debounced resize handler
    const handleResize = debounce(() => {
      updateCameraPosition();
    }, 200);

    // Set initial position on mount
    updateCameraPosition();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCameraPosition]);

  return <>{children}</>;
};

export default CameraRig;
