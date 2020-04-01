const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('profile', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('Should be able to list all incidents of ong', async () => {
        const ong1 = {
            name: 'AEG',
            email: 'aeg@gmail.com',
            whatsapp: '1382374950',
            city: 'São Paulo',
            uf: 'SP'
        }

        const ong2 = {
            name: 'APAD',
            email: 'apad@gmail.com',
            whatsapp: '8593323421',
            city: 'Ceará',
            uf: 'CE'
        }

        const incident1 = {
            title: 'Cadelinha atropelada',
            description: 'Uma cadelinha atropelada e necessita de cirurgia',
            value: 190.0
        }

        const incident2 = {
            title: 'Cadelinha doente',
            description: 'Uma cadelinha que necessita de remédios',
            value: 120.0
        }

        const incident3 = {
            title: 'Gato precisando de tratamento',
            description: 'Um gato precisando de tratamento porque está doente',
            value: 100.0
        }

        const responseOngID1 = await request(app).post('/ongs').send(ong1)
        const responseOngID2 = await request(app).post('/ongs').send(ong2)

        const responseIncident1 = await request(app).post('/incidents').set('Authorization', responseOngID1.body.id).send(incident1)        
        const responseIncident2 = await request(app).post('/incidents').set('Authorization', responseOngID2.body.id).send(incident2)
        const responseIncident3 = await request(app).post('/incidents').set('Authorization', responseOngID1.body.id).send(incident3)

        const response = await request(app).get('/profile').set('Authorization', responseOngID1.body.id)

        expect(response.status).toBe(200)
        expect(response.body[0]).toHaveProperty('ong_id')
        expect(response.body[0].ong_id).toBe(responseOngID1.body.id)
    })
})