import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';

import state from '../store';

const popularColors = [
    '#FF5733', '#33FF57', '#3357FF', '#FFC300',
    '#900C3F', '#DAF7A6', '#581845', '#C70039'
];

const isValidHex = (value) => /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(value);
const isValidRgb = (value) =>
    /^rgb\((\s*\d+\s*,\s*\d+\s*,\s*\d+\s*)\)$/i.test(value);

const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return `rgb(${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${
        bigint & 255
    })`;
};

const rgbToHex = (rgb) => {
    const result = rgb
        .match(/\d+/g)
        .map((x) => parseInt(x).toString(16).padStart(2, '0'))
        .join('');
    return `#${result}`;
};

const ColorPicker = () => {
    const snap = useSnapshot(state);
    const [inputColor, setInputColor] = useState(
        snap.color || '#000000'
    ); // Initialize input state

    const handleInputChange = (e) => {
        const value = e.target.value.trim();
        setInputColor(value);

        // Validate HEX or RGB input and update state
        if (isValidHex(value)) {
            state.color = value;
        } else if (isValidRgb(value)) {
            const hexValue = rgbToHex(value);
            state.color = hexValue;
        }
    };

    const handlePickerChange = (color) => {
        state.color = color.hex;
        setInputColor(color.hex); // Update input value
    };

    const handlePopularColorClick = (color) => {
        state.color = color;
        setInputColor(color); // Update input and picker color
    };

    return (
        <div className="absolute left-full ml-3 p-4 bg-white rounded-lg shadow-md w-80">
            {/* Color Picker */}
            <div className="flex flex-col items-center">
                <div className="w-full">
                    <SketchPicker
                        color={snap.color || '#000000'}
                        disableAlpha
                        onChange={handlePickerChange}
                        styles={{
                            default: {
                                picker: {
                                    width: '100%',
                                    boxSizing: 'border-box',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Input for HEX or RGB */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Color (HEX or RGB):
                </label>
                <input
                    type="text"
                    value={inputColor}
                    onChange={handleInputChange}
                    placeholder="#000000 or rgb(0,0,0)"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
                />
            </div>

            {/* Popular Colors */}
            <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                    Popular Colors:
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {popularColors.map((color) => (
                        <div
                            key={color}
                            className="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500 transition-colors"
                            style={{ backgroundColor: color }}
                            onClick={() => handlePopularColorClick(color)}
                            title={color}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
