import express, { Request, Response } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const dotenv = require('dotenv');
dotenv.config();
const senha = process.env.JWT_SECRET || 'senhasecreta';

const verifyJWT = (req: Request, res: Response, next: any) => {
    const bearer = req.headers.authorization || '';
    const token = bearer.replace('Bearer', '').trim();
    jwt.verify(token, senha , (err, decoded) => {
        if (err) return res.send("Error: Invalid Token").status(401);
        //@ts-ignore
        req.id = decoded.id;
        next();
})}
export default verifyJWT;