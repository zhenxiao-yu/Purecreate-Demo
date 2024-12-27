import React from 'react';

const TextureLogoPicker = ({ texturesLogos, handleTextureLogoClick }) => {
    const textures = texturesLogos.filter((textureLogo) => textureLogo.type === 'texture');
    const frontLogos = texturesLogos.filter((textureLogo) => textureLogo.type === 'frontLogo');
    const backLogos = texturesLogos.filter((textureLogo) => textureLogo.type === 'backLogo');

    const renderImages = (images, category) => {
        if (images.length === 0) {
            return (
                <div className='text-gray-500 text-sm text-center'>
                    No {category.toLowerCase()} available.
                </div>
            );
        }

        return (
            <div className='grid grid-cols-2 gap-3'>
                {images.map((image, index) => (
                    <button
                        key={image.name}
                        onClick={() => handleTextureLogoClick(image)}
                        className='relative focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg overflow-hidden group'
                        aria-label={`Select ${image.name}`}
                    >
                        <img
                            src={image.image}
                            alt={image.name}
                            className='rounded-lg w-full transition-transform duration-300 group-hover:scale-105'
                        />
                        <span className='absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded'>
              {image.name}
            </span>
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className='absolute left-full ml-4 bg-white shadow-lg rounded-lg p-4 w-56'>
            <h2 className='text-lg font-semibold mb-2 text-gray-800'>Textures</h2>
            <div className='flex flex-wrap overflow-y-auto h-40 border rounded-lg p-2'>
                {renderImages(textures, 'Textures')}
            </div>
            <h2 className='text-lg font-semibold mt-4 mb-2 text-gray-800'>Front Logos</h2>
            <div className='flex flex-wrap overflow-y-auto h-40 border rounded-lg p-2'>
                {renderImages(frontLogos, 'Front Logos')}
            </div>
            <h2 className='text-lg font-semibold mt-4 mb-2 text-gray-800'>Back Logos</h2>
            <div className='flex flex-wrap overflow-y-auto h-40 border rounded-lg p-2'>
                {renderImages(backLogos, 'Back Logos')}
            </div>
        </div>
    );
};

export default TextureLogoPicker;
