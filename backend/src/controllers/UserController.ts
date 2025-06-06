// models
import { User } from "../models/User";

// modules
import bcrypt from 'bcrypt'
import { FastifyRequest, FastifyReply } from 'fastify'
import path from 'path'
import fs from 'fs';

// interfaces
import { UserDeleteForm } from "../helpers/interfaces/UserDeleteForm";
import { UserUpadteForm } from "../helpers/interfaces/UserUpdateForm";

// helpers
import { getToken } from "../helpers/utils/get-token";
import { getUserByToken } from "../helpers/utils/get-user-by-token"
import { createUserToken } from "../helpers/utils/create-user-token";

export class UserController {
    static async update(req: FastifyRequest , reply: FastifyReply) {
        const { name, email, password, confirmPassword, newPassword } = req.body as UserUpadteForm || { }

        // check datas 
        if(!name || !email || !password || !confirmPassword) {
            return reply.code(400).send({ status: 400, message: 'Preencha todos os campos obrigatórios!', error: true })
        }

        // check user
        const user = await User.findOne({ email: email })

        if(!user) {
            return reply.code(400).send({ status: 400, message: 'O email não está cadastrado!', error: true })
        }

        // check password match
        const checkPassword = await bcrypt.compare(password, user.password)
        
        if(password != confirmPassword) {
            return reply.code(401).send({ status: 401, message: 'As senhas não coincidem!', error: true })
        }

        if(!checkPassword) {
            return reply.code(400).send({ status: 400, message: 'A senha está incorreta!', error: true })
        }

        // check token datas with user datas
        const token = getToken(req)
        const userTokenData = await getUserByToken(token, req, reply)
        
        if(userTokenData!.email != user.email) {
            return reply.code(401).send({ status: 401, message: 'Permissão negada!', error: true })
        }

        // apply put datas 
        if(password === confirmPassword && password != null && newPassword.length >= 1) {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(newPassword, salt)

            user.password = passwordHash
        }

        // save photo
        const file = (req as FastifyRequest & { file: Express.Multer.File }).file
        let photo = null

        console.log('consolado' + file)

        if(file && file.originalname) {
            const folder = 'users'
            const uploadPath = path.join('public', 'imgs', folder)

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true })
            }

            const filename = `${Date.now()}-${Math.floor(Math.random() * 100)}${path.extname(file.originalname)}`
            const filePath = path.join(uploadPath, filename)

            fs.writeFileSync(filePath, file.buffer)
            photo = filename
        }

        user.name = name
        user.photo = photo
        
        const newToken = await createUserToken(user, req, reply)

        try {
            // update user
            const updateUser = await User.findOneAndUpdate({ _id: user._id }, { $set: user }, { new: true })
            return reply.code(201).send({ status: 201, message: 'Atualização feita com sucesso!', error: false, data: updateUser, token: newToken })

        } catch(e) {
            reply.code(500).send({ status: 500, message: e, error: true})
        }
    }
    
    static async delete(req: FastifyRequest , reply: FastifyReply) {
        const { email, password, confirmPassword } = req.body as UserDeleteForm || { }

        // check datas
        if(!email || !password || !confirmPassword) {
            return reply.code(400).send({ status: 400, message: 'Preencha todos os campos!', error: true })
        }

        // check user
        const user = await User.findOne({ email: email })

        if(!user) {
            return reply.code(400).send({ status: 400, message: 'O email não está cadastrado!', error: true })
        }

        // check password match
        const checkPassword = await bcrypt.compare(password, user.password)

        if(password != confirmPassword) {
            return reply.code(401).send({ status: 401, message: 'As senhas não coincidem!', error: true })
        }

        if(!checkPassword) {
            return reply.code(400).send({ status: 400, message: 'A senha está incorreta!', error: true })
        }

        // check token datas with user datas
        const token = getToken(req)
        const userTokenData = await getUserByToken(token, req, reply)

        if(userTokenData!.email != user.email) {
            return reply.code(401).send({ status: 401, message: 'Permissão negada!', error: true })
        }

        try {
            await User.deleteOne({ _id: user._id })
            return reply.code(201).send({ status: 201, message: 'Conta excluida com sucesso!', error: false })
        } catch(e) {
            reply.code(500).send({ status: 500, message: e, error: true})
        }
    }
}