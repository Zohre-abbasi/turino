import { useState } from "react";
import styles from "./PersonalInfo.module.css";
import dynamic from "next/dynamic";
import { CalendarProvider } from "zaman";

import {
  formatPersianDate,
  formatApiDate,
  parseApiDate,
} from "../../../utils/dateUtils";

const Calendar = dynamic(() => import("zaman").then((mod) => mod.Calendar), {
  ssr: false,
});

function PersonalInfo({ user }) {
  const [isPersonalEditing, setIsPersonalEditing] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    nationalCode: user.nationalCode || "",
    gender: user.gender || "",
    birthDate: user.birthDate || "",
  });

  const [savedPersonalInfo, setSavedPersonalInfo] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    nationalCode: user.nationalCode || "",
    gender: user.gender || "",
    birthDate: user.birthDate || "",
  });

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
              setIsPersonalEditing(true);
            }}
          >
            <img src="/icons/edit1.png" alt="" />
            <span>ویرایش اطلاعات</span>
          </button>
        )}
      </div>

      {isPersonalEditing ? (
        <div className={styles.personalForm}>
          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            value={`${personalInfo.firstName} ${personalInfo.lastName}`.trim()}
            onChange={(e) => {
              const [firstName, ...lastName] = e.target.value.split(" ");

              setPersonalInfo((prev) => ({
                ...prev,
                firstName,
                lastName: lastName.join(" "),
              }));
            }}
          />

          <input
            type="text"
            placeholder="کد ملی"
            value={personalInfo.nationalCode}
            onChange={(e) =>
              setPersonalInfo((prev) => ({
                ...prev,
                nationalCode: e.target.value,
              }))
            }
          />

          <select
            value={personalInfo.gender}
            onChange={(e) =>
              setPersonalInfo((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
          >
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>

          <div className={styles.birthDateWrapper}>
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

                      setPersonalInfo((prev) => ({
                        ...prev,
                        birthDate: formatApiDate(selectedDate),
                      }));

                      setShowCalendar(false);
                    }}
                  />
                </CalendarProvider>
              </div>
            )}
          </div>
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => {
                setSavedPersonalInfo({ ...personalInfo });
                setIsPersonalEditing(false);
              }}
            >
              تأیید
            </button>

            <button
              type="button"
              onClick={() => {
                setPersonalInfo({ ...savedPersonalInfo });
                setIsPersonalEditing(false);
              }}
            >
              انصراف
            </button>
          </div>
        </div>
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
    </section>
  );
}

export default PersonalInfo;
