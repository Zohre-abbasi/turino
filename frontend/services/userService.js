import api from "./axiosInstance";

export const getUserProfile = async () => {
  const response = await api.get("/user/profile");

  return response.data;
};

export const updateUserProfile = async (data) => {
  const response = await api.put("/user/profile", data);

  return response.data;
};
