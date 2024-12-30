import React from 'react';

const TutorialModal = () => {
    return (
        <div className="p-3 bg-white max-w-lg mx-auto">

            {/* Hero Image Placeholder */}
            <div className="m-6">
                <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    <span>Image Placeholder</span>
                </div>
            </div>

            {/* Introduction */}
            <div className="text-gray-700 space-y-4">
                <p className="text-lg leading-relaxed">
                    Ready to unleash your creativity? Purecreate Designer Studio empowers you to design custom apparel that reflects your unique style. Follow these simple steps to bring your ideas to life:
                </p>
            </div>

            {/* Steps Section */}
            <div className="space-y-6">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <span>1</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Choose Your Base</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Select from our catalog of apparel, including t-shirts, hoodies, and more. This is your blank canvas for creativity.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <span>2</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Use the 3D Viewer</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Interact with your design in real-time. Rotate, zoom, and inspect every detail from multiple angles.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <span>3</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Add Design Elements</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Upload your own graphics, choose from pre-made designs, or add text with customizable fonts and colors.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <span>4</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Customize Colors & Textures</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Choose from a wide range of colors, materials, and textures to make your design truly unique.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <span>5</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Save & Share</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Save your masterpiece or share it with friends for feedback. You can also order your design directly.
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default TutorialModal;