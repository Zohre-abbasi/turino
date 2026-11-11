import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CalendarProvider } from "zaman";

import {
  formatPersianDate,
  formatApiDate,
  parseApiDate,
} from "../../../utils/dateUtils";

import styles from "./PassengerForm.module.css";

const Calendar = dynamic(() => import("zaman").then((mod) => mod.Calendar), {
  ssr: false,
});

function PassengerForm({ user, register, errors, setValue, watch, reset }) {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src="/icons/profile5.png" />
        <h2>مشخصات مسافر</h2>
      </div>

      <div className={styles.form}>
        <div className={styles.field}>
          <input
            className={styles.input}
            type="text"
            placeholder="نام و نام خانوادگی"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className={styles.error}>{errors.fullName.message}</p>
          )}
        </div>
        <div className={styles.field}>
          <input
            className={styles.input}
            type="text"
            placeholder="کد ملی"
            {...register("nationalCode")}
          />
          {errors.nationalCode && (
            <p className={styles.error}>{errors.nationalCode.message}</p>
          )}
        </div>
        <div className={styles.field}>
          <select className={styles.input} {...register("gender")}>
            <option value="">جنسیت</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
          {errors.gender && (
            <p className={styles.error}>{errors.gender.message}</p>
          )}
        </div>
        <div className={styles.birthDateWrapper}>
          <div className={styles.birthDateInput}>
            <img src="/icons/calendar.png" alt="" />
            <input
              type="text"
              placeholder="تاریخ تولد"
              value={
                watch("birthDate")
                  ? formatPersianDate(parseApiDate(watch("birthDate")))
                  : ""
              }
              readOnly
              onClick={() => setShowCalendar(!showCalendar)}
            />
          </div>
          {errors.birthDate && (
            <p className={styles.error}>{errors.birthDate.message}</p>
          )}
          {showCalendar && (
            <div className={styles.calendarPopup}>
              <CalendarProvider locale="fa" direction="rtl">
                <Calendar
                  defaultValue={
                    watch("birthDate")
                      ? parseApiDate(watch("birthDate"))
                      : undefined
                  }
                  onChange={(e) => {
                    setValue("birthDate", formatApiDate(new Date(e.value)), {
                      shouldValidate: true,
                    });

                    setShowCalendar(false);
                  }}
                />
              </CalendarProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PassengerForm;
