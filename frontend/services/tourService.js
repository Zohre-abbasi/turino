import api from "./axiosInstance";

const getTours = async (filters = {}) => {
  const { data } = await api.get("/tour", {
    params: filters,
  });

  return data;
};

export { getTours };
