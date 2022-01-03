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

export const listBusinesses = async (page, isFilter, isWithFilter, filterParams) => {
  try {
    let query = isWithFilter ? process.env.REACT_APP_API + `/businesses/filter?page=${page}` : process.env.REACT_APP_API + `/businesses?page=${page}`
    if (isFilter) query += "&isFilter=1"
    let businesses;
    if (!isWithFilter) businesses = await axiosApiInstance.get(query);
    else businesses = await axiosApiInstance.post(query, filterParams);
    return [businesses, null];
  } catch (error) {
    console.log(error)
    return [null, JSON.stringify(error)];
  }
};

export const deleteBusiness = async (id) => {
  try {
    const business = await axiosApiInstance.delete(process.env.REACT_APP_API + `/businesses/` + id);
    return [business, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};



