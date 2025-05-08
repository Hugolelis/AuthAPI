// models
import { User } from "../models/User";
import { FastifyRequest, FastifyReply } from 'fastify'

// modules
import bcrypt from 'bcrypt'
import fastifyJwt from "@fastify/jwt";

// helpers

export class AuthController {
    static async teste(req: FastifyRequest, reply: FastifyReply ) {
        return reply.status(200).send([{ teste: 'Testando' }])
    }

    static async login(req: FastifyRequest, reply: FastifyReply ) {
        return reply.status(200).send([{ teste: 'Testando' }])
    }

    static async register(req: FastifyRequest, reply: FastifyReply ) {
        return reply.status(200).send([{ teste: 'Testando' }])
    }
}