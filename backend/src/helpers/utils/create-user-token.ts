// module
import { FastifyRequest, FastifyReply } from 'fastify'
import { UserCreate } from '../interfaces/UserCreate'

export const createUserToken = async(user: UserCreate, req: FastifyRequest, reply: FastifyReply) => {
    try {
        // create token
        const token = await reply.jwtSign({
            name: user.name,
            id: user._id
        })

        return token
    } catch(e) {
        reply.status(500).send({ status: 500, message: e, error: true })
    }
}