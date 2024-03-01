import axios from 'axios'
import {addInterceptor} from "./addInterceptor";

const apiBase = axios.create({
    baseURL:  `/api/v1/users`
})

addInterceptor(apiBase)

export const UserApi = {
    list: () => {
        return apiBase.get('');
    },
    
    create: (user) => {
        return apiBase.post('', user)
    }
};