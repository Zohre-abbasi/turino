import api from "./axiosInstance";

export const createOrder = async (orderData) => {
  const response = await api.post("/order", orderData);
  return response.data;
};
