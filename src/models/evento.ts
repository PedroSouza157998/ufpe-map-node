
import { dbQuery, dbQueryFirst} from "../services/db"

export type Evento = {
    id: number;
    titulo:string;
    descricao: string;
    data: string;
    local: string;
    coordenada: any;
}


const insertEvento = async (evento: Evento) => {
    const {lat, lng} = evento.coordenada
    await dbQuery(`INSERT INTO evento (titulo,descricao,data,local,lat,lng ) VALUES(?, ?, ?, ?, ?, ?)`, [evento.titulo,evento.descricao, evento.data, evento.local,lat, lng ])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'evento'`);
    return getEvento(retorno[0].id);
}

const updateEvento = async (evento: Evento) => {
    console.log(evento)
    await dbQuery(`UPDATE evento SET titulo = ?, descricao = ?, data = ?, local = ?, coordenada = ? WHERE id = ?`, [evento.titulo,evento.descricao,evento.data,evento.id,evento.local,evento.coordenada])
    return getEvento(evento.id);
}

const listEventos = async () => {
    const retorno = await dbQuery(`SELECT * FROM evento`);
    return retorno as Evento[];
}

const getEvento = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM evento WHERE id = ?`, [id]);
    return retorno as Evento;
}

const deleteEvento = async (id: number) => {
    await dbQueryFirst(`DELETE FROM evento WHERE id = ?`, [id]);
}



export const eventoModel ={
    insertEvento,
    listEventos,
    getEvento,
    deleteEvento,
    updateEvento
}
