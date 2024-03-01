import {Auth} from 'aws-amplify'

export const addInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        async config => {
            const token = (await Auth.currentSession()).getIdToken().getJwtToken();
            config.headers["Authorization"] = `Bearer ${token}`
            return config;
        },
        error => {
            Promise.reject(error).then(r => console.error(r))
        }
    )
}
