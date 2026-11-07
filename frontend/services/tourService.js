import api from "./axiosInstance";

const getTours = async (filters = {}) => {
  const { data } = await api.get("/tour", {
    params: filters,
  });

  return data;
};

const getTourById = async (tourId) => {
  const { data } = await api.get(`/tour/${tourId}`);

  return data;
};

export { getTours, getTourById };
