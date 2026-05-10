export async function GET() {
  return Response.json({
    status: 'UP',
    message: 'API is running smoothly',
    timestamp: new Date().toISOString(),
  });
}
