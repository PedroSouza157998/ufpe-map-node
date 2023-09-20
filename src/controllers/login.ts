import { Request, Response } from "express";
import { Usuario, usuarioModel } from '../models/user';
import jwt from 'jsonwebtoken';

// const dotenv = require('dotenv');
// dotenv.config();
const senha = process.env.JWT_SECRET;

export async function login(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email) {
        return response.status(404).json({ message: "Usuário não encontrado" });
    }

    const userWithEmail = await usuarioModel.getUsuarioByEmail(email)
    if(!userWithEmail) return response.status(401).json({ message: "Email ou senha incorretos"});
    console.log(!userWithEmail)
    if (userWithEmail.senha !== password) {
        return response.status(401).json({ message: "Email ou senha incorretos"});
    }

    const jwtToken = jwt.sign(
        { email: userWithEmail.email, id1: userWithEmail.id },
        senha || 'process.env.JWT_SECRET',
    );

    return response.status(200).json({auth:true, token: jwtToken });
}


