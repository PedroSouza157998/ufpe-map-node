import { expect, test } from '@jest/globals';
import { createUser, deleteUser } from '../src/controller/login'

describe('test create new users', () => {
    let userId = '';

    test('create user', async () => {
        await createUser({
            email: 'pedro@gmail.com',
            senha: '123456'
        }).then((response) => {
            expect(response.success).toBeTruthy()
            userId = response.userId
        })
        
    });

    test('try create a user with the same email', async () => {
        const response = await createUser({
            email: 'pedro@gmail.com',
            senha: '12345689'
        })

        expect(response.success).toBeFalsy()
    });

    test('create user without password', async () => {
        //@ts-ignore
        const response = await createUser({
            email: 'pedro@gmail.com'
        })

        expect(response.success).toBeFalsy()
    });

    test('create user without email', async () => {
        //@ts-ignore
        const response = await createUser({
            senha: '123456'
        })

        expect(response.success).toBeFalsy()
    });

    test('delete user by ID', async () => {
        const response = await deleteUser({
            userId: '2'
        })

        expect(response.userId).toEqual(userId)
        expect(response.success).toBeTruthy()
    });
})