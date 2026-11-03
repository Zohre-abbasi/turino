import styles from "./TourCard.module.css";
import {
  getPersianVehicleName,
  getPersianMonth,
  getTourDuration,
  getHotelStars,
  formatPersianPrice,
} from "../../utils/tourUtils";

function TourCard({ tour }) {
  const { image, title, startDate, endDate, fleetVehicle, price, options } =
    tour;

  const month = getPersianMonth(startDate);
  const duration = getTourDuration(startDate, endDate);
  const vehicle = getPersianVehicleName(fleetVehicle);
  const hotelStars = getHotelStars(options);
  const priceInPersian = formatPersianPrice(price);

  return (
    <article className={styles.card}>
      <img className={styles.image} src={image} alt={title} />

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.details}>
          {month && <span>{month}</span>}
          {duration && <span>{duration}</span>}
          {vehicle && <span>{vehicle}</span>}
          {hotelStars && <span>{hotelStars}</span>}
        </div>

        <div className={styles.divider}></div>

        <div className={styles.footer}>
          <button type="button" className={styles.reserveButton}>
            رزرو
          </button>

          <p className={styles.price}>
            {priceInPersian} <span>تومان</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default TourCard;
