import React, { useState } from 'react';

const ToggleSwitch = ({ label, checked, onChange }) => (
    <div className="setting-item flex items-center mb-4">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="mr-2 w-5 h-5"
        />
        <label className="text-sm font-medium text-gray-700">{label}</label>
    </div>
);

const ColorPicker = ({ label, value, onChange }) => (
    <div className="setting-item mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type="color"
            value={value}
            onChange={onChange}
            className="w-full mt-1 border rounded-md p-1"
        />
    </div>
);

const TextInput = ({ label, value, onChange, type = "text" }) => (
    <div className="setting-item mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full mt-1 border rounded-md p-1"
        />
    </div>
);

const SettingsModal = () => {
    const [settings, setSettings] = useState({
        backgroundColor: "#ffffff",
        shirtColor: "#000000",
        gridVisibility: false,
        borderVisibility: false,
        shadowEnabled: false,
        darkMode: false,
        fontSize: "16px",
        fontFamily: "Arial",
        textAlignment: "left",
        lineHeight: "1.5",
        letterSpacing: "0px",
        buttonStyle: "default",
    });

    const handleChange = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            <ColorPicker
                label="Background Color"
                value={settings.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
            />

            <ColorPicker
                label="Shirt Color"
                value={settings.shirtColor}
                onChange={(e) => handleChange('shirtColor', e.target.value)}
            />

            <ToggleSwitch
                label="Show Tool Tip"
                checked={settings.gridVisibility}
                onChange={() => handleChange('gridVisibility', !settings.gridVisibility)}
            />

            <ToggleSwitch
                label="Show Ambient Light"
                checked={settings.gridVisibility}
                onChange={() => handleChange('gridVisibility', !settings.gridVisibility)}
            />

            <ToggleSwitch
                label="Show Environment"
                checked={settings.gridVisibility}
                onChange={() => handleChange('gridVisibility', !settings.gridVisibility)}
            />

            <ToggleSwitch
                label="Show Directional Light"
                checked={settings.gridVisibility}
                onChange={() => handleChange('gridVisibility', !settings.gridVisibility)}
            />

            <ToggleSwitch
                label="Show Grid"
                checked={settings.gridVisibility}
                onChange={() => handleChange('gridVisibility', !settings.gridVisibility)}
            />

            <ToggleSwitch
                label="Show Border"
                checked={settings.borderVisibility}
                onChange={() => handleChange('borderVisibility', !settings.borderVisibility)}
            />

            <ToggleSwitch
                label="Enable Shadow"
                checked={settings.shadowEnabled}
                onChange={() => handleChange('shadowEnabled', !settings.shadowEnabled)}
            />

            <ToggleSwitch
                label="Enable Dark Mode"
                checked={settings.darkMode}
                onChange={() => handleChange('darkMode', !settings.darkMode)}
            />

            <TextInput
                label="Font Size"
                value={settings.fontSize}
                onChange={(e) => handleChange('fontSize', e.target.value)}
            />

            <TextInput
                label="Font Family"
                value={settings.fontFamily}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
            />

            <TextInput
                label="Text Alignment"
                value={settings.textAlignment}
                onChange={(e) => handleChange('textAlignment', e.target.value)}
            />

            <TextInput
                label="Line Height"
                value={settings.lineHeight}
                onChange={(e) => handleChange('lineHeight', e.target.value)}
            />

            <TextInput
                label="Letter Spacing"
                value={settings.letterSpacing}
                onChange={(e) => handleChange('letterSpacing', e.target.value)}
            />

            <TextInput
                label="Button Style"
                value={settings.buttonStyle}
                onChange={(e) => handleChange('buttonStyle', e.target.value)}
            />
        </div>
    );
};

export default SettingsModal;
