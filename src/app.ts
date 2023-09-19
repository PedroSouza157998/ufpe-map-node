import { Router } from 'express';
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
// import { useRoutes } from './routes';
import { userRouter } from './routes/user.routes';
import { eventoRouter } from './routes/evento.routes';
import loginRoutes from './routes/login.routes'

const port = 3002;

const app = express();

const routes = Router();
app.use(cors())
const jsonParser = bodyParser.json()

app.use(jsonParser)

routes.use('/login', loginRoutes);
routes.use('/user', userRouter);
routes.use('/evento',eventoRouter);

app.use('/api/v1', routes);
app.use(express.urlencoded());

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
