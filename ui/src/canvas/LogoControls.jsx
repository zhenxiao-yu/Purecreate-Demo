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

    // Helper function to create control elements
    const renderControl = (label, type, index, currentValue) => (
        <div className="flex items-center justify-between space-x-2">
            <span className="text-sm text-gray-600 w-24">{label}</span>
            <div className="flex items-center space-x-2">
                <button
                    className="transition-colors border border-gray-300 rounded p-1 w-8 text-xs bg-white hover:bg-gray-200"
                    onClick={() => handlePositionChange(type, index, currentValue - 0.01)}
                >
                    -
                </button>
                <span className="text-sm text-gray-600 w-16 text-center">{(100 * currentValue).toFixed(1)}%</span>
                <button
                    className="transition-colors border border-gray-300 rounded p-1 w-8 text-xs bg-white hover:bg-gray-200"
                    onClick={() => handlePositionChange(type, index, currentValue + 0.01)}
                >
                    +
                </button>
            </div>
        </div>
    );

    const renderScaleControl = (label, type, currentValue) => (
        <div className="flex items-center justify-between space-x-2">
            <span className="text-sm text-gray-600 w-24">{label}</span>
            <div className="flex items-center space-x-2">
                <button
                    className="transition-colors border border-gray-300 rounded p-1 w-8 text-xs bg-white hover:bg-gray-200"
                    onClick={() => handleScaleChange(type, currentValue - 0.01)}
                >
                    -
                </button>
                <span className="text-sm text-gray-600 w-16 text-center">{(100 * currentValue).toFixed(1)}%</span>
                <button
                    className="transition-colors border border-gray-300 rounded p-1 w-8 text-xs bg-white hover:bg-gray-200"
                    onClick={() => handleScaleChange(type, currentValue + 0.01)}
                >
                    +
                </button>
            </div>
        </div>
    );

    return (
        <div className="absolute left-full ml-4 bg-white shadow-md rounded-lg p-5 w-72 md:w-96 max-h-[80vh] overflow-y-auto transform transition-all duration-300 hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Front Logo Controls</h2>
            <div className="grid grid-cols-1 gap-3 mb-6">
                {renderControl('Position X', 'front', 0, snap.frontLogoPosition[0])}
                {renderControl('Position Y', 'front', 1, snap.frontLogoPosition[1])}
                {renderControl('Position Z', 'front', 2, snap.frontLogoPosition[2])}
                {renderScaleControl('Scale', 'front', snap.frontLogoScale)}
            </div>

            <h2 className="text-lg font-semibold mb-4 text-gray-800">Back Logo Controls</h2>
            <div className="grid grid-cols-1 gap-3">
                {renderControl('Position X', 'back', 0, snap.backLogoPosition[0])}
                {renderControl('Position Y', 'back', 1, snap.backLogoPosition[1])}
                {renderControl('Position Z', 'back', 2, snap.backLogoPosition[2])}
                {renderScaleControl('Scale', 'back', snap.backLogoScale)}
            </div>
        </div>
    );
};

export default LogoControls;
