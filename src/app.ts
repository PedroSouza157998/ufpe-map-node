import { Router } from 'express';
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
// import { useRoutes } from './routes';
import { userRouter } from './routes/user.routes';
import { localRouter } from './routes/local.routes';
import { eventoRouter } from './routes/evento.routes';
import loginRoutes from './routes/login.routes'

const app = express();
var jsonParser = bodyParser.json()

const port = 3002;

const routes = Router();

app.use(jsonParser)

routes.use('/login', loginRoutes);
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
