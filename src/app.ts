import { Router } from 'express';
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import loginRoutes from './routes/login.routes'

const app = express();
var jsonParser = bodyParser.json()

const port = 3002;

const routes = Router();

app.use(jsonParser)

routes.use('/login', loginRoutes);

app.use(routes)
app.use(cors())
app.use(express.urlencoded());

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
