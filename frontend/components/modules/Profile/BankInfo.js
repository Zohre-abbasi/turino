import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { updateUserProfile } from "../../../services/userService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankInfoSchema } from "../../../validations/valid";
import styles from "./BankInfo.module.css";

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

function BankInfo({ user }) {
  const { updateUser } = useAuth();

  const [isBankEditing, setIsBankEditing] = useState(false);
  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const initialBankInfo = {
    shaba_code: user.payment?.shaba_code || "",
    accountIdentifier: user.payment?.accountIdentifier || "",
    debitCard_code: user.payment?.debitCard_code || "",
  };

  const [bankInfo, setBankInfo] = useState(initialBankInfo);
  const [savedBankInfo, setSavedBankInfo] = useState(initialBankInfo);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bankInfoSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: initialBankInfo,
  });

  useEffect(() => {
    if (!apiSuccess && !apiError) return;

    const timer = setTimeout(() => {
      setApiSuccess("");
      setApiError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [apiSuccess, apiError]);

  const showValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return value;
  };

  const handleEdit = () => {
    setBankInfo({ ...savedBankInfo });

    reset(savedBankInfo);
    clearErrors();
    setApiError("");
    setApiSuccess("");

    setIsBankEditing(true);
  };

  const handleConfirm = async (data) => {
    setApiError("");
    setApiSuccess("");

    try {
      const response = await updateUserProfile({
        payment: {
          ...user.payment,
          ...data,
        },
      });

      updateUser(response.user);

      const updatedBankInfo = {
        shaba_code: response.user.payment?.shaba_code || "",
        accountIdentifier: response.user.payment?.accountIdentifier || "",
        debitCard_code: response.user.payment?.debitCard_code || "",
      };

      setBankInfo(updatedBankInfo);
      setSavedBankInfo(updatedBankInfo);
      setIsBankEditing(false);

      setApiSuccess("اطلاعات بانکی با موفقیت ذخیره شد.");
    } catch (error) {
      setApiError(
        error.response?.data?.message || "ذخیره اطلاعات بانکی ناموفق بود.",
      );
    }
  };

  const handleCancel = () => {
    setBankInfo({ ...savedBankInfo });
    reset(savedBankInfo);
    clearErrors();
    setApiError("");
    setApiSuccess("");
    setIsBankEditing(false);
  };

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
        <form
          className={styles.bankForm}
          onSubmit={handleSubmit(handleConfirm)}
        >
          {bankFields.map((field) => (
            <div key={field.name} className={styles.inputGroup}>
              <input
                type="text"
                placeholder={field.placeholder}
                {...register(field.name)}
                onChange={(e) => {
                  setBankInfo({
                    ...bankInfo,
                    [field.name]: e.target.value,
                  });

                  setValue(field.name, e.target.value);
                  clearErrors(field.name);
                }}
              />

              {errors[field.name] && (
                <p className={styles.error}>{errors[field.name].message}</p>
              )}
            </div>
          ))}
          <div className={styles.formActions}>
            <button type="submit">تأیید</button>

            <button type="button" onClick={handleCancel}>
              انصراف
            </button>
          </div>
        </form>
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
      {apiSuccess && <p className={styles.success}>{apiSuccess}</p>}

      {apiError && <p className={styles.error}>{apiError}</p>}
    </section>
  );
}

export default BankInfo;
