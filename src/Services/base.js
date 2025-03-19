import axios from "axios";

const instance = axios.create({
    baseURL: 'https://back.stroybazan1.uz/api',
    headers: {
        "Content-Type": "application/json"
    }
})


export default instance