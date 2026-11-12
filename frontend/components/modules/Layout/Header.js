import Link from "next/link";
import styles from "./Header.module.css";
import AccountMenu from "./AccountMenu";

function Header({
  user,
  isLoading,
  isOtpOpen,
  isMenuOpen,
  isAccountMenuOpen,
  onMenuToggle,
  onLoginClick,
  onAccountToggle,
  onAccountClose,
  onLogout,
}) {
  return (
    <header className={styles.header}>
      <button
        className={styles.menuButton}
        onClick={onMenuToggle}
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

      {!isLoading &&
        (user ? (
          <AccountMenu
            user={user}
            isOpen={isAccountMenuOpen}
            onToggle={onAccountToggle}
            onClose={onAccountClose}
            onLogout={onLogout}
          />
        ) : (
          <button
            className={styles.loginButton}
            onClick={onLoginClick}
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
        ))}
    </header>
  );
}

export default Header;
