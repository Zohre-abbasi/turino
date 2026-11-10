import { useState } from "react";
import styles from "./BankInfo.module.css";

function BankInfo({ user }) {
  const initialBankInfo = {
    shaba_code: user.payment?.shaba_code || "",
    accountIdentifier: user.payment?.accountIdentifier || "",
    debitCard_code: user.payment?.debitCard_code || "",
  };

  const [isBankEditing, setIsBankEditing] = useState(false);
  const [bankInfo, setBankInfo] = useState(initialBankInfo);
  const [savedBankInfo, setSavedBankInfo] = useState(initialBankInfo);

  const showValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return value;
  };

  const handleEdit = () => {
    setBankInfo({ ...savedBankInfo });
    setIsBankEditing(true);
  };

  const handleConfirm = () => {
    setSavedBankInfo({ ...bankInfo });
    setIsBankEditing(false);
  };

  const handleCancel = () => {
    setBankInfo({ ...savedBankInfo });
    setIsBankEditing(false);
  };
  const bankFields = [
    {
      name: "shaba_code",
      placeholder: "شماره شبا",
    },
    {
      name: "accountIdentifier",
      placeholder: "شماره حساب",
    },
    {
      name: "debitCard_code",
      placeholder: "شماره کارت",
    },
  ];

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>
          {isBankEditing ? "ویرایش اطلاعات حساب بانکی" : "اطلاعات حساب بانکی"}
        </h2>

        {!isBankEditing && (
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleEdit}
          >
            <img src="/icons/edit1.png" alt="" />
            <span>ویرایش</span>
          </button>
        )}
      </div>

      {isBankEditing ? (
        <div className={styles.bankForm}>
          {bankFields.map((field) => (
            <input
              key={field.name}
              type="text"
              placeholder={field.placeholder}
              value={bankInfo[field.name]}
              onChange={(e) =>
                setBankInfo({
                  ...bankInfo,
                  [field.name]: e.target.value,
                })
              }
            />
          ))}
          <div className={styles.formActions}>
            <button type="button" onClick={handleConfirm}>
              تأیید
            </button>

            <button type="button" onClick={handleCancel}>
              انصراف
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.bankColumns}>
          <div className={styles.infoGroup}>
            <div className={styles.infoRow}>
              <span className={styles.label}>شماره شبا</span>
              <span className={styles.value}>
                {showValue(savedBankInfo.shaba_code)}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>شماره حساب</span>
              <span className={styles.value}>
                {showValue(savedBankInfo.accountIdentifier)}
              </span>
            </div>
          </div>

          <div className={styles.infoGroup}>
            <div className={styles.infoRow}>
              <span className={styles.label}>شماره کارت</span>
              <span className={styles.value}>
                {showValue(savedBankInfo.debitCard_code)}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BankInfo;
