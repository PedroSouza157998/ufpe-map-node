import { Router } from 'express';
import { eventoController} from '../controllers/evento';

const eventoRouter = Router();
eventoRouter.get('/', eventoController.listEventos);
eventoRouter.post('/', eventoController.insertEvento);
eventoRouter.get('/:id', eventoController.getEvento);
eventoRouter.put('/:id', eventoController.updateEvento);
eventoRouter.delete('/:id', eventoController.deleteEvento);

export { 
    eventoRouter,
}