// modules
import { FastifyInstance, FastifyPluginOptions } from "fastify";

// controller 
import { AdminController } from "../controllers/AdminController";

// middlewares
import { verifyToken } from "../middlewares/verify-token";
import { verifyAcessAdmin } from "../middlewares/verify-acess-admin";
import { verifyAcessRoot } from "../middlewares/verify-acess-root";

// router
export async function adminRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post('/giveAcessLevel', { preHandler: [verifyToken, verifyAcessRoot]  }, AdminController.giveAcessLevel)

    fastify.get('/findAdminUsers', { preHandler: [verifyToken, verifyAcessAdmin] }, AdminController.findAdminUsers)
    fastify.get('/findAllUsers', { preHandler: [verifyToken, verifyAcessAdmin] }, AdminController.findAllUsers)
}
