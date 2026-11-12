import api from "./axiosInstance";

export const getBasket = async () => {
  try {
    const response = await api.get("/basket");
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }

    throw error;
  }
};

export const addTourToBasket = async (tourId) => {
  const response = await api.put(`/basket/${tourId}`);
  return response.data;
};
