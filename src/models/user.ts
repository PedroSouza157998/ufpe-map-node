import { dbQuery, dbQueryFirst} from "../services/db"

export type Usuario = {
    nome: string;
    email: string;
    senha: string;
    id : number;
}

const insertUsuario = async (usuario: Usuario) => {
    await dbQuery(`INSERT INTO usuario (nome,email,senha) VALUES(?, ?, ?)`, [usuario.nome,usuario.email, usuario.senha])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'usuario'`);
    return getUsuario(retorno[0].id);
}

const updateUsuario = async (usuario: Usuario) => {
    await dbQuery(`UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?`, [usuario.nome,usuario.email, usuario.senha, usuario.id])
    return getUsuario(usuario.id);
}

const listUsuarios = async () => {
    const retorno = await dbQuery(`SELECT * FROM usuario`);
    return retorno as Usuario[];
}

const getUsuario = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM usuario WHERE id = ?`, [id]);
    return retorno as Usuario;
}

const getUsuarioByEmail = async (email: string) => {
    const retorno = await dbQueryFirst(`SELECT * FROM usuario WHERE email = ?`, [email]);
    return retorno as Usuario;
}

const deleteUsuario = async (id: number) => {
    await dbQueryFirst(`DELETE FROM usuario WHERE id = ?`, [id]);
}



export const usuarioModel ={
    insertUsuario,
    listUsuarios,
    getUsuario,
    deleteUsuario,
    updateUsuario,
    getUsuarioByEmail
}