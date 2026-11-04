import { useState } from "react";
import styles from "../styles/ServerError.module.css";

function ServerError() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRetry = async () => {
    try {
      setIsRetrying(true);
      setErrorMessage("");

      const response = await fetch("/api/revalidate", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "ارتباط با سرور برقرار نشد.");
      }

      window.location.assign("/");
    } catch (error) {
      setErrorMessage(error.message || "لطفاً دوباره تلاش کنید.");
      setIsRetrying(false);
    }
  };

  return (
    <main className={styles.container}>
      <img
        src="/images/Error Lamp.png"
        alt="خطا در اتصال به سرور"
        className={styles.image}
      />

      <div className={styles.content}>
        <h1>اتصال با سرور برقرار نیست!</h1>
        <p>لطفاً بعداً دوباره امتحان کنید.</p>

        <button
          type="button"
          onClick={handleRetry}
          disabled={isRetrying}
          className={styles.retryButton}
        >
          {isRetrying ? "در حال تلاش مجدد..." : "تلاش مجدد"}
        </button>

        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
      </div>
    </main>
  );
}

export default ServerError;
