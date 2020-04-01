const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('Incidents', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })
    
    afterAll(async () => {
        await connection.destroy()
    })

    it('Sould be able to create a new incident', async () => {
        const ong = {
            name: 'AAG',
            email: 'aag@gmail.com',
            whatsapp: '1182374950',
            city: 'Ceará',
            uf: 'CE'
        }

        const incident = {
            title: 'Cadelinha atropelada',
            description: 'Uma cadelinha atropelada e necessita de cirurgia',
            value: 190.0
        }

        const responseOngID = await request(app).post('/ongs').send(ong)

        const response = await request(app).post('/incidents').set('Authorization', responseOngID.body.id).send(incident)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).not.toBe(undefined || null)
    })

    it('Should be able to list all the incidents', async () => {
        const ong = {
            name: 'AAG',
            email: 'aag@gmail.com',
            whatsapp: '1182374950',
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

        const responseOngID = await request(app).post('/ongs').send(ong)

        const responseIncident1 = await request(app).post('/incidents').set('Authorization', responseOngID.body.id).send(incident1)        
        const responseIncident2 = await request(app).post('/incidents').set('Authorization', responseOngID.body.id).send(incident2)

        const response = await request(app).get('/incidents')

        expect(response.status).toBe(200)
    })

    it('Should be able to delete a incident', async () => {
        const ong = {
            name: ' AEG',
            email: 'aeg@gmail.com',
            whatsapp: '1382374950',
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

        const responseOngID = await request(app).post('/ongs').send(ong)

        const responseIncident1 = await request(app).post('/incidents').set('Authorization', responseOngID.body.id).send(incident1)        
        const responseIncident2 = await request(app).post('/incidents').set('Authorization', responseOngID.body.id).send(incident2)

        const response = await request(app).delete(`/incidents/${responseIncident1.body.id}`).set('Authorization', responseOngID.body.id)

        expect(response.status).toBe(204)
    })

})