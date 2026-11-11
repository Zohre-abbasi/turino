import { useRouter } from "next/router";
import styles from "./PaymentPage.module.css";

function PaymentPage() {
  const router = useRouter();
  const { status } = router.query;

  if (!router.isReady) return null;

  if (status === "success") {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.successIcon}`}>✓</div>
          <p className={styles.title}>پرداخت شما با موفقیت انجام شد.</p>
          <a href="/profile/my-tours" className={styles.successButton}>
            مشاهده تورهای من
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={`${styles.icon} ${styles.failedIcon}`}>×</div>
        <p className={styles.title}>پرداخت با شکست مواجه شد.</p>
        <a href="/checkout" className={styles.failedButton}>
          بازگشت به سبد خرید
        </a>
      </div>
    </div>
  );
}

export default PaymentPage;
