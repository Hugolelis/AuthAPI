// models
import { User } from "../models/User";

// modules
import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt'

// interfaces
import { RootGiveAcessForm } from "../helpers/interfaces/RootGiveAcessForm";

export class AdminController {
    static async giveAcessLevel(req: FastifyRequest, reply: FastifyReply) {
        const { emailUser, acessUser, passwordRoot, confirmPasswordRoot} = req.body as RootGiveAcessForm || { }
        
        // check datas
        if(!emailUser || !acessUser || !passwordRoot || !confirmPasswordRoot) {
            return reply.code(400).send({ status: 400, message: 'Preencha todos os campos!', error: true })
        }

        if(acessUser === 'root') {
            return reply.code(400).send({ status: 400, message: 'Apenas é possivel um usuário root no sistema, em caso de mudança solicite o suporte!', error: true })
        }

        // check password match
        const root = await User.findOne({ acess: 'root' })

        if(passwordRoot !== confirmPasswordRoot) {
            return reply.code(401).send({ status: 401, message: 'As senhas não coincidem!', error: true })
        }

        const checkPassword = await bcrypt.compare(passwordRoot, root!.password)

        if(!checkPassword) {
            return reply.code(400).send({ status: 400, message: 'A senha do root está incorreta!', error: true })
        }

        // get user
        const user = await User.findOne({ email: emailUser })

        if(!user) {
            return reply.code(400).send({ status: 400, message: 'Esse email não está cadastrado!', error: true })
        }

        user.acess = acessUser

        try {
            const updateUser = await User.findOneAndUpdate({ _id: user._id }, { $set: user }, { new: true })
            return reply.code(201).send({ status: 201, message: 'Atualização feita com sucesso!', error: false, data: updateUser })

        } catch(e) {
            reply.code(500).send({ status: 500, message: e, error: true})
        }
    }

    static async findAdminUsers(req: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await User.find({ acess: { $in: ['admin', 'root'] } })
            return reply.code(200).send([{ status: 200, message: 'Trazendo todos usuários com acesso admin e root no banco!', error: false, data: users }])
        } catch(e) {
            reply.status(500).send({ status: 500, message: e, error: true })
        }
    }

    static async findAllUsers(req: FastifyRequest, reply: FastifyReply ) {
        try {
            const users = await User.find().select('-password')
            return reply.code(200).send([{ status: 200, message: 'Trazendo todos usuários cadastrados no banco!', error: false, data: users }])
        } catch(e) {
            reply.status(500).send({ status: 500, message: e, error: true })
        }
    }
}