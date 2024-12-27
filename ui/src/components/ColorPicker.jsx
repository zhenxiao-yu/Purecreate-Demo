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
    const [inputColor, setInputColor] = useState(snap.color || '#000000');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value.trim();
        setInputColor(value);
        setError('');

        if (isValidHex(value)) {
            state.color = value;
        } else if (isValidRgb(value)) {
            const hexValue = rgbToHex(value);
            state.color = hexValue;
        } else {
            setError('Invalid HEX or RGB color format.');
        }
    };

    const handlePickerChange = (color) => {
        state.color = color.hex;
        setInputColor(color.hex);
        setError('');
    };

    const handlePopularColorClick = (color) => {
        state.color = color;
        setInputColor(color);
        setError('');
    };

    return (
        <div className="absolute left-full ml-3 p-4 bg-white rounded-lg shadow-md w-80">
            <div className="flex flex-col items-center">
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

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Color (HEX or RGB):
                </label>
                <input
                    type="text"
                    value={inputColor}
                    onChange={handleInputChange}
                    placeholder="#000000 or rgb(0,0,0)"
                    aria-label="Color input"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
                />
                {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                )}
            </div>

            <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                    Popular Colors:
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {popularColors.map((color) => (
                        <div
                            key={color}
                            className="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all"
                            style={{ backgroundColor: color }}
                            onClick={() => handlePopularColorClick(color)}
                            title={color}
                            aria-label={`Select color ${color}`}
                        >
                            <span
                                className="sr-only"
                                role="tooltip"
                            >
                                {color}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
