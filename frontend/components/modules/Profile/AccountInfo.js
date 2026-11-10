import { useState } from "react";
import styles from "./AccountInfo.module.css";

function AccountInfo({ user }) {
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [email, setEmail] = useState(user.email || "");

  const showValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return value;
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>اطلاعات حساب کاربری</h2>

      <div className={styles.accountColumns}>
        <div className={styles.accountItem}>
          <span className={styles.label}>شماره موبایل</span>
          <span className={styles.value}>{showValue(user.mobile)}</span>
        </div>

        <div className={styles.accountItem}>
          {isEmailEditing ? (
            <>
              <input
                type="email"
                placeholder="آدرس ایمیل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="button"
                className={styles.actionButton}
                onClick={() => setIsEmailEditing(false)}
              >
                تأیید
              </button>
            </>
          ) : (
            <>
              <span className={styles.label}>ایمیل</span>
              <span className={styles.value}>
                {showValue(user.email || email)}
              </span>

              <button
                type="button"
                className={styles.actionButton}
                onClick={() => setIsEmailEditing(true)}
              >
                <img src="/icons/edit1.png" alt="" />
                <span>{user.email || email.trim() ? "ویرایش" : "افزودن"}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default AccountInfo;
