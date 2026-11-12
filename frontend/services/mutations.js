import { useMutation } from "@tanstack/react-query";
import { addTourToBasket } from "./basketService";
import { createOrder } from "./orderService";
import api from "./axiosInstance";

const checkOtp = async ({ mobile, code }) => {
  const { data } = await api.post("/auth/check-otp", {
    mobile,
    code,
  });

  return data;
};

export const useCheckOtp = (options = {}) => {
  return useMutation({
    mutationFn: checkOtp,
    ...options,
  });
};

export const useAddTourToBasket = (options = {}) => {
  return useMutation({
    mutationFn: addTourToBasket,
    ...options,
  });
};

export const useCreateOrder = (options = {}) => {
  return useMutation({
    mutationFn: createOrder,
    ...options,
  });
};
