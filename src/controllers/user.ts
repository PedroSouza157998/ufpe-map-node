import {Request, Response} from 'express';

import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Usuario, usuarioModel } from '../models/user';

const insertUsuario = (req: Request, res: Response) =>{
    {
        const usuario = req.body;
        if (!usuario)
            return badRequest(res, "Produto inválido");

        if (!usuario.nome)
            return badRequest(res, 'Informe o seu nome');

        if (!usuario.email)
            return badRequest(res, 'Informe o seu email');

        if (!usuario.senha)
            return badRequest(res, 'Informe sua senha');
    }

    const usuario = req.body as Usuario;
    return usuarioModel.insertUsuario(usuario)
        .then(usuario => {
            res.json({
                usuario
        })
    })
    .catch(err => internalServerError(res,err))
}

const updateUsuario= async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const usuario = req.body;
        if (!usuario)
            return badRequest(res, "Produto inválido");

        if (!usuario.nome)
            return badRequest(res, 'Informe seu nome');

        if (!usuario.email)
            return badRequest(res, 'Informe seu email');

        if (!usuario.senha)
            return badRequest(res, 'Informe sua senha');

        const usuarioSalvo = await usuarioModel.getUsuario(id);
        if(!usuarioSalvo)
            return notFound(res);
    }

    const usuario = req.body as Usuario;
    return usuarioModel.updateUsuario({...usuario,id})
        .then(usuario => {
            res.json(usuario)
        })
        .catch(err => internalServerError(res, err));
}

const listUsuarios = ({}:Request, res: Response) =>{
    usuarioModel.listUsuarios()
    .then(user => {
        res.json(user)
    })
    .catch(err => internalServerError(res,err))
}

const getUsuario = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return usuarioModel.getUsuario(id)
        .then((usuario) => {
            if(usuario)
                return res.json(usuario);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}


const deleteUsuario = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    const usuarioSalvo = await usuarioModel.getUsuario(id);
    {
        if(!usuarioSalvo)
            return notFound(res);
    }
    

    return usuarioModel.deleteUsuario(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const usuarioController = {
    insertUsuario,
    listUsuarios,
    getUsuario,
    deleteUsuario,
    updateUsuario
}


