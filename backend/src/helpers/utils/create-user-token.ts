// module
import { FastifyRequest, FastifyReply } from 'fastify'

// interfaces
import { UserCreate } from '../interfaces/UserCreate'

export const createUserToken = async(user: UserCreate, req: FastifyRequest, reply: FastifyReply) => {
    try {
        // create token
        const token = await reply.jwtSign({
            id: user._id,
            name: user.name,
            email: user.email,
            photo: user.photo
            
        })

        return token
    } catch(e) {
        reply.status(500).send({ status: 500, message: e, error: true })
    }
}