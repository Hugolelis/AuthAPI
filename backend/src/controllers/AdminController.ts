// models
import { User } from "../models/User";

// models
import { FastifyRequest, FastifyReply } from 'fastify'

// helpers
import { getToken } from "../helpers/utils/get-token";
import { getUserByToken } from "../helpers/utils/get-user-by-token";

export class AdminController {
    static async GiveAcessLevel(req: FastifyRequest, reply: FastifyReply) {
        reply.send({ test: "testando" })
    }

    static async viewAdminAccounts(req: FastifyRequest, reply: FastifyReply) {
        reply.send({ test: "testando" })
    }
}