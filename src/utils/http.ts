import axios from 'axios'
//Axios é uma biblioteca de requisições. Facilita muito ao invés de usar fetch
const http = axios.create({
    baseURL: 'http://localhost:3024',
    headers: {
        authorization: 'Bearer 123'
    }
})

export default http