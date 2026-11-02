import { useState } from "react";

import dynamic from "next/dynamic";
import { CalendarProvider } from "zaman";
import styles from "./TourSearch.module.css";

const Calendar = dynamic(() => import("zaman").then((mod) => mod.Calendar), {
  ssr: false,
});

const formatPersianDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    calendar: "persian",
  }).format(new Date(date));
};

function TourSearch() {
  const [origin, setOrigin] = useState(null);
  const [showOrigins, setShowOrigins] = useState(false);
  const [destination, setDestination] = useState("");
  const [showDestinations, setShowDestinations] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const origins = [
    { id: "1", name: "تهران" },
    { id: "2", name: "سنندج" },
    { id: "4", name: "اصفهان" },
  ];

  return (
    <div className={styles.tourSearch}>
      <h2>
        <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
      </h2>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.routeFields}>
          {/* مبدأ */}
          <div className={styles.originWrapper}>
            <div className={styles.field}>
              <img src="/icons/location.png" alt="مبدا" />

              <input
                type="text"
                placeholder="مبدا"
                name="origin"
                value={origin?.name || ""}
                onClick={() => setShowOrigins(!showOrigins)}
                readOnly
              />
            </div>

            {showOrigins && (
              <div className={styles.originDropdown}>
                <div className={styles.dropdownTitle}>پرتردد</div>

                {origins.map((item) => (
                  <div
                    key={item.id}
                    className={styles.originOption}
                    onClick={() => {
                      setOrigin(item);
                      setShowOrigins(false);
                    }}
                  >
                    <img src="/icons/location.png" alt="" />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* مقصد */}
          <div className={styles.destinationWrapper}>
            <div className={styles.field}>
              <img src="/icons/global.png" alt="مقصد" />

              <input
                type="text"
                placeholder="مقصد"
                name="destination"
                value={destination}
                onClick={() => setShowDestinations(!showDestinations)}
                readOnly
              />
            </div>

            {showDestinations && (
              <div className={styles.destinationDropdown}>
                <div className={styles.dropdownTitle}>پرتردد</div>

                {/* گزینه‌های مقصد را بعداً از API دریافت می‌کنیم */}
              </div>
            )}
          </div>
        </div>
        <div className={styles.dateWrapper}>
          <div
            className={styles.fieldDate}
            onClick={() => setShowCalendar((prev) => !prev)}
          >
            <img src="/icons/calendar.png" alt="تقویم" />
            <div className={styles.dateInputs}>
              <input
                type="text"
                placeholder="تاریخ"
                name="date"
                value={
                  startDate && endDate
                    ? `${formatPersianDate(startDate)} تا ${formatPersianDate(endDate)}`
                    : ""
                }
                readOnly
              />
            </div>
          </div>
          {showCalendar && (
            <CalendarProvider locale="fa" direction="rtl">
              <Calendar
                className={styles.calendarPopup}
                range
                onChange={(dates) => {
                  setStartDate(dates.from);
                  setEndDate(dates.to);

                  if (dates.from && dates.to) {
                    setShowCalendar(false);
                  }
                }}
              />
            </CalendarProvider>
          )}
        </div>

        <button className={styles.searchButton} type="submit">
          جستجو
        </button>
      </form>
    </div>
  );
}

export default TourSearch;
