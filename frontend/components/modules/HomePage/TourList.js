import { useState } from "react";

import TourCard from "./TourCard";
import styles from "./TourList.module.css";

function TourList({ tours = [] }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>همه تورها</h2>

      {tours.length === 0 ? (
        <p className={styles.empty}>توری برای نمایش وجود ندارد.</p>
      ) : (
        <>
          <div className={`${styles.list} ${showAll ? styles.expanded : ""}`}>
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {tours.length > 4 && (
            <button
              type="button"
              className={styles.showMore}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "مشاهده کمتر" : "مشاهده بیشتر"}
              <span>
                <img src="/icons/arrow.png" alt="" />
              </span>
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default TourList;
