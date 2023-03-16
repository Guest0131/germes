// REST API axios
import axios from 'axios'
import dotenv from 'dotenv'


dotenv.config()

export const instance = axios.create({
    baseURL: process.env.REST_API_PARSER_IP || 'http://192.168.84.129:733/'
})





export default instance