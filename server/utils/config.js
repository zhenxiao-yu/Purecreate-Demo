
// give frontend url cross origin permission to access server
export const corsConfig = (frontendUrl) => ({
    origin: frontendUrl,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
});

//check environment variables configuration + report missing vars
export const envCheck = (requiredVars) => {
    requiredVars.forEach((varName) => {
        if (!process.env[varName]) {
            console.error(`[ERROR] Missing required environment variable: ${varName}`);
            process.exit(1);
        }
    });
};
