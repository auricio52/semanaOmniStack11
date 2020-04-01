const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')


describe('Sessions', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('Should be able to create a new session', async () => {
        const ong = {
            name: 'ONG',
            email: 'newong@gmail.com',
            whatsapp: '8591234212',
            city: 'Ceará',
            uf: 'CE'
        }

        const responseOngID = await request(app).post('/ongs').send(ong)

        const response = await request(app).post('/sessions').send({id: responseOngID.body.id})

        expect(response.body).not.toBe(null || undefined)
        expect(responseOngID.status).toBe(200)
        expect(responseOngID.body.id).toHaveLength(8)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('name')

    })
})