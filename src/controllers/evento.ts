import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Evento, eventoModel } from '../models/evento';

const insertEvento = (req: Request, res: Response) => {

    {
        const evento = req.body;
        if (!evento)
            return badRequest(res, "evento inválido");

        if (!evento.titulo)
            return badRequest(res, 'Informe o titulo do evento');

        if (!evento.descricao)
            return badRequest(res, 'Informe a descrição do evento');
    
    }

    const evento = req.body as Evento;
    return eventoModel.insertEvento(evento)
        .then(evento => {
            res.json(evento);
        })
        .catch(err => internalServerError(res, err));
}


const updateEvento = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const evento = req.body;
        if (!evento)
            return badRequest(res, "Evento inválido");

        if (!evento.titulo)
            return badRequest(res, 'Informe o título do evento');

        if (!evento.descricao)
            return badRequest(res, 'Informe a descrição do evento');

        const eventoSaved = await eventoModel.getEvento(id);
        if(!eventoSaved)
            return notFound(res);
    }

    const evento = req.body as Evento;
    return eventoModel.updateEvento({...evento, id})
        .then(evento => {
            res.json(evento)
        })
        .catch(err => internalServerError(res, err));
}


const listEventos = ({}: Request, res: Response) => {
    eventoModel.listEventos()
        .then(evento => {
            res.json(evento)
        })
        .catch(err => internalServerError(res, err));
}

const getEvento = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return eventoModel.getEvento(id)
        .then((evento) => {
            if(evento)
                return res.json(evento);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteEvento = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const productSaved = await eventoModel.getEvento(id);
        if(!productSaved)
            return notFound(res);
    }

    return eventoModel.deleteEvento(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const eventoController = {
    insertEvento,
    listEventos,
    getEvento,
    deleteEvento,
    updateEvento
}