// models
import { User } from "../models/User";

// modules
import bcrypt from 'bcrypt'
import { FastifyRequest, FastifyReply } from 'fastify'

// interfaces
import { UserRegisterForm } from "../helpers/interfaces/UserRegisterForm";
import { UserCreate } from "../helpers/interfaces/UserCreate";

// helpers
import { createUserToken } from "../helpers/utils/create-user-token";

export class AuthController {
    static async test(req: FastifyRequest, reply: FastifyReply ) {
        return reply.code(200).send([{ teste: 'Testando' }])
    }

    static async register(req: FastifyRequest, reply: FastifyReply ) {
        const { name, email, password, confirmPassword } = req.body as UserRegisterForm || { }

        // check datas
        if(!name || !email || !password || !confirmPassword) {
            return reply.code(400).send({ status: 400, message: 'Preencha todos os campos!', error: true })
        }

        // check password
        if(password != confirmPassword) {
            return reply.code(401).send({ status: 401, message: 'As senhas não coincidem!', error: true })
        }

        // check if user exist
        const userExist = await User.findOne({ email: email })

        if(userExist) {
            return reply.code(400).send({ status: 400, message: 'O email ja está cadastrado!', error: true })
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
            const newUser: UserCreate = await user.save()
            const token = await createUserToken(newUser, req, reply)
            reply.code(201).send({ status: 201, message: 'Registro feito com sucesso!', error: false, data: newUser, token })
            return
        } catch(e) {
            reply.code(500).send({ status: 500, message: e, error: true})
        }
    }

    static async login(req: FastifyRequest, reply: FastifyReply ) {
        
    }
}