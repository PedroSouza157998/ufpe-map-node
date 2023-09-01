import { Router } from 'express';
import express, {Request, Response, NextFunction} from 'express';
//@ts-ignore
import cors from 'cors';
import bodyParser from 'body-parser';
// import { useRoutes } from './routes';
import { userRouter } from './routes/user';
import { localRouter } from './routes/local';
import { eventoRouter } from './routes/evento';
import loginRoutes from './routes/login.routes'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import {Secret} from './controllers/login'


export function verifyJWT(req: Request, res: Response, next: NextFunction){
  //  const secret = Secret()
   // const token = req.headers['x-acess-token'];
   // //@ts-ignore
    //jwt.verify(token, secret, (err: any , decoded: any) => {
    //  if(err) return res.status(401).end();
    //  //@ts-ignore
    //  if(decoded.userid) req.userId = decoded.userid
   // })
  console.log(req, req);
  next();
}


const app = express();
var jsonParser = bodyParser.json()

const port = 3002;

const routes = Router();

app.use(jsonParser)

// routes.use('/login', loginRoutes);

const apiRouter = Router();
routes.use('/user', userRouter);
routes.use('/local',localRouter);
routes.use('/evento',eventoRouter);

app.use('/api/v1', routes);
// app.use(routes)
app.use(cors())
app.use(express.urlencoded());
// dotenv.config();

// useRoutes(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
