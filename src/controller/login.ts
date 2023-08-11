interface IUser {
    email: String;
    senha: String;
}

interface IUserId {
    userId: String;
}

export async function createUser({email, senha}: IUser) {
    return { success: true, userId: '2' }
}

export function deleteUser({userId}: IUserId) {
    return { success: true, userId }
}