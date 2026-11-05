import { useState } from "react";
import styles from "./WhyTurino.module.css";

const images = [
  "/images/R1.png",
  "/images/R2.png",
  "/images/R3.png",
  "/images/R4.png",
];

function WhyTurino() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < images.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.questionIcon}>؟</span>
          <h2>
            چرا <span>تورینو</span>؟
          </h2>
        </div>

        <div className={styles.description}>
          <h3>تور طبیعت‌گردی و تاریخی</h3>

          <p>
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
            تاریخی را خریداری کنید.
          </p>
        </div>
      </div>

      <div className={styles.gallery}>
        <div className={styles.slider}>
          {images.map((image, index) => {
            const position = index - activeIndex;

            return (
              <img
                key={image}
                src={image}
                alt={`تصویر ${index + 1}`}
                className={`${styles.slide} ${styles[`slide${position}`]}`}
              />
            );
          })}
        </div>

        <div className={styles.pagination}>
          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === images.length - 1}
            aria-label="تصویر بعدی"
          >
            <img src="/icons/flashR.png" />
          </button>

          <span>
            {activeIndex + 1}/{images.length}
          </span>

          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="تصویر قبلی"
          >
            <img src="/icons/flashL.png" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default WhyTurino;
