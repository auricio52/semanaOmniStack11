// Métodos das rotas da aplicação

const connection = require('../database/connection') // Conexão com o BD

module.exports = {
    async index(request, response) { 
        const { page = 1 } = request.query // Busca qual página da listagem o usuário está
    
        const [ count ] = await connection('incidents') // Conta a quantidade de dados no BD
        .count()

        const incidents = await connection('incidents') // Busca nome, email, whatsapp, cidade, estado e id do incidente no BD
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 
        'ongs.name',
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
        ])

        response.header('X-Total-Count', count['count(*)']) // Coloca a quantidade de dados salvos no BD no cabeçalho da web

        return response.json(incidents) // Retorna todos os dados de cada incidente
    },

    async create(request, response) { // Adiciona os dados do incidente no BD
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization // Traz informações docabeçalho, como autenticação(id), idioma etc

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({ id }) // Retorna o id do caso(incidente)    
    },
    
    async delete(request, response) { // Apaga os dados do caso(incidente) no BD
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first()

        if(incident.ong_id != ong_id) { // Se não for a ong que criou o caso retorne um erro
            return response.status(401).json({ error: 'Operation not permitted.' })
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send()
    }
}

