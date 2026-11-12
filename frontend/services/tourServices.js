
import api from "./axiosInstance";

export const getMyTours = async () => {
  const response = await api.get("/user/tours");
  return response.data;
};
