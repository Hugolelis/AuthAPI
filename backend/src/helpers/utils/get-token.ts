// modules
import { FastifyRequest } from 'fastify'

export const getToken = (req: FastifyRequest)  => {
    const authHeader = req.headers.authorization
    const token = authHeader!.split(" ")[1]

    return token
}