import styles from "./OtpModal.module.css";
import OtpInputs from "./OtpInputs";

import { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../services/axiosInstance";

const checkOtp = async ({ mobile, code }) => {
  const response = await api.post("/auth/check-otp", {
    mobile,
    code,
  });

  return response.data;
};

function OtpModal({ mobile, testCode, onBack, onClose, onLoginSuccess }) {
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timerId = setInterval(() => {
      setSecondsLeft((previousSeconds) => previousSeconds - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  const {
    mutate: verifyOtp,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ mobile, code }) => checkOtp({ mobile, code }),
    onSuccess: (data) => {
      onLoginSuccess(data);
    },
  });

  const handleVerifyOtp = () => {
    const code = otp.join("");

    if (code.length !== 6 || !otp.every((digit) => digit !== "")) {
      return;
    }

    verifyOtp({ mobile, code });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          aria-label="بازگشت"
        >
          <img src="/icons/arrow-left.png" alt="back" />
        </button>

        <h2>کد تأیید را وارد کنید.</h2>
        <p className={styles.description}>
          کد تأیید به شماره <span dir="ltr">{mobile}</span> ارسال شد.
        </p>
        <OtpInputs otp={otp} setOtp={setOtp} inputRefs={inputRefs} />
        {error && (
          <p className={styles.errorMessage} role="alert">
            {error.response?.data?.message ||
              "تأیید کد با مشکل مواجه شد. دوباره تلاش کنید."}
          </p>
        )}
        <p className={styles.timer}>
          <span dir="ltr">{formattedTime}</span>
          تا ارسال مجدد کد{" "}
        </p>
        <button
          type="button"
          className={styles.submitButton}
          onClick={handleVerifyOtp}
          disabled={isPending || otp.some((digit) => digit === "")}
        >
          {isPending ? "در حال بررسی..." : "ورود به تورینو"}
        </button>
      </div>
    </div>
  );
}

export default OtpModal;
