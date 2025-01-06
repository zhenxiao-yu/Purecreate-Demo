// helpers.js

/**
 * Validate the requested image size.
 * @param {string} size - The requested size for the image.
 */
export function validateSize(size) {
    const allowedSizes = ['256x256', '512x512', '1024x1024'];
    if (!allowedSizes.includes(size)) {
        throw new Error(`Invalid size. Allowed values: ${allowedSizes.join(', ')}`);
    }
}

/**
 * Validate the input prompt.
 * @param {string} prompt - The prompt provided by the user.
 */
export function validatePrompt(prompt) {
    if (!prompt || typeof prompt !== 'string') {
        throw new Error('Invalid prompt: Prompt must be a non-empty string.');
    }
    if (prompt.length < 5 || prompt.length > 500) {
        throw new Error('Invalid prompt: Length must be between 5 and 500 characters.');
    }
}

