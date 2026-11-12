import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalInfoSchema } from "../../../validations/valid";
import { useAuth } from "../../../context/AuthContext";
import { updateUserProfile } from "../../../services/userService";
import dynamic from "next/dynamic";
import { CalendarProvider } from "zaman";

import {
  formatPersianDate,
  formatApiDate,
  parseApiDate,
} from "../../../utils/dateUtils";

import styles from "./PersonalInfo.module.css";

const Calendar = dynamic(() => import("zaman").then((mod) => mod.Calendar), {
  ssr: false,
});

function PersonalInfo({ user }) {
  const [isPersonalEditing, setIsPersonalEditing] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const [personalInfo, setPersonalInfo] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    nationalCode: user.nationalCode || "",
    gender: user.gender || "",
    birthDate: user.birthDate || "",
  });
  const [fullNameInput, setFullNameInput] = useState(
    `${user.firstName || ""} ${user.lastName || ""}`.trim(),
  );

  const [savedPersonalInfo, setSavedPersonalInfo] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    nationalCode: user.nationalCode || "",
    gender: user.gender || "",
    birthDate: user.birthDate || "",
  });
  const { updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalInfoSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      nationalCode: user.nationalCode || "",
      gender: user.gender || "",
      birthDate: user.birthDate || "",
    },
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

  const fullName =
    `${savedPersonalInfo.firstName} ${savedPersonalInfo.lastName}`.trim();

  const gender =
    savedPersonalInfo.gender === "male"
      ? "مرد"
      : savedPersonalInfo.gender === "female"
        ? "زن"
        : "-";

  const handleSavePersonalInfo = async (data) => {
    setApiSuccess("");
    setApiError("");

    try {
      setIsSaving(true);

      const response = await updateUserProfile({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        nationalCode: data.nationalCode,
        gender: data.gender,
        birthDate: data.birthDate,
      });

      updateUser(response.user);

      const updatedInfo = {
        firstName: response.user.firstName || "",
        lastName: response.user.lastName || "",
        nationalCode: response.user.nationalCode || "",
        gender: response.user.gender || "",
        birthDate: response.user.birthDate || "",
      };

      setPersonalInfo(updatedInfo);
      setSavedPersonalInfo(updatedInfo);
      setApiSuccess("اطلاعات شخصی با موفقیت ذخیره شد.");

      setShowCalendar(false);
      setIsPersonalEditing(false);
    } catch (error) {
      setApiError(
        error.response?.data?.message || "ذخیره اطلاعات شخصی ناموفق بود.",
      );
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>
          {isPersonalEditing ? "ویرایش اطلاعات شخصی" : "اطلاعات شخصی"}
        </h2>

        {!isPersonalEditing && (
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => {
              setPersonalInfo({ ...savedPersonalInfo });

              setFullNameInput(
                `${savedPersonalInfo.firstName} ${savedPersonalInfo.lastName}`.trim(),
              );

              reset(savedPersonalInfo);
              clearErrors();
              setIsPersonalEditing(true);
            }}
          >
            <img src="/icons/edit1.png" alt="" />
            <span>ویرایش اطلاعات</span>
          </button>
        )}
      </div>

      {isPersonalEditing ? (
        <form
          className={styles.personalForm}
          onSubmit={handleSubmit(handleSavePersonalInfo)}
        >
          <input type="hidden" {...register("firstName")} />
          <input type="hidden" {...register("lastName")} />

          <div>
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              value={fullNameInput}
              onChange={(e) => {
                const value = e.target.value;

                setFullNameInput(value);

                const separatorIndex = value.search(/\s/);

                const firstName =
                  separatorIndex === -1
                    ? value.trimStart()
                    : value.slice(0, separatorIndex).trim();

                const lastName =
                  separatorIndex === -1
                    ? ""
                    : value.slice(separatorIndex).trim();

                setPersonalInfo((prev) => ({
                  ...prev,
                  firstName,
                  lastName,
                }));

                setValue("firstName", firstName);
                setValue("lastName", lastName);

                clearErrors(["firstName", "lastName"]);
              }}
            />
            {(errors.firstName || errors.lastName) && (
              <p className={styles.error}>
                {errors.firstName?.message || errors.lastName?.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="کد ملی"
              value={personalInfo.nationalCode}
              onChange={(e) => {
                const value = e.target.value;

                setPersonalInfo((prev) => ({
                  ...prev,
                  nationalCode: value,
                }));

                setValue("nationalCode", value);
                clearErrors("nationalCode");
              }}
            />

            {errors.nationalCode && (
              <p className={styles.error}>{errors.nationalCode.message}</p>
            )}
          </div>
          <div>
            <select
              value={personalInfo.gender}
              onChange={(e) => {
                const value = e.target.value;

                setPersonalInfo((prev) => ({
                  ...prev,
                  gender: value,
                }));

                setValue("gender", value);
                clearErrors("gender");
              }}
            >
              <option value="" disabled>
                انتخاب جنسیت
              </option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>

            {errors.gender && (
              <p className={styles.error}>{errors.gender.message}</p>
            )}
          </div>
          <div className={styles.birthDateWrapper}>
            <input type="hidden" {...register("birthDate")} />

            <div className={styles.birthDateInput}>
              {!personalInfo.birthDate && (
                <img src="/icons/calendar.png" alt="" />
              )}

              <input
                type="text"
                placeholder="تاریخ تولد"
                value={
                  personalInfo.birthDate
                    ? formatPersianDate(parseApiDate(personalInfo.birthDate))
                    : ""
                }
                readOnly
                onClick={() => setShowCalendar((prev) => !prev)}
              />
            </div>

            {showCalendar && (
              <div className={styles.calendarPopup}>
                <CalendarProvider locale="fa" direction="rtl">
                  <Calendar
                    defaultValue={
                      personalInfo.birthDate
                        ? parseApiDate(personalInfo.birthDate)
                        : undefined
                    }
                    onChange={(e) => {
                      const selectedDate = new Date(e.value);
                      const formattedDate = formatApiDate(selectedDate);

                      setPersonalInfo((prev) => ({
                        ...prev,
                        birthDate: formattedDate,
                      }));

                      setValue("birthDate", formattedDate);
                      clearErrors("birthDate");
                      setShowCalendar(false);
                    }}
                  />
                </CalendarProvider>
              </div>
            )}

            {errors.birthDate && (
              <p className={styles.error}>{errors.birthDate.message}</p>
            )}
          </div>
          <div className={styles.formActions}>
            <button type="submit" disabled={isSaving}>
              {isSaving ? "در حال ذخیره..." : "تأیید"}
            </button>

            <button
              type="button"
              onClick={() => {
                setPersonalInfo({ ...savedPersonalInfo });

                setFullNameInput(
                  `${savedPersonalInfo.firstName} ${savedPersonalInfo.lastName}`.trim(),
                );

                clearErrors();
                setApiError("");
                setApiSuccess("");
                setIsPersonalEditing(false);
                setShowCalendar(false);
              }}
            >
              انصراف
            </button>
          </div>

          {apiError && <p className={styles.error}>{apiError}</p>}
        </form>
      ) : (
        <div className={styles.personalColumns}>
          <div className={styles.infoGroup}>
            <div className={styles.infoRow}>
              <span className={styles.label}>نام و نام خانوادگی</span>
              <span className={styles.value}>{showValue(fullName)}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>جنسیت</span>
              <span className={styles.value}>{gender}</span>
            </div>
          </div>

          <div className={styles.infoGroup}>
            <div className={styles.infoRow}>
              <span className={styles.label}>کد ملی</span>
              <span className={styles.value}>
                {showValue(savedPersonalInfo.nationalCode)}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>تاریخ تولد</span>
              <span className={styles.value}>
                {savedPersonalInfo.birthDate
                  ? formatPersianDate(parseApiDate(savedPersonalInfo.birthDate))
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      )}
      {apiSuccess && <p className={styles.success}>{apiSuccess}</p>}
    </section>
  );
}

export default PersonalInfo;
