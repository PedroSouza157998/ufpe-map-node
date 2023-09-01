import { Router } from 'express';
import { eventoController} from '../controllers/evento';
import express, {Request, Response, NextFunction} from 'express';
import { verifyJWT } from '../app'

const eventoRouter = Router();
eventoRouter.use(function(req: Request, res: Response, next: NextFunction) {
    console.log(req.method, req.url);
    next();
  })
eventoRouter.get('/', eventoController.listEventos);
eventoRouter.post('/', eventoController.insertEvento);
eventoRouter.get('/:id', eventoController.getEvento);
eventoRouter.put('/:id', eventoController.updateEvento);
eventoRouter.delete('/:id', eventoController.deleteEvento);

export { 
    eventoRouter
}