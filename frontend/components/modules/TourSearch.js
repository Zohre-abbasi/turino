import styles from "./TourSearch.module.css";

function TourSearch() {
  return (
    <div className={styles.tourSearch}>
      <h2>
        <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
      </h2>
      <form className={styles.form}>
        <div className={styles.routeFields}>
          <div className={styles.field}>
            <img src="/icons/location.png" alt="مبدا" />
            <input type="text" placeholder="مبدا" name="origin" />
          </div>
          <div className={styles.field}>
            <img src="/icons/global.png" alt="مقصد" />
            <input type="text" placeholder="مقصد" name="destination" />
          </div>
        </div>
        <div className={styles.fieldDate}>
          <img src="/icons/calendar.png" alt="تاریخ" />
          <input type="text" placeholder="تاریخ" name="date" />
        </div>
        <button className={styles.searchButton} type="submit">
          جستجو
        </button>
      </form>
    </div>
  );
}

export default TourSearch;
