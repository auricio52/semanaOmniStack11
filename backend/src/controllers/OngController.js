const connection = require('../database/connection')
//const crypto = require('crypto')
const generateUserId = require('../utils/generateUserId')

module.exports = {
    async index (request, response) { // Retorna a listagem de ongs
        const ongs = await connection('ongs').select('*')
    
        return response.json(ongs)
    },    

    async create(request, response) { // Cria e adiciona uma ong no BD
    //const params = request.query

    const id = generateUserId() // Gera um id aleatório para as ongs

    const { name, email, whatsapp, city, uf } = request.body
    //console.log(data)

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    })

    return response.json({ id }) // Envia o id da ong como resposta
    }
}