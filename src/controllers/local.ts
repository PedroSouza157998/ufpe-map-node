import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Local, localModel } from '../models/local';

const insertLocal = (req: Request, res: Response) => {
    {
        const local = req.body;
        if (!local)
            return badRequest(res, "Local inválido");

        if (!local.endereco)
            return badRequest(res, 'Informe o endereço');

        if (!local.coordenadax)
            return badRequest(res, 'Informe a coordenada');

        if (!local.coordenaday)
            return badRequest(res, 'Informe a coordenada 2');

    }

    const local = req.body as Local;
    return localModel.insertLocal(local)
        .then(local => {
            res.json(local);
        })
        .catch(err => internalServerError(res, err));
}


const updateLocal= async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const local = req.body;
        if (!local)
            return badRequest(res, "Endereço inválido");

        const localSaved = await localModel.getLocal(id);
        if(!localSaved)
            return notFound(res);
    }

    const local = req.body as Local;
    return localModel.updateLocal({...local, id})
        .then(local => {
            res.json(local)
        })
        .catch(err => internalServerError(res, err));
}


const listLocals = ({}: Request, res: Response) => {
    localModel.listLocals()
        .then(local => {
            res.json(local)
        })
        .catch(err => internalServerError(res, err));
}

const getLocal= (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return localModel.getLocal(id)
        .then((local) => {
            if(local)
                return res.json(local);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteLocal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const localSaved = await localModel.getLocal(id);
        if(!localSaved)
            return notFound(res);
    }

    return localModel.deleteLocal(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const localController = {
    insertLocal,
    listLocals,
    getLocal,
    deleteLocal,
    updateLocal
}
