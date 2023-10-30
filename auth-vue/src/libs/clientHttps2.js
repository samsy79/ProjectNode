import axios from "axios";
export const clientHttp2 = axios.create({
baseURL : 'http://localhost:3005/',
headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}
})