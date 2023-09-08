import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const dotenv = require('dotenv');
dotenv.config();
const senha = process.env.JWT_SECRET;

interface IUser {
    email: String;
    senha: String;
}

interface IUserId {
    userId: String;
}

export async function login(request: Request, response: Response) {
    const { email, password } = request.body;

    const userWithEmail = {email: 'teste@gmail', password: '123456', id: 2}// user.find((user) => user.email === email);
    if (!email) {
        response.status(404).json({ message: "Usuário não encontrado" });
        return;
    }

    if (userWithEmail.password !== password) {
        response.status(401).json({ message: "Email ou senha incorretos"});
        return;
    }

    const jwtToken = jwt.sign(
        { email: userWithEmail.email, id: userWithEmail.id },
        senha || 'process.env.JWT_SECRET',
    );

    response.status(200).json({auth:true, token: jwtToken });
}


