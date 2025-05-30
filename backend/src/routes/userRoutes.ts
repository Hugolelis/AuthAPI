// modules
import { FastifyInstance, FastifyPluginOptions } from "fastify";

// controller 
import { UserController } from "../controllers/UserController";

// middlewares
import { verifyToken } from "../middlewares/verify-token";
import { imageUpload } from "../middlewares/image-upload";

// router
export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.put('/update', { preHandler: [verifyToken, imageUpload.single("photo")] }, UserController.update)

    fastify.delete('/delete', { preHandler: verifyToken }, UserController.delete)
}
