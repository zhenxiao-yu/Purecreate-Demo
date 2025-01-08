import generateImageRoute from './dalle.js';
import healthRoute from './health.js';
import miscRoute from './misc.js';

const routes = (app) => {
    app.use('/image', generateImageRoute);
    app.use('/health', healthRoute);
    app.use('/misc', miscRoute);
};

export default routes;
