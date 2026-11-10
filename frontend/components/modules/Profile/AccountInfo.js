import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { updateUserProfile } from "../../../services/userService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "../../../validations/valid";

import styles from "./AccountInfo.module.css";

function AccountInfo({ user }) {
  const { updateUser } = useAuth();

  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [email, setEmail] = useState(user.email || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: user.email || "",
    },
  });

  useEffect(() => {
    if (!success && !error) return;

    const timer = setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success, error]);

  const showValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return value;
  };

  const handleSaveEmail = async (data) => {
    setError("");
    setSuccess("");

    try {
      setIsSaving(true);

      const updatedEmail = data.email.trim();

      const response = await updateUserProfile({
        email: updatedEmail,
      });

      updateUser(response.user);
      setEmail(response.user.email || "");
      setIsEmailEditing(false);
      setSuccess("ایمیل با موفقیت ذخیره شد.");
    } catch (error) {
      setError(error.response?.data?.message || "ذخیره ایمیل ناموفق بود.");
    } finally {
      setIsSaving(false);
    }
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
            <form noValidate onSubmit={handleSubmit(handleSaveEmail)}>
              <input
                type="email"
                placeholder="آدرس ایمیل"
                {...register("email", {
                  onChange: () => clearErrors("email"),
                })}
              />

              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}

              <button
                type="submit"
                className={styles.actionButton}
                disabled={isSaving}
              >
                {isSaving ? "در حال ذخیره..." : "تأیید"}
              </button>
            </form>
          ) : (
            <>
              <span className={styles.label}>ایمیل</span>

              <span className={styles.value}>{showValue(user.email)}</span>

              <button
                type="button"
                className={styles.actionButton}
                onClick={() => {
                  setEmail(user.email || "");
                  setError("");
                  setSuccess("");
                  setIsEmailEditing(true);
                }}
              >
                <img src="/icons/edit1.png" alt="" />
                <span>{user.email || email.trim() ? "ویرایش" : "افزودن"}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </section>
  );
}

export default AccountInfo;
