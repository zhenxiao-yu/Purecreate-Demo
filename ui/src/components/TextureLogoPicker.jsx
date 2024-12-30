import React from 'react';

const TextureLogoPicker = ({ texturesLogos, handleTextureLogoClick }) => {
    const categorizeLogos = (type) => texturesLogos.filter((logo) => logo.type === type);

    const textures = categorizeLogos('texture');
    const frontLogos = categorizeLogos('frontLogo');
    const backLogos = categorizeLogos('backLogo');

    const renderImages = (images, category) => (
        images.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
                {images.map((image) => (
                    <button
                        key={image.name}
                        onClick={() => handleTextureLogoClick(image)}
                        className="relative focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg overflow-hidden group"
                        aria-label={`Select ${image.name}`}
                    >
                        <img
                            src={image.image}
                            alt={image.name}
                            className="rounded-lg w-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            {image.name}
                        </span>
                    </button>
                ))}
            </div>
        ) : (
            <div className="text-gray-500 text-sm text-center">
                No {category.toLowerCase()} available.
            </div>
        )
    );

    return (
        <div className="absolute left-full ml-4 bg-white shadow-lg rounded-lg p-4 w-80">
            {[
                { title: 'Textures', data: textures },
                { title: 'Front Logos', data: frontLogos },
                { title: 'Back Logos', data: backLogos },
            ].map(({ title, data }) => (
                <div key={title}>
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">{title}</h2>
                    <div className="flex flex-wrap overflow-y-auto h-40 border rounded-lg p-2">
                        {renderImages(data, title)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TextureLogoPicker;
