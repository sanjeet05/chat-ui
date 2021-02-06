import { apiCalls } from "./apiCalls";

const base_api_url = process.env.REACT_APP_BASE_API_URL || "http://localhost:3100";

export const doGetAvatars = async () => {
  const url = base_api_url + `/api/v1/user/avatars`;
  try {
    const result = await apiCalls("get", url);
    return result.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.error("avatars, server err:", error.message);
      throw new Error(error.message);
    }
  }
};

export const doGetActiveAvatar = async () => {
  const url = base_api_url + `/api/v1/user/active_avatar`;
  try {
    const result = await apiCalls("get", url);
    return result.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.error("get avatar active, server err:", error.message);
      throw new Error(error.message);
    }
  }
};

export const doMakeActive = async (id, socketId) => {
  const url = base_api_url + `/api/v1/user/avatars`;
  const reqBody = {
    id: id,
    socketId: socketId || "",
  };
  try {
    const result = await apiCalls("put", url, reqBody);
    return result.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.error("make avatar active, server err:", error.message);
      throw new Error(error.message);
    }
  }
};

export const doGetMessages = async () => {
  const url = base_api_url + `/api/v1/user/messages`;
  try {
    const result = await apiCalls("get", url);
    return result.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.error("get message, server err:", error.message);
      throw new Error(error.message);
    }
  }
};

export const doPostMessages = async (values) => {
  const url = base_api_url + `/api/v1/user/messages`;
  const reqBody = {
    message: values.message || "",
    id: values.id || "",
  };
  try {
    const result = await apiCalls("post", url, reqBody);
    return result.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.error("post message, server err:", error.message);
      throw new Error(error.message);
    }
  }
};
