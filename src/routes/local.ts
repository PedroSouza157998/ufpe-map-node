import { Router } from 'express';
import { localController} from '../controllers/local';

const localRouter = Router();
localRouter.get('/', localController.listLocals);
localRouter.post('/', localController.insertLocal);
localRouter.get('/:id', localController.getLocal);
localRouter.put('/:id', localController.updateLocal);
localRouter.delete('/:id', localController.deleteLocal);

export { 
    localRouter,
}