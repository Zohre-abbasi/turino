import { useMutation } from "@tanstack/react-query";
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
