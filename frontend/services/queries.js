import { useQuery } from "@tanstack/react-query";
import { getTours } from "./tourService";
import api from "./axiosInstance";

export const useGetUserTours = () => {
  return useQuery({
    queryKey: ["user-tours"],
    queryFn: async () => {
      const { data } = await api.get("/user/tours");
      return data;
    },
  });
};

export const useGetUserTransactions = () => {
  return useQuery({
    queryKey: ["user-transactions"],
    queryFn: async () => {
      const { data } = await api.get("/user/transactions");
      return data;
    },
  });
};

export const useTours = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: ["tours", filters],
    queryFn: () => getTours(filters),
    ...options,
  });
};
