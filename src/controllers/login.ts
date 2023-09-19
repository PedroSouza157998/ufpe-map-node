import { Request, Response } from "express";
import { Usuario, usuarioModel } from '../models/user';
import jwt from 'jsonwebtoken';

const dotenv = require('dotenv');
dotenv.config();
const senha = process.env.JWT_SECRET;

export async function login(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email) {
        response.status(404).json({ message: "Usuário não encontrado" });
        return;
    }

    const userWithEmail = await usuarioModel.getUsuarioByEmail(email)
    
    if (userWithEmail.senha !== password) {
        response.status(401).json({ message: "Email ou senha incorretos"});
        return;
    }

    const jwtToken = jwt.sign(
        { email: userWithEmail.email, id: userWithEmail.id },
        senha || 'process.env.JWT_SECRET',
    );

    response.status(200).json({auth:true, token: jwtToken });
}


