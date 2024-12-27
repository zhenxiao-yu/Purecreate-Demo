import React, { useState } from 'react';
import CustomButton from './CustomButton';

const FilePicker = ({ file, setFile, readFile }) => {
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        validateFile(selectedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const selectedFile = e.dataTransfer.files[0];
        validateFile(selectedFile);
    };

    const validateFile = (selectedFile) => {
        if (selectedFile && !selectedFile.type.startsWith('image/')) {
            setError('Only image files are supported.');
            setFile('');
        } else {
            setError('');
            setFile(selectedFile);
        }
    };

    return (
        <div className="filepicker-container bg-white text-black p-8 sm:p-10 md:p-12 rounded-xl shadow-xl max-w-[90%] sm:max-w-md lg:max-w-lg mx-auto flex flex-col items-center gap-6">
            {/* Heading Section */}
            <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Upload File</h2>
                <p className="text-gray-600 text-sm sm:text-base">
                    Drag and drop your file here or click the button to upload a supported image file (JPG, PNG, GIF).
                </p>
            </div>

            {/* Drag-and-Drop Area */}
            <div
                className={`w-full border-2 ${
                    isDragging ? 'border-dashed border-gray-800' : 'border-dashed border-gray-500'
                } rounded-lg p-6 text-center bg-gray-100 transition ${
                    isDragging ? 'bg-gray-200' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-white text-black text-lg sm:text-xl py-2 px-4 sm:py-4 sm:px-8 rounded-lg transition transform hover:scale-105 hover:bg-gray-200 duration-300 shadow-md inline-block">
                    Click to Choose File
                </label>
                <p className="mt-4 text-sm text-gray-600">
                    Or drag and drop your file here
                </p>
            </div>

            {/* Display Selected File Name or Error */}
            <div
                className={`mt-4 text-center text-sm sm:text-base ${
                    error ? 'text-red-500' : 'text-gray-600'
                } break-words max-w-full`}>
                {error ? error : file === '' ? 'No file selected' : `Selected file: ${file.name}`}
            </div>

            {/* Action Buttons */}
            <div className="flex w-full justify-center gap-4">
                <CustomButton
                    type="outline"
                    title="Front"
                    handleClick={() => readFile('frontLogo')}
                    customStyles="w-40 h-12 sm:w-48 sm:h-14 text-sm sm:text-base border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg transition transform hover:scale-105 duration-300"
                />
                <CustomButton
                    type="outline"
                    title="Back"
                    handleClick={() => readFile('backLogo')}
                    customStyles="w-40 h-12 sm:w-48 sm:h-14 text-sm sm:text-base border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg transition transform hover:scale-105 duration-300"
                />
                <CustomButton
                    type="filled"
                    title="Texture"
                    handleClick={() => readFile('full')}
                    customStyles="w-40 h-12 sm:w-48 sm:h-14 text-sm sm:text-base bg-gray-800 text-white hover:bg-gray-700 rounded-lg transition transform hover:scale-105 duration-300"
                />
            </div>
        </div>
    );
};

export default FilePicker;
