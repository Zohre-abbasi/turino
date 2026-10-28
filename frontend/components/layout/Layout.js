import styles from "./Layout.module.css";
import LoginModal from "../modules/LoginModal";
import OtpModal from "../modules/OtpModal";
import { useState } from "react";

function Layout({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [testCode, setTestCode] = useState("");
  const [user, setUser] = useState(null);

  const handleOtpSent = (mobileNumber, code) => {
    setMobile(mobileNumber);
    setTestCode(code || "");
    setIsLoginOpen(false);
    setIsOtpOpen(true);
  };

  const handleLoginSuccess = (data) => {
    if (!data.accessToken || !data.refreshToken || !data.user) {
      console.error("پاسخ احراز هویت کامل نیست.");
      return;
    }

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    setUser(data.user);
    setMobile(data.user.mobile);
    setTestCode("");
    setIsOtpOpen(false);
  };

  return (
    <div className={styles.page}>
      {testCode && (
        <p className={styles.testCode}>
          کد آزمایشی: <span dir="ltr">{testCode}</span>
        </p>
      )}
      <header className={styles.header}>
        <button className={styles.menuButton}>
          <img src="/icons/Group.png" alt="منو" />
        </button>
        <button
          className={styles.loginButton}
          onClick={() => {
            if (!user && !isOtpOpen) {
              setIsLoginOpen(true);
            }
          }}
          aria-label={
            user
              ? `شماره موبایل ${user.mobile}`
              : isOtpOpen
                ? "تأیید کد"
                : "ورود"
          }
        >
          {user ? (
            <span dir="ltr">{user.mobile}</span>
          ) : isOtpOpen ? (
            <img src="/icons/sign.png" />
          ) : (
            <img src="/icons/sign-in.png" alt="ورود" />
          )}
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
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onOtpSent={handleOtpSent}
        />
      )}
      {isOtpOpen && (
        <OtpModal
          mobile={mobile}
          testCode={testCode}
          onBack={() => {
            setIsOtpOpen(false);
            setIsLoginOpen(true);
          }}
          onClose={() => setIsOtpOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default Layout;
