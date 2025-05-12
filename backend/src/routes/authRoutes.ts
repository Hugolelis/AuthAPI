// modules
import { FastifyInstance, FastifyPluginOptions } from "fastify";

// controller 
import { AuthController } from "../controllers/AuthController";

// router
export async function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/test', AuthController.test)

    fastify.post('/login', AuthController.login)
    fastify.post('/register', AuthController.register)
}
