import { useQuery } from "@tanstack/react-query";
import api from "./axiosInstance";

export const useGetUserTours = () => {
  const queryFn = () => api.get("/user/tours");
  const queryKey = ["user-tours"];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await queryFn();
      return response.data;
    },
  });
};

export const useGetUserTransactions = () => {
  const queryFn = () => api.get("/user/transactions");
  const queryKey = ["user-transactions"];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await queryFn();
      return response.data;
    },
  });
};
