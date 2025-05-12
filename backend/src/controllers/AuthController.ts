// models
import { User } from "../models/User";

// modules
import bcrypt from 'bcrypt'
import fastifyJwt from "@fastify/jwt";
import { FastifyRequest, FastifyReply } from 'fastify'

// interfaces
import { UserRegisterForm } from "../helpers/interfaces/UserRegisterForm";

// helpers

export class AuthController {
    static async test(req: FastifyRequest, reply: FastifyReply ) {
        return reply.code(200).send([{ teste: 'Testando' }])
    }

    static async register(req: FastifyRequest, reply: FastifyReply ) {
        const { name, email, password, confirmPassword } = req.body as UserRegisterForm || { }

        // check datas
        if(!name || !email || !password || !confirmPassword) {
            return reply.code(400).send({ message: 'Preencha todos os campos!', error: true })
        }

        // check password
        if(password != confirmPassword) {
            return reply.code(400).send({ message: 'As senhas não coincidem!', error: true })
        }

        // check if user exist
        const userExist = await User.findOne({ email: email })

        if(userExist) {
            return reply.code(400).send({ message: 'O email ja está cadastrado!', error: true })
        }

        // hash password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create user
        const user = new User({
            name,
            email,
            password: passwordHash,
            photo: null,
            acess: 'user'
        })

        try {
            const newUser = await user.save()
            reply.code(200).send({ message: 'Registro feito com sucesso!', error: false, data: user})
            return
        } catch(e) {
            reply.code(500).send({ message: e, error: true})
        }
    }

    static async login(req: FastifyRequest, reply: FastifyReply ) {
        
    }
}