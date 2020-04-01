// Métodos das rotas da aplicação

const connection = require('../database/connection')

module.exports = {
    async index(request, response) { // Retorna a listagem de casos(incidentes por ong)
        const ong_id = request.headers.authorization

        const incidents = await connection('incidents').where('ong_id', ong_id).select('*')

        // console.log(`page profile ${incidents[0].title}`)
    
        return response.json(incidents)
    }
}