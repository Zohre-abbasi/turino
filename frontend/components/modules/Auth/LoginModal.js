import styles from "./LoginModal.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validations/valid";
import api from "../../../services/axiosInstance";

function LoginModal({ onClose, onOtpSent }) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
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

      onOtpSent(data.mobile, response.data.code);
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
            {...register("mobile")}
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
