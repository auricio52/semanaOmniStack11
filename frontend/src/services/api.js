import axios from 'axios'; // O axios é um cliente HTTP que faz a comunicação entre o back-end e front-end

const api = axios.create ({
    baseURL: 'http://localhost:3333'
})

export default api;