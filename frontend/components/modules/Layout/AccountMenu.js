import Link from "next/link";
import styles from "./AccountMenu.module.css";

function AccountMenu({ user, isOpen, onToggle, onClose, onLogout }) {
  return (
    <div className={styles.accountMenuWrapper}>
      <button
        className={styles.loginButton}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label="منوی حساب کاربری"
      >
        <img src="/icons/profile.png" className={styles.userProfile} alt="" />

        <span dir="ltr">{user.mobile}</span>

        <span className={styles.accountArrow}>
          <img src="/icons/arrow-down.png" alt="" />
        </span>
      </button>

      {isOpen && (
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
            onClick={onClose}
          >
            <img src="/icons/profile3.png" alt="" />
            <span>اطلاعات حساب کاربری</span>
          </Link>

          <div className={styles.dropdownDivider}></div>

          <button
            className={`${styles.dropdownItem} ${styles.logoutItem}`}
            onClick={onLogout}
          >
            <img src="/icons/logout.png" alt="" />
            <span>خروج از حساب کاربری</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;
