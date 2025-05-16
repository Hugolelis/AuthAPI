// modules
import { FastifyRequest, FastifyReply } from "fastify";

// helpers
import { getToken } from "../helpers/utils/get-token";

export const verifyToken = async (req: FastifyRequest, reply: FastifyReply) => {
    if(!req.headers.authorization) return reply.code(401).send({ status: 401, message: 'Acesso negado!', error: true })

    const token = getToken(req)
    if(!token) return reply.code(401).send({ status: 401, message: 'Acesso negado!', error: true })

    try {
        const verified = await req.jwtVerify() as { id: string, name: string };
        req.user = verified
        
        return
    } catch(e) {
        reply.code(401).send({ status: 401, message: 'Token inválido!', error: true })
    }
}