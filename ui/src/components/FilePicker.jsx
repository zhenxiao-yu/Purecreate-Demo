import React, { useState } from 'react';
import CustomButton from './CustomButton';

const FilePicker = ({ file, setFile, readFile }) => {
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const validateFile = (selectedFile) => {
        if (selectedFile && !selectedFile.type.startsWith('image/')) {
            setError('Only image files are supported.');
            setFile('');
        } else {
            setError('');
            setFile(selectedFile);
        }
    };

    const handleFileInput = (e) => validateFile(e.target.files[0]);

    const handleDragEvents = (e, isEnter = false) => {
        e.preventDefault();
        setIsDragging(isEnter);
        if (!isEnter && e.type === 'drop') {
            validateFile(e.dataTransfer.files[0]);
        }
    };

    const buttonConfigs = [
        { type: 'outline', title: 'Front', action: 'frontLogo' },
        { type: 'outline', title: 'Back', action: 'backLogo' },
        { type: 'filled', title: 'Texture', action: 'full' },
    ];

    return (
        <div className="filepicker-container bg-white text-black p-8 sm:p-10 md:p-12 rounded-xl shadow-xl max-w-md mx-auto flex flex-col items-center gap-6">
            <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Upload File</h2>
                <p className="text-gray-600 text-sm sm:text-base">
                    Drag and drop an image here, or click to upload (JPG, PNG, GIF).
                </p>
            </div>

            <div
                className={`w-full border-2 rounded-lg p-6 text-center bg-gray-100 transition ${
                    isDragging ? 'border-gray-800 bg-gray-200' : 'border-gray-500'
                }`}
                onDragOver={(e) => handleDragEvents(e, true)}
                onDragLeave={(e) => handleDragEvents(e, false)}
                onDrop={(e) => handleDragEvents(e, false)}
            >
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-black text-lg sm:text-xl py-2 px-4 sm:py-4 sm:px-8 rounded-lg hover:scale-105 hover:bg-gray-200 duration-300  inline-block"
                >
                    Click to Choose File
                </label>
                <p className="mt-4 text-sm text-gray-800">Or drag and drop your file here</p>
            </div>

            <div className={`mt-4 text-center text-sm ${error ? 'text-red-500' : 'text-gray-600'}`}>
                {error || (file ? `Selected file: ${file.name}` : 'No file selected')}
            </div>

            <div className="flex w-full justify-center gap-4">
                {buttonConfigs.map(({ type, title, action }) => (
                    <CustomButton
                        key={title}
                        type={type}
                        title={title}
                        handleClick={() => readFile(action)}
                        customStyles="w-40 h-12 sm:w-48 sm:h-14 text-sm sm:text-base transition transform hover:scale-105 duration-300"
                    />
                ))}
            </div>
        </div>
    );
};

export default FilePicker;
