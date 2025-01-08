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
    { value: "modern, sleek contemporary design with minimalistic elements and clean lines", label: "Modern" },
    { value: "classic, timeless aesthetics inspired by traditional art and architecture", label: "Classic" },
    { value: "abstract, bold non-representational forms emphasizing shapes, vibrant colors, and textures", label: "Abstract" },
    { value: "realism, highly detailed and true-to-life imagery with accurate lighting and textures", label: "Realism" },
    { value: "impressionism, soft visuals with vibrant colors, painterly textures, and fleeting light", label: "Impressionism" },
    { value: "surrealism, dreamlike fantastical imagery with unexpected juxtapositions and symbolic elements", label: "Surrealism" },
    { value: "cubism, geometric fragmented forms with multiple perspectives and sharp angles", label: "Cubism" },
    { value: "expressionism, bold dramatic imagery with raw emotion and exaggerated features", label: "Expressionism" },
    { value: "minimalism, simplistic designs with essential elements and an emphasis on negative space", label: "Minimalism" },
    { value: "fantasy, magical and ethereal visuals inspired by mythical worlds, creatures, and lore", label: "Fantasy" },
    { value: "futurism, dynamic high-tech aesthetics with sci-fi elements, metallics, and neon accents", label: "Futurism" },
    { value: "art deco, elegant geometric patterns with a luxurious feel inspired by the 1920s", label: "Art Deco" },
    { value: "pop art, bold colorful designs with strong contrasts inspired by commercial and popular culture", label: "Pop Art" },
    { value: "baroque, ornate and dramatic imagery with rich textures and dynamic lighting", label: "Baroque" },
    { value: "gothic, dark intricate designs with moody lighting and eerie atmospheric details", label: "Gothic" },
    { value: "anime, vibrant stylized visuals with dynamic characters and expressive features", label: "Anime" },
    { value: "retro, nostalgic visuals with muted tones and mid-20th-century aesthetics", label: "Retro/Vintage" },
    { value: "watercolor, soft flowing colors with organic textures and delicate gradient transitions", label: "Watercolor" },
    { value: "neoclassical, grand and detailed compositions inspired by ancient Greek and Roman art", label: "Neoclassical" },
    { value: "steampunk, imaginative visuals combining Victorian-era aesthetics with mechanical elements", label: "Steampunk" },
    { value: "cyberpunk, futuristic dystopian designs with neon lights, urban chaos, and cybernetic elements", label: "Cyberpunk" },
    { value: "pixel art, retro-inspired visuals with pixelated graphics and 8-bit style", label: "Pixel Art" },
    { value: "low poly, minimalist 3D designs with flat-shaded geometric shapes and clean lines", label: "Low Poly" },
    { value: "sketch, hand-drawn designs emphasizing pencil strokes and monochromatic shading", label: "Sketch" },
    { value: "oil painting, rich and textured visuals with visible brushstrokes and vivid colors", label: "Oil Painting" },
    { value: "pastel, soft and subtle visuals with a chalky texture and gentle color transitions", label: "Pastel" },
    { value: "comic book, bold outlines and vibrant colors with dramatic shading and action-focused elements", label: "Comic Book" },
    { value: "photorealism, ultra-detailed designs that mimic high-quality photography with precise lighting", label: "Photorealism" },
    { value: "graffiti, urban street art style with bold spray paint textures and vivid colors", label: "Graffiti" },
];


