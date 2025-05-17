// .env
import 'dotenv/config';

// modules
import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifyJwt from "@fastify/jwt";
import multipart from '@fastify/multipart';
import path from 'path';
import { fileURLToPath } from 'url';

// consts
const app: FastifyInstance = fastify({ 
    logger: {
        transport: {
            target: 'pino-pretty'
        }
    }
})

const PORT = process.env.PORT
const HOST = process.env.HOST

// file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, 'public');
console.log('path', publicPath)

// configs
await app.register(cors)

await app.register(fastifyStatic, { root: publicPath, prefix: '/public/' })

app.register(fastifyJwt, { secret: process.env.SECRET })

app.register(multipart);

// routes
import { authRoutes } from './routes/authRoutes';
app.register(authRoutes, { prefix: '/api/auth'})

import { userRoutes } from './routes/userRoutes';
app.register(userRoutes, { prefix: '/api/user' })

import { adminRoutes } from './routes/adminRoutes';
app.register(adminRoutes, { prefix: '/api/admin/' })

// conn 
import { main } from './connection/mongo';
main().catch(e => console.log(e))

try {
    app.listen({host: HOST, port: PORT})
} catch(e) {
    app.log.error(e)
}
