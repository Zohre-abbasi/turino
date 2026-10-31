import styles from "./Banner.module.css";

function Banner() {
  return (
    <div className={styles.banner}>
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/images/banner-des.png"
        />
        <img src="/images/banner-mob.png" alt="بنر تورینو" />
      </picture>
    </div>
  );
}

export default Banner;
