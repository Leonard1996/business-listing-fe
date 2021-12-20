import axiosApiInstance from "../../common/config/axios.instance";
import axios from "axios";

export const fetchMe = async () => {
  try {
    const me = await axiosApiInstance.get(process.env.REACT_APP_API + "/profile/me");
    return [me, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};

export const changeMe = async (inputs) => {
  try {
    const me = await axiosApiInstance.patch(process.env.REACT_APP_API + "/me/change-me", inputs);
    return [me, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};

export const createBusiness = async (business) => {
  const formData = new FormData();
  for (let i = 0; i < business.files.length; i++) {
    formData.append("file", business.files[i]);
  }
  delete business.files;
  formData.append("business", JSON.stringify(business));


  try {
    const business = await axios.post(process.env.REACT_APP_API + "/business", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": JSON.parse(localStorage.getItem("token")),
      },
    });
    return [business, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};

export const listBusinesses = async (page) => {
  try {
    const businesses = await axiosApiInstance.get(process.env.REACT_APP_API + `/businesses?page=${page}`);
    return [businesses, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};



