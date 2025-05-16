// modules
import { FastifyRequest, FastifyReply } from "fastify";

// helpers
import { getToken } from "../helpers/utils/get-token";
import { getUserByToken } from "../helpers/utils/get-user-by-token";

export const verifyAcessRoot = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const token = getToken(req)
        const user = await getUserByToken(token, req, reply)

        if(user && user.acess === 'root') {
            return
        }

        reply.code(401).send({ status: 401, message: 'Acesso negado, área restrita apenas para o root!', error: true })

    } catch(e) {
        reply.code(401).send({ status: 401, message: e, error: true })
    }
}