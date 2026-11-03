import { useState } from "react";

import dynamic from "next/dynamic";
import { CalendarProvider } from "zaman";

import { formatPersianDate, parseApiDate } from "../../utils/dateUtils";

import styles from "./TourSearch.module.css";

const Calendar = dynamic(() => import("zaman").then((mod) => mod.Calendar), {
  ssr: false,
});

function TourSearch({ ...searchProps }) {
  const {
    origin,
    setOrigin,
    destination,
    setDestination,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchFilters,
    origins,
    destinations,
    appliedOrigin,
    appliedDestination,
    hasActiveFilters,
    handleSearch,
    handleRemoveFilter,
    handleRemoveAllFilters,
  } = searchProps;

  // وضعیت‌های مربوط به نمایش رابط کاربری
  const [showOrigins, setShowOrigins] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className={styles.tourSearch}>
      <h2>
        <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
      </h2>

      <form className={styles.form} onSubmit={handleSearch}>
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
                value={destination?.name || ""}
                onClick={() => setShowDestinations(!showDestinations)}
                readOnly
              />
            </div>

            {showDestinations && (
              <div className={styles.destinationDropdown}>
                <div className={styles.dropdownTitle}>پرتردد</div>
                {destinations.map((item) => (
                  <div
                    key={item.id}
                    className={styles.destinationOption}
                    onClick={() => {
                      setDestination(item);
                      setShowDestinations(false);
                    }}
                  >
                    <img src="/icons/global.png" alt="" />
                    <span>{item.name}</span>
                  </div>
                ))}
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
      {hasActiveFilters && (
        <div className={styles.activeFilters}>
          <div className={styles.activeFiltersTitle}>فیلترهای اعمال‌شده:</div>

          <div className={styles.filterTags}>
            {appliedOrigin && (
              <button
                type="button"
                className={styles.filterTag}
                onClick={() => handleRemoveFilter("originId")}
              >
                مبدأ: {appliedOrigin.name}
                <span>×</span>
              </button>
            )}

            {appliedDestination && (
              <button
                type="button"
                className={styles.filterTag}
                onClick={() => handleRemoveFilter("destinationId")}
              >
                مقصد: {appliedDestination.name}
                <span>×</span>
              </button>
            )}

            {(searchFilters.startDate || searchFilters.endDate) && (
              <button
                type="button"
                className={styles.filterTag}
                onClick={() => handleRemoveFilter("date")}
              >
                تاریخ:
                {searchFilters.startDate &&
                  formatPersianDate(parseApiDate(searchFilters.startDate))}
                {" تا "}
                {searchFilters.endDate &&
                  formatPersianDate(parseApiDate(searchFilters.endDate))}
                <span>×</span>
              </button>
            )}
          </div>

          <button
            type="button"
            className={styles.clearFilters}
            onClick={() => handleRemoveAllFilters()}
          >
            حذف همه فیلترها
          </button>
        </div>
      )}
    </div>
  );
}

export default TourSearch;
