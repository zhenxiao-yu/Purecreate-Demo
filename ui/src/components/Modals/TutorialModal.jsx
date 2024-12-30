import React from 'react';

const TutorialModal = () => {
    return (
        <div className="p-6 bg-white max-w-2xl mx-auto ">
            {/* Hero Image Placeholder */}
            <div className="mb-8">
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xl font-medium">
                    Image Placeholder
                </div>
            </div>

            {/* Introduction */}
            <div className="text-gray-800 space-y-4">
                <p className="text-lg font-medium leading-relaxed">
                    Ready to unleash your creativity? Purecreate Designer Studio empowers you to design custom apparel that reflects your unique style. Follow these simple steps to bring your ideas to life:
                </p>
            </div>

            {/* Steps Section */}
            <div className="mt-6 space-y-8">
                {[
                    {
                        number: 1,
                        title: "Choose Your Base",
                        description: "Select from our catalog of apparel, including t-shirts, hoodies, and more. This is your blank canvas for creativity.",
                    },
                    {
                        number: 2,
                        title: "Use the 3D Viewer",
                        description: "Interact with your design in real-time. Rotate, zoom, and inspect every detail from multiple angles.",
                    },
                    {
                        number: 3,
                        title: "Add Design Elements",
                        description: "Upload your own graphics, choose from pre-made designs, or add text with customizable fonts and colors.",
                    },
                    {
                        number: 4,
                        title: "Customize Colors & Textures",
                        description: "Choose from a wide range of colors, materials, and textures to make your design truly unique.",
                    },
                    {
                        number: 5,
                        title: "Save & Share",
                        description: "Save your masterpiece or share it with friends for feedback. You can also order your design directly.",
                    },
                ].map((step) => (
                    <div key={step.number} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-lg font-bold">
                            {step.number}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                {step.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorialModal;
