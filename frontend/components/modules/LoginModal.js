import styles from "./LoginModal.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/axiosInstance";

const loginSchema = yup.object({
  mobile: yup
    .string()
    .trim()
    .required("وارد کردن شماره موبایل الزامی است.")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر وارد کنید."),
});

function LoginModal({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      mobile: "",
    },
  });

  const onSubmit = async (data) => {
    
    setIsLoading(true);
    setServerMessage("");

    try {
      const response = await api.post("/auth/send-otp", {
        mobile: data.mobile,
      });
      
      setServerMessage(response.data.message);

      console.log("پاسخ سرور:", response.data);
    } catch (error) {
      
      setServerMessage(
        error.response?.data?.message || "ارسال کد تأیید با مشکل مواجه شد.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="بستن مدال"
        >
          ×
        </button>

        <h2>ورود به تورینو</h2>
        <p>شماره موبایل خود را وارد کنید</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="tel"
            placeholder="۰۹۱۲***۴۲۵۳"
            dir="ltr"
            {...register("mobile", {
              onChange: () => {
                clearErrors("mobile");
              },
            })}
            aria-invalid={Boolean(errors.mobile)}
            aria-describedby={errors.mobile ? "mobile-error" : undefined}
          />
          {errors.mobile && (
            <p id="mobile-error" className={styles.errorMessage}>
              {errors.mobile.message}
            </p>
          )}
          {serverMessage && (
            <p className={styles.serverMessage} role="status">
              {serverMessage}
            </p>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "در حال ارسال..." : "ارسال کد تأیید"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
