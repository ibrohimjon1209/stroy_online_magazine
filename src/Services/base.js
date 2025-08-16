import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backkk.stroybazan1.uz/',
    headers: {
        "Content-Type": "application/json"
    }
})


export default instance