
import React, { useState } from 'react';
import { useSnapshot } from 'valtio';

import state from '../store/index.js';

const LogoControls = () => {
    const snap = useSnapshot(state);

    // History for undo/redo
    const [history, setHistory] = useState([{ frontLogoPosition: [...state.frontLogoPosition], backLogoPosition: [...state.backLogoPosition], frontLogoScale: state.frontLogoScale, backLogoScale: state.backLogoScale }]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateState = (newState) => {
        const updatedHistory = history.slice(0, currentIndex + 1);
        updatedHistory.push(newState);
        setHistory(updatedHistory);
        setCurrentIndex(updatedHistory.length - 1);

        // Update the proxy state
        Object.assign(state, newState);
    };

    const handlePositionChange = (type, index, value) => {
        const newState = {
            ...history[currentIndex],
            [`${type}LogoPosition`]: [...history[currentIndex][`${type}LogoPosition`]],
        };
        newState[`${type}LogoPosition`][index] = value;

        updateState(newState);
    };

    const handleScaleChange = (type, value) => {
        const newState = {
            ...history[currentIndex],
            [`${type}LogoScale`]: value,
        };

        updateState(newState);
    };

    const handleUndo = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            Object.assign(state, history[currentIndex - 1]);
        }
    };

    const handleRedo = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
            Object.assign(state, history[currentIndex + 1]);
        }
    };

    const handleRestore = () => {
        const initialState = history[0];
        Object.assign(state, initialState);
        setCurrentIndex(0);
    };

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
        <div className="absolute left-full ml-4 bg-white shadow-md rounded-lg p-5 w-80 md:w-80 max-h-[80vh] overflow-y-auto transform transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-8 text-gray-800">Logo Editor</h2>

            <h3 className="text-md font-semibold mb-3 text-gray-800">Front Logo Controls</h3>
            <div className="grid grid-cols-1 gap-3 mb-6">
                {renderControl('Position X', 'front', 0, snap.frontLogoPosition[0])}
                {renderControl('Position Y', 'front', 1, snap.frontLogoPosition[1])}
                {renderControl('Position Z', 'front', 2, snap.frontLogoPosition[2])}
                {renderScaleControl('Scale', 'front', snap.frontLogoScale)}
            </div>

            <h3 className="text-md font-semibold mb-3 text-gray-800">Back Logo Controls</h3>
            <div className="grid grid-cols-1 gap-3 mb-6">
                {renderControl('Position X', 'back', 0, snap.backLogoPosition[0])}
                {renderControl('Position Y', 'back', 1, snap.backLogoPosition[1])}
                {renderControl('Position Z', 'back', 2, snap.backLogoPosition[2])}
                {renderScaleControl('Scale', 'back', snap.backLogoScale)}
            </div>

            <div className="flex w-full mt-4">
                <button
                    className="w-1/3 bg-blue-500 border-x-2 text-white px-3 py-2 rounded-l text-sm hover:bg-blue-600 transition-colors"
                    onClick={handleUndo}
                    disabled={currentIndex === 0}
                >
                    Undo
                </button>
                <button
                    className="w-1/3 bg-blue-500 border-x-2 text-white px-3 py-2 text-sm hover:bg-blue-600 transition-colors"
                    onClick={handleRedo}
                    disabled={currentIndex === history.length - 1}
                >
                    Redo
                </button>
                <button
                    className="w-1/3 bg-red-500 border-x-2 text-white px-3 py-2 rounded-r text-sm hover:bg-red-600 transition-colors"
                    onClick={handleRestore}
                >
                    Restore
                </button>
            </div>
        </div>
    );
};

export default LogoControls;
