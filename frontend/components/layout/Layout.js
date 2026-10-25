import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.menuButton}>
          <img src="/icons/Group.png" alt="منو" />
        </button>
        <button className={styles.loginButton}>
          <img src="/icons/sign-in.png" alt="ورود" />
        </button>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <div>
            <h2>تورینو</h2>
            <ul>
              <li>درباره ما</li>
              <li>تماس با ما</li>
              <li>چرا تورینو</li>
              <li>بیمه مسافرتی</li>
            </ul>
          </div>
          <div>
            <h2>خدمات مشتریان</h2>
            <ul>
              <li>پشتیبانی آنلاین</li>
              <li>راهنمای خرید</li>
              <li>راهنمای استرداد</li>
              <li>پرسش و پاسخ</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerContact}>
          <div className={styles.right}>
            <img src="/icons/ecunion.png" alt="نماد اعتماد الکترونیکی" />
            <img src="/icons/samandehi.png" alt="نمادساماندهی" />
            <img src="/icons/aira.png" alt="مجوز گردشگری" />
            <img src="/icons/state-airline.png" alt="مجوز هواپیمایی" />
            <img src="/icons/passenger.png" alt="مجوز مسافرتی" />
          </div>
          <div className={styles.left}>
            <img src="/icons/Torino.png" alt="لوگوی تورینو" />
            <p>
              تلفن پشتیبانی: <span dir="ltr">۰۲۱-۸۵۷۴</span>
            </p>
          </div>
        </div>
        <div className={styles.law}>
          <p>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
