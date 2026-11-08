import styles from "./Layout.module.css";
import LoginModal from "../modules/LoginModal";
import OtpModal from "../modules/OtpModal";
import { useEffect, useState, useRef } from "react";
import { getUserProfile } from "../../services/userService";
import Link from "next/link";

function Layout({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [testCode, setTestCode] = useState("");
  const [user, setUser] = useState(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const hasRestoredUser = useRef(false);

  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
      setMobile("");
      setTestCode("");

      setIsOtpOpen(false);
      setIsLoginOpen(true);
    };

    window.addEventListener("auth-expired", handleAuthExpired);

    return () => {
      window.removeEventListener("auth-expired", handleAuthExpired);
    };
  }, []);

  useEffect(() => {
    if (hasRestoredUser.current) return;

    hasRestoredUser.current = true;
    async function restoreUser() {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      // اگر توکن‌ها وجود نداشتند، نیازی به بازیابی ورود نیست
      if (!accessToken || !refreshToken) {
        setUser(null);
        return;
      }

      try {
        const userData = await getUserProfile();

        setUser(userData);
        setMobile(userData.mobile);
      } catch (error) {
        console.error("بازیابی اطلاعات کاربر ناموفق بود:", error);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setUser(null);
      }
    }
    restoreUser();
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setMobile("");
    setTestCode("");
    setIsAccountMenuOpen(false);
    setIsOtpOpen(false);
    setIsLoginOpen(false);
  };

  return (
    <div className={styles.page}>
      {testCode && (
        <p className={styles.testCode}>
          کد آزمایشی: <span dir="ltr">{testCode}</span>
        </p>
      )}
      <header className={styles.header}>
        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={isMenuOpen}
        >
          {!isMenuOpen && <img src="/icons/Group.png" alt="" />}
        </button>
        <Link href="/" className={styles.desktopLogo}>
          <img src="/icons/Torino.png" alt="تورینو" />
        </Link>
        <nav className={styles.desktopNav} aria-label="منوی اصلی">
          <Link href="/" className={styles.activeLink}>
            صفحه اصلی
          </Link>
          <Link href="/">خدمات گردشگری</Link>
          <Link href="/">درباره ما</Link>
          <Link href="/">تماس با ما</Link>
        </nav>
        {user ? (
          <div className={styles.accountMenuWrapper}>
            <button
              className={styles.loginButton}
              onClick={() => setIsAccountMenuOpen((prev) => !prev)}
              aria-expanded={isAccountMenuOpen}
              aria-label="منوی حساب کاربری"
            >
              <img src="/icons/profile.png" className={styles.userProfile}/>
              <span dir="ltr">{user.mobile}</span>
              <span className={styles.accountArrow}>
               <img src="/icons/arrow-down.png"/>
              </span>
            </button>

            {isAccountMenuOpen && (
              <div className={styles.accountDropdown}>
                <div className={styles.accountDropdownHeader}>
                  <span className={styles.accountIcon}>
                    <img src="/icons/profile4.png" alt="حساب کاربری" />
                  </span>
                  <span dir="ltr">{user.mobile}</span>
                </div>

                <div className={styles.dropdownDivider}></div>

                <Link
                  href="/profile"
                  className={styles.dropdownItem}
                  onClick={() => setIsAccountMenuOpen(false)}
                >
                  <img src="/icons/profile3.png"/>
                  <span>اطلاعات حساب کاربری</span>
                </Link>

                <div className={styles.dropdownDivider}></div>

                <button
                  className={`${styles.dropdownItem} ${styles.logoutItem}`}
                  onClick={handleLogout}
                >
                  <img src="/icons/logout.png"/>
                  <span>خروج از حساب کاربری</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className={styles.loginButton}
            onClick={() => {
              if (!isOtpOpen) setIsLoginOpen(true);
            }}
            aria-label="ورود یا ثبت‌نام"
          >
            <span className={styles.mobileLogin}>
              <img
                src={isOtpOpen ? "/icons/sign.png" : "/icons/sign-in.png"}
                alt={isOtpOpen ? "پروفایل" : "ورود"}
              />
            </span>

            <span className={styles.desktopLogin}>
              <img src="/icons/profile.png" alt="پروفایل" />
              ورود | ثبت‌نام
            </span>
          </button>
        )}
      </header>
      {isMenuOpen && (
        <div
          className={styles.menuOverlay}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      {isMenuOpen && (
        <nav className={styles.menuPanel} aria-label="منوی اصلی">
          <button
            type="button"
            className={styles.closeMenuButton}
            onClick={() => setIsMenuOpen(false)}
            aria-label="بستن منو"
          >
            ×
          </button>

          <ul className={styles.menuList}>
            <li>
              <img src="/icons/home.png" />
              <Link
                href="/"
                className={styles.activeLink}
                onClick={() => setIsMenuOpen(false)}
              >
                صفحه اصلی
              </Link>
            </li>
            <li>
              <img src="/icons/airplane.png" />
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                خدمات گردشگری
              </Link>
            </li>
            <li>
              <img src="/icons/volume.png" />
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                درباره ما
              </Link>
            </li>
            <li>
              <img src="/icons/call.png" />
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                تماس با ما
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
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
              <img src="/icons/samandehi.png" alt="نماد ساماندهی" />
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
