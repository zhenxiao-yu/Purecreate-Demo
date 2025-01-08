export const corsConfig = (frontendUrl) => ({
    origin: frontendUrl,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
});

export const envCheck = (requiredVars) => {
    requiredVars.forEach((varName) => {
        if (!process.env[varName]) {
            console.error(`[ERROR] Missing required environment variable: ${varName}`);
            process.exit(1);
        }
    });
};
