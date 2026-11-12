import styles from "./ContactBanner.module.css";

function ContactBanner() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <img
          className={styles.image}
          src="/images/carton.png"
          alt="پشتیبانی تورینو"
        />

        <div className={styles.description}>
          <h2>
            خرید تلفنی از<span>تورینو</span>{" "}
          </h2>
          <p>به هرکجا که میخواهید!</p>
        </div>
      </div>

      <div className={styles.contact}>
        <a className={styles.phone} href="tel:0211840">
          <span>۰۲۱-۱۸۴۰</span>
          <img src="/icons/call2.png" alt="" />
        </a>

        <button className={styles.moreButton} type="button">
          اطلاعات بیشتر
        </button>
      </div>
    </section>
  );
}

export default ContactBanner;
