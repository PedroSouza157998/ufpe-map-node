import { dbQuery, dbQueryFirst } from "../services/db";

export type Local = {
    id: number;
    endereco: string;
}

const insertLocal = async (local: Local) => {
    await dbQuery(`INSERT INTO local (endereco) VALUES(?)`, [local.endereco])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'local'`);
    return getLocal(retorno[0].id);
}

const updateLocal = async (local: Local) => {
    await dbQuery(`UPDATE local SET endereco = ? WHERE id = ?`, [local.endereco, local.id])
    return getLocal(local.id);
}

const listLocals = async () => {
    const retorno = await dbQuery(`SELECT * FROM local`);
    return retorno as Local[];
}

const getLocal= async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM local WHERE id = ?`, [id]);
    return retorno as Local;
}

const deleteLocal = async (id: number) => {
    await dbQueryFirst(`DELETE FROM local WHERE id = ?`, [id]);
}

export const localModel ={
    insertLocal,
    listLocals,
    getLocal,
    deleteLocal,
    updateLocal
}