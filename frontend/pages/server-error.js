import styles from "../styles/ServerError.module.css";

function ServerError() {
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
      </div>
    </main>
  );
}

export default ServerError;
