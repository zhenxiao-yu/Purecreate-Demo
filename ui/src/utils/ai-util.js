const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const handleSubmit = async (type, style, creativity, prompt, setGeneratingImg) => {
    try {
        setGeneratingImg(true); // Show loading indicator

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
            // Return the generated Base64 image
            return data.base64Image;
        } else {
            alert(`Error: ${data.error || "Failed to generate image"}`);
            return null;
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        return null;
    } finally {
        setGeneratingImg(false); // Hide loading indicator
    }
};


export const imageStyles = [
    { value: "default", label: "Default" },
    { value: "modern - Sleek, contemporary designs with minimalistic elements and clean lines.", label: "Modern" },
    { value: "classic - Timeless aesthetics inspired by traditional art and architectural forms.", label: "Classic" },
    { value: "abstract - Non-representational forms emphasizing shapes, colors, and textures.", label: "Abstract" },
    { value: "realism - Highly detailed, true-to-life depictions capturing reality.", label: "Realism" },
    { value: "impressionism - Soft, atmospheric visuals with vibrant colors and fleeting light.", label: "Impressionism" },
    { value: "surrealism - Dreamlike, fantastical compositions with unexpected juxtapositions.", label: "Surrealism" },
    { value: "cubism - Geometric and fragmented forms offering multiple perspectives.", label: "Cubism" },
    { value: "expressionism - Bold, dramatic designs emphasizing raw emotion and intensity.", label: "Expressionism" },
    { value: "minimalism - Simplistic designs focusing on essential elements and negative space.", label: "Minimalism" },
    { value: "fantasy - Magical and ethereal visuals inspired by mythical worlds and creatures.", label: "Fantasy" },
    { value: "futurism - Dynamic, high-tech aesthetics with sci-fi elements and neon accents.", label: "Futurism" },
    { value: "art_deco - Elegant, geometric patterns inspired by the 1920s, with a luxurious feel.", label: "Art Deco" },
    { value: "pop_art - Bold, colorful designs inspired by commercial and popular culture.", label: "Pop Art" },
    { value: "baroque - Ornate and dramatic compositions with rich textures and dynamic lighting.", label: "Baroque" },
    { value: "gothic - Dark, intricate designs with moody lighting and an eerie atmosphere.", label: "Gothic" },
    { value: "anime - Stylized, vibrant visuals with dynamic characters and expressive features.", label: "Anime" },
    { value: "retro - Nostalgic designs with muted tones and mid-20th-century aesthetics.", label: "Retro/Vintage" },
    { value: "watercolor - Soft, flowing colors with organic textures and delicate transitions.", label: "Watercolor" },
];


export const buttonTypes = [
    { type: "frontLogo", label: "Front", buttonStyle: "outline" },
    { type: "backLogo", label: "Back", buttonStyle: "outline" },
    { type: "texture", label: "Texture", buttonStyle: "filled" },
];
