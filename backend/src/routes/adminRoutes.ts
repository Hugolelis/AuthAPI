// modules
import { FastifyInstance, FastifyPluginOptions } from "fastify";

// controller 
import { AdminController } from "../controllers/AdminController";

// middlewares
import { verifyToken } from "../middlewares/verify-token";

// router
export async function adminRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post('/GiveAcessLevel', { preHandler: verifyToken }, AdminController.GiveAcessLevel)

    fastify.get('/viewAdminAccounts', { preHandler: verifyToken }, AdminController.viewAdminAccounts)
}
