// modules
import { FastifyRequest, FastifyReply } from 'fastify'

// models
import { User } from '../../models/User'

export const getUserByToken = async(token: string, req: FastifyRequest, reply: FastifyReply) => {
    if(!token) return reply.code(401).send({ status: 401, message: 'Acesso negado!', error: true })
    
    const decoded = await req.jwtVerify()  as { id: string, name: string };

    const userID = decoded.id

    const user = await User.findById(userID)

    return user
} 