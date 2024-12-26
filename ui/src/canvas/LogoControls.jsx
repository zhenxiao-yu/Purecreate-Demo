import React from 'react';
import { useSnapshot } from 'valtio';

import state from '../store';

const LogoControls = () => {
  const snap = useSnapshot(state);

  const handlePositionChange = (type, index, value) => {
    if (type === 'front') {
      state.frontLogoPosition[index] = value;
    } else if (type === 'back') {
      state.backLogoPosition[index] = value;
    }
  };

  const handleScaleChange = (type, value) => {
    if (type === 'front') {
      state.frontLogoScale = value;
    } else if (type === 'back') {
      state.backLogoScale = value;
    }
  };

  // Helper function to create control elements with better label clarity and fixed width for labels
  const renderControl = (label, type, index, currentValue) => (
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 w-28">{label}</span>
        <button
            className="border border-gray-300 rounded p-1 w-8 text-xs hover:bg-gray-100"
            onClick={() => handlePositionChange(type, index, currentValue - 0.01)}
        >
          -
        </button>
        <span className="text-gray-700 text-xs w-12 text-center">{100 * currentValue.toFixed(2)}%</span> {/* Display current value */}
        <button
            className="border border-gray-300 rounded p-1 w-8 text-xs hover:bg-gray-100"
            onClick={() => handlePositionChange(type, index, currentValue + 0.01)}
        >
          +
        </button>
      </div>
  );

  // Helper function for scale controls with clearer labels and fixed width for labels
  const renderScaleControl = (label, type, currentValue) => (
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 w-28">{label}</span>
        <button
            className="border border-gray-300 rounded p-1 w-8 text-xs hover:bg-gray-100"
            onClick={() => handleScaleChange(type, currentValue - 0.01)}
        >
          -
        </button>
        <span className="text-gray-700 text-xs w-12 text-center">{100 * currentValue.toFixed(2)}%</span> {/* Display current value */}
        <button
            className="border border-gray-300 rounded p-1 w-8 text-xs hover:bg-gray-100"
            onClick={() => handleScaleChange(type, currentValue + 0.01)}
        >
          +
        </button>
      </div>
  );

  return (
      <div className="absolute left-full ml-3 bg-white shadow-lg rounded-lg p-4 w-80 max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3">Front Logo Controls</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {renderControl('Position X', 'front', 0, snap.frontLogoPosition[0])}
          {renderControl('Position Y', 'front', 1, snap.frontLogoPosition[1])}
          {renderControl('Position Z', 'front', 2, snap.frontLogoPosition[2])}
          {renderScaleControl('Scale', 'front', snap.frontLogoScale)}
        </div>

        <h2 className="text-lg font-semibold mb-3">Back Logo Controls</h2>
        <div className="grid grid-cols-2 gap-4">
          {renderControl('Position X', 'back', 0, snap.backLogoPosition[0])}
          {renderControl('Position Y', 'back', 1, snap.backLogoPosition[1])}
          {renderControl('Position Z', 'back', 2, snap.backLogoPosition[2])}
          {renderScaleControl('Scale', 'back', snap.backLogoScale)}
        </div>
      </div>
  );
};

export default LogoControls;