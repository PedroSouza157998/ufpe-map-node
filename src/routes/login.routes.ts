import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { login } from '../controllers/login';

const router = Router();

router.post('/', login)
// router.post("/", (req, res) => {
//     // console.log(req.body)
//     // const { email, password } = req.body;

//     console.log(req.body)

//     const userWithEmail = {email: 'teste@gmail', password: '123456', id: 2}// user.find((user) => user.email === email);
//     // if (!userWithEmail) {
//     //     res.status(404).json({ message: "Usuário não encontrado" });
//     //     return;
//     // }

//     // if (userWithEmail.password !== password) {
//     //     res.status(401).json({ message: "Email ou senha incorretos"});
//     //     return;
//     // }

//     // const jwtToken = jwt.sign(
//     //     { email: userWithEmail.email, id: userWithEmail.id },
//     //     process.env.JWT_SECRET || ''
//     // );

//     res.json({ token: 'AAA' });
// });

export default router