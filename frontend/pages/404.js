import Link from "next/link";
import styles from "../styles/404.module.css";

function Custom404() {
  return (
    <section className={styles.errorPage}>
      <img className={styles.errorImage} src="/icons/Error.png" alt="خطای 404" />

      <h1>صفحه مورد نظر یافت نشد!</h1>

      <Link href="/" className={styles.homeButton}>
        بازگشت به صفحه اصلی
      </Link>
    </section>
  );
}

export default Custom404;
