// import axios from "axios";

// const instance = axios.create({
//     headers: {
//         'Authorization': JSON.parse(localStorage.getItem('token')),
//     },
// });

// console.log(instance, "this was created");

// export default instance;

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