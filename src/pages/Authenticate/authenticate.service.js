import axios from "axios";

export const register = async (formInputs) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_API}/register`, formInputs)
        return [result, null]
    } catch (error) {
        return [null, JSON.stringify(error)]
    }
}

export const login = async (formInputs) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_API}/login`, formInputs)
        return [result, null]
    } catch (error) {
        return [null, JSON.stringify(error)]
    }
}