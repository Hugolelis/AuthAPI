// .env
import 'dotenv/config';

// modules
import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';

// consts
const app: FastifyInstance = Fastify({ logger: false })
const PORT: number = process.env.PORT
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// configs
await app.register(cors)

await app.register(fastifyStatic, { root: path.join(__dirname, 'public'),  prefix: '/public/' })

// routes


// conn 
try {
    app.listen({port: PORT})
    console.log(`Server listening on port ${PORT}`)
} catch(e) {
    console.log(e)
}
