import { getTourDuration, formatPersianPrice } from "../../../utils/tourUtils";

import styles from "./TourSummary.module.css";

function TourSummary({ tour }) {
  return (
    <div className={styles.container}>
      <div className={styles.tourInfo}>
        <span className={styles.tourTitle}>{tour.title}</span>
        <span className={styles.duration}>
          {getTourDuration(tour.startDate, tour.endDate)}
        </span>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.priceSection}>
        <span>قیمت نهایی</span>

        <div className={styles.price}>
          <strong>{formatPersianPrice(tour.price)}</strong>
          <span>تومان</span>
        </div>
      </div>

      <button type="submit" className={styles.button}>
        ثبت و خرید نهایی
      </button>
    </div>
  );
}

export default TourSummary;
