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

  const { businessId } = business;


  try {
    const business = await axios[businessId ? 'patch' : 'post'](process.env.REACT_APP_API + "/businesses", formData, {
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

export const listBusinesses = async (page, isFilter, isWithFilter, filterParams, isSaved) => {
  try {
    let query = isWithFilter ? process.env.REACT_APP_API + `/${isSaved ? 'like-business' : 'businesses'}/${isSaved ? '' : 'filter'}?page=${page}` : process.env.REACT_APP_API + `/${isSaved ? 'like-business' : 'businesses'}?page=${page}`
    if (isFilter) query += "&isFilter=1"
    let businesses;
    if (!isWithFilter) businesses = await axiosApiInstance.get(query);
    else {
      if (isSaved) businesses = await axiosApiInstance.get(query, filterParams);
      else businesses = await axiosApiInstance.post(query, filterParams);
    }
    return [businesses, null];
  } catch (error) {
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

export const like = async (id) => {
  try {
    const business = await axiosApiInstance.post(process.env.REACT_APP_API + `/like-business/`, { id });
    return [business, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};

export const check = async (id) => {
  try {
    const business = await axiosApiInstance.get(process.env.REACT_APP_API + `/like-business/` + id);
    return [business, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};


export const listLiked = async (page, isFilter, isWithFilter, filterParams) => {
  try {
    let query = isWithFilter ? process.env.REACT_APP_API + `/like-business/filter?page=${page}` : process.env.REACT_APP_API + `/like-business?page=${page}`
    if (isFilter) query += "&isFilter=1"
    let businesses;
    if (!isWithFilter) businesses = await axiosApiInstance.get(query);
    else businesses = await axiosApiInstance.post(query, filterParams);
    return [businesses, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};

export const deleteAttachment = async (attachmentId, businessId) => {
  try {
    const result = await axiosApiInstance.delete(process.env.REACT_APP_API + "/attachments/" + attachmentId + "/businesses/" + businessId);
    return [result, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
}

export const fetchUserById = async (id) => {
  try {
    const me = await axiosApiInstance.get(process.env.REACT_APP_API + "/users/" + id);
    return [me, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};


export const changeUser = async (inputs, id) => {
  try {
    const me = await axiosApiInstance.patch(process.env.REACT_APP_API + "/users/" + id, inputs);
    return [me, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};



