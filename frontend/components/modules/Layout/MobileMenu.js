import Link from "next/link";
import styles from "./MobileMenu.module.css";

function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.menuOverlay} onClick={onClose} />

      <nav className={styles.menuPanel} aria-label="منوی اصلی">
        <button
          type="button"
          className={styles.closeMenuButton}
          onClick={onClose}
          aria-label="بستن منو"
        >
          ×
        </button>

        <ul className={styles.menuList}>
          <li>
            <img src="/icons/home.png" alt="" />
            <Link href="/" className={styles.activeLink} onClick={onClose}>
              صفحه اصلی
            </Link>
          </li>

          <li>
            <img src="/icons/airplane.png" alt="" />
            <Link href="/" onClick={onClose}>
              خدمات گردشگری
            </Link>
          </li>

          <li>
            <img src="/icons/volume.png" alt="" />
            <Link href="/" onClick={onClose}>
              درباره ما
            </Link>
          </li>

          <li>
            <img src="/icons/call.png" alt="" />
            <Link href="/" onClick={onClose}>
              تماس با ما
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MobileMenu;
