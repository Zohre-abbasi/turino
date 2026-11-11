import { useRouter } from "next/router";
import Link from "next/link";
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
          <Link href="/profile/my-tours" className={styles.successButton}>
            مشاهده تورهای من
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={`${styles.icon} ${styles.failedIcon}`}>×</div>
        <p className={styles.title}>پرداخت با شکست مواجه شد.</p>
        <Link href="/checkout" className={styles.failedButton}>
          بازگشت به سبد خرید
        </Link>
      </div>
    </div>
  );
}

export default PaymentPage;
