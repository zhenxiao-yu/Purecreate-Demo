export const downloadCanvasToImage = () => {
  const canvas = document.querySelector("canvas");
  const dataURL = canvas.toDataURL();
  const link = document.createElement("a");

  link.href = dataURL;
  link.download = "canvas.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

export const getContrastingColor = (color) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};

import { Vector3 } from 'three';

// Function to handle dynamic FOV adjustment based on window width
export const calculateFov = (width) => {
  if (width <= 600) return 35; // Wider FOV for smaller screens
  if (width <= 1260) return 30;
  return 25; // Default for larger screens
};

// Function to handle 6DoF keyboard controls
export const handleKeyControls = (event, camera, translationSpeed, rotationSpeed) => {
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
};


