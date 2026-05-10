import OpenAI from 'openai';

export const runtime = 'nodejs';
export const maxDuration = 60;

const ALLOWED_SIZES = ['256x256', '512x512', '1024x1024'];

function validate(prompt, size) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Invalid prompt: Prompt must be a non-empty string.');
  }
  if (prompt.length < 5 || prompt.length > 500) {
    throw new Error('Invalid prompt: Length must be between 5 and 500 characters.');
  }
  if (!ALLOWED_SIZES.includes(size)) {
    throw new Error(`Invalid size. Allowed values: ${ALLOWED_SIZES.join(', ')}`);
  }
}

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { success: false, error: 'OPENAI_API_KEY is not configured on the server.' },
        { status: 500 }
      );
    }

    const { prompt, size = '1024x1024' } = await req.json();
    validate(prompt, size);

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size,
    });

    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) throw new Error('Failed to retrieve the generated image URL.');

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error('Failed to fetch the image from OpenAI.');

    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64Image = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`;

    return Response.json({ success: true, base64Image });
  } catch (error) {
    console.error('[image] error:', error);
    const status = error.status || error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message || 'Internal Server Error';
    return Response.json({ success: false, error: message }, { status });
  }
}
