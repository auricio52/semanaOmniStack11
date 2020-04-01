const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        //.set('Authorization', 'id da ong') Para usar os headers
        .send({
            name: "APAD",
            email: "contato@gmail.com",
            whatsapp: "8591301932",
            city: "São Paulo",
            uf: "SP" 
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })

    it('Should be able to list all ONGs', async () => {
        const ong = {
            name: "APAD",
            email: "contato@gmail.com",
            whatsapp: "8591301932",
            city: "São Paulo",
            uf: "SP" 
        }

        const responseOngID = await request(app).post('/ongs').send(ong)
        
        const response = await request(app).get('/ongs')

        expect(responseOngID.status).toBe(200)
        expect(responseOngID.body.id).toHaveLength(8)

        expect(response.status).toBe(200)
        expect(response.body).toMatchObject([ong])
    })

    // it('incidentes', async () => {
    //     const ONG = {
    //         name: "APAD",
    //         email: "contato@gmail.com",
    //         whatsapp: "8591301932",
    //         city: "São Paulo",
    //         uf: "SP" 
    //     }

    //     const ongID = request(app).post('/ongs').send(ONG)

    //     const response = await request(app).post('/incidents').set({'Authorization': idONG}).send({
    //         title: "cahorrinha ferida",
    //         description: "necessario cirurgia",
    //         value: 123
    //     })

    //     console.log(`Incidents ${response.body.id}, id=${idONG}`)
    // })

    // it('should be able to name profile', async () => {
    //     const response = await request(app).get('/profile')
    //     .set({'Authorization': idONG})

    //     console.log(`Profile ${response.body[0]}, id=${idONG}`)
    // })
})