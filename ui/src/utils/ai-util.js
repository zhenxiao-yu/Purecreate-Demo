const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const handleSubmit = async (type, style, creativity, prompt, handleDecals, setGeneratingImg) => {
    try {
        const response = await fetch(`${BASE_URL}/image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: `${style} style, creativity level ${creativity}: ${prompt}`,
                size: "1024x1024",
            }),
        });

        const data = await response.json();
        if (data.success) {
            handleDecals(type, data.imageUrl);
        } else {
            alert(`Error: ${data.error || "Failed to generate image"}`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    } finally {
        setGeneratingImg(false);
    }
};
