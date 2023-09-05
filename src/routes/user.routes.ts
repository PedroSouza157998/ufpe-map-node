import { Router } from 'express';
import { usuarioController} from '../controllers/user';

const userRouter = Router();
userRouter.get('/', usuarioController.listUsuarios);
userRouter.post('/', usuarioController.insertUsuario);
userRouter.get('/:id', usuarioController.getUsuario);
userRouter.put('/:id', usuarioController.updateUsuario);
userRouter.delete('/:id', usuarioController.deleteUsuario);

export { 
    userRouter,
}