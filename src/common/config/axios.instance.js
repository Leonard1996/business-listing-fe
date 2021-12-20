import axios from "axios"
const axiosApiInstance = axios.create();


axiosApiInstance.interceptors.request.use(
    async (config) => {
        config.headers = {
            Authorization: JSON.parse(localStorage.getItem("token")),
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosApiInstance;