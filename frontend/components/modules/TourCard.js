import styles from "./TourCard.module.css";

// تبدیل مقدار وسیله نقلیه به متن فارسی
const vehicleNames = {
  bus: "اتوبوس",
  ship: "کشتی",
  train: "قطار",
  airplane: "هواپیما",
  SUV: " شاسی‌بلند",
};

// استخراج ماه فارسی از تاریخ شروع تور
const getPersianMonth = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("fa-IR", {
    month: "long",
    calendar: "persian",
  }).format(new Date(date));
};

// محاسبه مدت تور بر اساس اختلاف تاریخ شروع و پایان
const getTourDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = end.getTime() - start.getTime();
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return days > 0 ? `${days} روزه` : "";
};

// استخراج تعداد ستاره‌های هتل از options
const getHotelStars = (options = []) => {
  const hotelOption = options.find((option) => /هتل|هفل/.test(option));

  if (!hotelOption) return "";

  const match = hotelOption.match(/(یک|دو|سه|چهار|پنج|\d+)\s*ستاره/);

  if (!match) return "";

  const numberNames = {
    یک: "یک",
    دو: "دو",
    سه: "سه",
    چهار: "چهار",
    پنج: "پنج",
  };

  const stars = numberNames[match[1]] || match[1];

  return `هتل ${stars} س`;
};

function TourCard({ tour }) {
  const { image, title, startDate, endDate, fleetVehicle, price, options } =
    tour;

  const month = getPersianMonth(startDate);
  const duration = getTourDuration(startDate, endDate);
  const vehicle = vehicleNames[fleetVehicle] || fleetVehicle;
  const hotelStars = getHotelStars(options);

  const priceInPersian = new Intl.NumberFormat("fa-IR").format(price);

  return (
    <article className={styles.card}>
      <img className={styles.image} src={image} alt={title} />

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.details}>
          {month && <span>{month}</span>}
          {duration && <span>{duration}</span>}
          {vehicle && <span>{vehicle}</span>}
          {hotelStars && <span>{hotelStars}...</span>}
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
