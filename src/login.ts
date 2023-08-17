import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import express, { Router } from 'express';

const router: Router = express.Router();
const app = express();

app.use(router);

router.post("/login", (req: NextApiRequest, res: any) => {
    const { email, password } = req.body;

    const userWithEmail = user.find((user) => user.email === email);
    if (!userWithEmail) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
    }

    if (userWithEmail.password !== password) {
        res.status(401).json({ message: "Email ou senha incorretos"});
        return;
    }

    const jwtToken = jwt.sign(
        { email: userWithEmail.email, id: userWithEmail.id },
        process.env.JWT_SECRET || ''
    );

    res.status(200).json({ token: jwtToken });
});

export default router;