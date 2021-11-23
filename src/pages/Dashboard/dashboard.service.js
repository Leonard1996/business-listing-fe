import axiosApiInstancem from "../../common/config/axios.instance";

export const fetchMe = async () => {
  try {
    const me = await axiosApiInstancem.get(process.env.REACT_APP_API + "/profile/me");
    return [me, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};

export const changeMe = async (inputs) => {
  try {
    const me = await axiosApiInstancem.patch(process.env.REACT_APP_API + "/me/change-me", inputs);
    return [me, null];
  } catch (error) {
    return [null, JSON.stringify(error)];
  }
};
