import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate that the API key is available
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error('OpenAI API key is missing. Set it in the .env file.');
}

// Initialize OpenAI with API key
const openai = new OpenAI({ apiKey });

// Function to validate size
function validateSize(size) {
    const allowedSizes = ['256x256', '512x512', '1024x1024'];
    if (!allowedSizes.includes(size)) {
        throw new Error(`Invalid size. Allowed values: ${allowedSizes.join(', ')}`);
    }
}

// Function to generate an image using OpenAI's DALL·E model
async function generateImage(prompt, size = '1024x1024') {
    try {
        if (!prompt) {
            throw new Error('Prompt is required to generate an image.');
        }

        validateSize(size);

        console.log(`Generating image for prompt: "${prompt}" with size: ${size}`);

        // Call OpenAI API to generate the image
        const response = await openai.images.generate({
            prompt,
            n: 1, // Number of images to generate
            size, // Supported sizes
        });

        const imageUrl = response.data[0].url;

        console.log('Image successfully generated:', imageUrl);
        return imageUrl;
    } catch (error) {
        if (error.response) {
            console.error('OpenAI API Error:', error.response.data);
            throw new Error(
                `Failed to generate image: ${error.response.data.error.message}`
            );
        } else {
            console.error('Unexpected Error:', error.message);
            throw new Error('An unexpected error occurred while generating the image.');
        }
    }
}

// Example usage
(async () => {
    try {
        const prompt = 'A futuristic cityscape with flying cars at sunset';
        const size = '1024x1024';

        const imageUrl = await generateImage(prompt, size);
        console.log('Generated Image URL:', imageUrl);
    } catch (error) {
        console.error('Error in image generation process:', error.message);
    }
})();
