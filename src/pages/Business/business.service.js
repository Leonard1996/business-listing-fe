import axiosApiInstance from "../../common/config/axios.instance";

export const getBusiness = async (id) => {
    try {
        const business = await axiosApiInstance.get(process.env.REACT_APP_API + "/businesses/" + id);
        return [business, null];
    } catch (error) {
        return [null, JSON.stringify(error)];
    }
};

export const insertMessage = async (id, data) => {
    try {
        const message = await axiosApiInstance.post(process.env.REACT_APP_API + `/businesses/${id}/messages`, data);
        return [message, null];
    } catch (error) {
        return [null, JSON.stringify(error)];
    }
};

export const getSimilarBusiness = async (industry, id) => {
    try {
        const business = await axiosApiInstance.get(process.env.REACT_APP_API + "/similar-businesses?industry=" + industry + "&self=" + id);
        return [business, null];
    } catch (error) {
        return [null, JSON.stringify(error)];
    }
};

export const getMyBusiness = async (id) => {
    try {
        const business = await axiosApiInstance.get(process.env.REACT_APP_API + "/my-businesses/" + id);
        return [business, null];
    } catch (error) {
        return [null, JSON.stringify(error)];
    }
};