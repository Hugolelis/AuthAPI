// modules
import multer from 'fastify-multer'
import path from 'path'
import fs from 'fs';

export const imageUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie apenas jpg ou png!"))
        }
        cb(null, true)
    }
})  