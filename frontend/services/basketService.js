import api from "./axiosInstance";

export const getBasket = async () => {
  const response = await api.get("/basket");
  return response.data;
};

export const addTourToBasket = async (tourId) => {
  const response = await api.put(`/basket/${tourId}`);
  return response.data;
};
