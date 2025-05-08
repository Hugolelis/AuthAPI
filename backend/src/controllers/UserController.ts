// models
import { User } from "../models/User";
import { FastifyRequest, FastifyReply } from 'fastify'

// modules
import bcrypt from 'bcrypt'
import fastifyJwt from "@fastify/jwt";

// helpers

export class UserController {
    static async update(req: FastifyRequest , reply: FastifyReply) {

    }
    
    static async deleteUser(req: FastifyRequest , reply: FastifyReply) {

    }
}