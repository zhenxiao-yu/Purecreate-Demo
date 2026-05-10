export async function GET() {
  return Response.json({
    serviceName: 'Image Generation API',
    version: '1.0.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    serverTime: new Date().toISOString(),
    availableEndpoints: [
      { method: 'POST', path: '/api/image', description: 'Generate an image from a prompt' },
      { method: 'GET', path: '/api/health', description: 'Check API health' },
      { method: 'GET', path: '/api/misc', description: 'Get metadata and diagnostics' },
    ],
  });
}
