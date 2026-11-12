import styles from "./ParchasedTour.module.css";

import {
  formatPersianDateWithWeekday,
  getTourStatus,
} from "../../../utils/dateUtils";

import {
  getPersianCityName,
  getPersianVehicleName,
  formatPersianPrice,
} from "../../../utils/tourUtils";

function ParchasedTour({ tours }) {
  if (!tours.length) {
    return (
      <div className={styles.emptyState}>
        <p>هنوز توری ثبت‌نام نکرده‌اید.</p>
      </div>
    );
  }

  return (
    <div className={styles.toursList}>
      {tours.map((tour, index) => (
        <div className={styles.card} key={`${tour.id}-${index}`}>
          <div className={styles.cardInfo}>
            <div className={styles.tourTitle}>
              <img src="/icons/sun-fog.png" alt="" />
              <h3>{tour.title}</h3>
            </div>
            <div className={styles.vehicle}>
              <img
                src={
                  tour.fleetVehicle === "ship"
                    ? "/icons/ship.png"
                    : tour.fleetVehicle === "bus"
                      ? "/icons/bus1.png"
                      : tour.fleetVehicle === "airplane"
                        ? "/icons/airplane1.png"
                        : "/icons/bus.png"
                }
                alt="حمل ونقل"
              />
              <span>سفر با {getPersianVehicleName(tour.fleetVehicle)}</span>
            </div>
            <span
              className={`${styles.status} ${
                getTourStatus(tour.startDate, tour.endDate) === "به اتمام رسیده"
                  ? styles.completed
                  : getTourStatus(tour.startDate, tour.endDate) ===
                      "در حال برگزاری"
                    ? styles.ongoing
                    : styles.pending
              }`}
            >
              {getTourStatus(tour.startDate, tour.endDate)}
            </span>
            <div className={styles.datesWrapper}>
              <div className={styles.routeDate}>
                <div className={styles.route}>
                  <span>
                    {getPersianCityName(tour.origin?.name)}
                    {" به "}
                    {getPersianCityName(tour.destination?.name)}
                  </span>
                </div>
                <div className={styles.date}>
                  <span className={styles.dateDot}></span>
                  <span>{formatPersianDateWithWeekday(tour.startDate)}</span>
                </div>
              </div>
              <div className={styles.returnDate}>
                <span className={styles.back}>تاریخ برگشت</span>

                <div className={styles.date}>
                  <span className={styles.dateDot}></span>
                  <span>{formatPersianDateWithWeekday(tour.endDate)}</span>
                </div>
              </div>
            </div>
            <div className={styles.emptyStatus}></div>
          </div>

          <hr className={styles.divider} />
          <div className={styles.cardFooter}>
            <div className={styles.tourNumber}>
              <span>شماره تور</span>
              <span dir="ltr">{tour.id.slice(0, 8)}...</span>
            </div>
            <div className={styles.paidPrice}>
              <span className={styles.price}>مبلغ پرداخت‌شده</span>
              <span className={styles.number}>
                {formatPersianPrice(tour.price)}
                <span className={styles.toman}>تومان</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ParchasedTour;
