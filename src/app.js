import Fastify from 'fastify';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRoutes from './routes/user-routes.js';
import projectRoutes from './routes/project-routes.js';

const fastify = new Fastify({ logger: true });

fastify.register(userRoutes, { prefix: "/api/users" });
fastify.register(projectRoutes, { prefix: "/api/projects" });

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.info("Connected to the database");

        await fastify.listen({ port: process.env.PORT || 5000, host: '0.0.0.0'});
        console.info('Listening on port ' + process.env.PORT);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

start();