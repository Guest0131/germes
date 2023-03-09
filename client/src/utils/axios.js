import axios from 'axios'


// Server axios
const instance = axios.create({
    baseURL: 'http://localhost:3002/api',
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})


// REST API axios
export const restInstance = axios.create({
    baseURL: 'http://192.168.84.129:733/'
})
restInstance.interceptors.request.use((config) => {
    config.headers.accept = "application/json"
    config.headers["Content-Type"] = "application/json"
    config.headers["Access-Control-Allow-Origin"] = "*"
    config.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"

    return config
})


export default instance