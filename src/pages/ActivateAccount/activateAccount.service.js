import axios from "axios";

export const verify = async (token) => {
    try {
        const response = await axios.post(process.env.REACT_APP_API + "/profile/verify", { token });
        return [response, null];
    } catch (error) {
        return [null, error];
    }
}