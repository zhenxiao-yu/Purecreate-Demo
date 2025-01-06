import React from 'react';
import { useSnapshot } from 'valtio';

import state from '../store';
import { getContrastingColor } from '../utils/helpers.js';

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === 'outline') {
      return {
        borderWidth: '2px',
        borderColor: snap.color,
        color: snap.color,
        backgroundColor: 'transparent',
      };
    } else {
      // Default styling
      return {
        backgroundColor: '#f0f0f0',
        color: '#333',
        border: 'none',
      };
    }
  };

  return (
      <button
          className={`relative px-6 py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 ease-in-out 
      group overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 
      focus:ring-${snap.color} hover:shadow-lg hover:scale-105 active:scale-95 ${customStyles}`}
          style={generateStyle(type)}
          onClick={(e) => {
            const ripple = document.createElement('span');
            const rect = e.currentTarget.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.background = snap.color;
            ripple.style.opacity = '0.4';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            e.currentTarget.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
              ripple.remove();
            });

            if (handleClick) handleClick(e);
          }}
      >
      <span
          className="absolute inset-0 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
          style={{
            backgroundColor: snap.color,
            opacity: 0.1,
          }}
      ></span>
        <span className="relative z-10">{title}</span>
      </button>
  );
};

export default CustomButton;

/* CSS for Ripple Animation */
const styles = `
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
