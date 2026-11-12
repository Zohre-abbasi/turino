import { useEffect, useState, useRef } from "react";

import { useCheckOtp } from "../../services/mutations";
import { formatTime } from "../../utils/tourUtils";

import OtpInputs from "./OtpInputs";
import styles from "./OtpModal.module.css";

function OtpModal({ mobile, onBack, onClose, onLoginSuccess }) {
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const { mutate: verifyOtp, isPending, error } = useCheckOtp();

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timerId = setInterval(() => {
      setSecondsLeft((previousSeconds) => previousSeconds - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsLeft]);

  const handleVerifyOtp = () => {
    const code = otp.join("");

    if (code.length !== 6 || otp.some((digit) => digit === "")) {
      return;
    }

    verifyOtp(
      { mobile, code },
      {
        onSuccess: (data) => {
          onLoginSuccess(data);
        },
      },
    );
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
          <span dir="ltr">{formatTime(secondsLeft)}</span>
          تا ارسال مجدد کد
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
