import { useAddTourToBasket } from "../../services/mutations";
import { useRouter } from "next/router";
import { addTourToBasket } from "../../services/basketService";
import toast from "react-hot-toast";

import styles from "./TourDetailsPage.module.css";

import { formatPersianDate } from "../../utils/dateUtils";

import {
  getPersianCityName,
  getPersianVehicleName,
  getTourDuration,
  formatPersianPrice,
} from "../../utils/tourUtils";

const benefits = [
  {
    title: "تورلیدر از مبدأ",
    icon: "/icons/user3.png",
  },
  {
    title: "برنامه سفر",
    icon: "/icons/map.png",
  },
  {
    title: "تضمین کیفیت",
    icon: "/icons/medal.png",
  },
];

function TourDetailsPage({ tour }) {
  const router = useRouter();
  const { mutateAsync, isPending } = useAddTourToBasket();

  if (!tour) return null;
  const handleReserve = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      window.dispatchEvent(new Event("auth-expired"));
      return;
    }

    try {
      const data = await mutateAsync(tour.id);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/checkout");
      }, 1000);
    } catch (error) {
      console.error("Error adding tour to basket:", error);
    }
  };

  const details = [
    {
      title: "مبدأ",
      value: getPersianCityName(tour.origin?.name),
      icon: "/icons/origin1.png",
    },

    {
      title: "تاریخ رفت",
      value: formatPersianDate(tour.startDate),
      icon: "/icons/go.png",
    },
    {
      title: "تاریخ برگشت",
      value: formatPersianDate(tour.endDate),
      icon: "/icons/come.png",
    },
    {
      title: "وسیله نقلیه",
      value: getPersianVehicleName(tour.fleetVehicle),
      icon: "/icons/bus.png",
    },
    {
      title: "ظرفیت",
      value: `${formatPersianPrice(tour.availableSeats)} صندلی`,
      icon: "/icons/profile2.png",
    },
    {
      title: "بیمه",
      value: tour.insurance ? "دارد" : "ندارد",
      icon: "/icons/security.png",
    },
  ];

  const features = [
    {
      title: "حمل و نقل",
      value: getPersianVehicleName(tour.fleetVehicle),
      icon: "/icons/bus.png",
    },
    {
      title: "ظرفیت تور",
      value: `${formatPersianPrice(tour.capacity)} نفر`,
      icon: "/icons/profile2.png",
    },
    {
      title: "بیمه",
      value: tour.insurance ? "دارد" : "ندارد",
      icon: "/icons/security.png",
    },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.tourDetails}>
        <div className={styles.mainInfo}>
          <div className={styles.imageWrapper}>
            <img
              src={tour.image}
              alt={tour.title}
              className={styles.tourImage}
            />
          </div>
          <div className={styles.contentInfo}>
            <div className={styles.titleSection}>
              <h1 className={styles.tourTitle}>{tour.title}</h1>

              <span className={styles.duration}>
                {getTourDuration(tour.startDate, tour.endDate)}
              </span>
            </div>
            <div className={styles.benefits}>
              {benefits.map((item) => (
                <div className={styles.benefitItem} key={item.title}>
                  <img src={item.icon} alt="" className={styles.benefitIcon} />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
            <div className={styles.features}>
              {features.map((item) => (
                <div className={styles.featureItem} key={item.title}>
                  <div className={styles.featureTitle}>
                    <img
                      src={item.icon}
                      alt=""
                      className={styles.featureIcon}
                    />
                    <span>{item.title}</span>
                  </div>

                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className={styles.bookingSection}>
              <button
                type="button"
                className={styles.bookingButton}
                onClick={handleReserve}
                disabled={isPending}
              >
                {isPending ? "در حال افزودن..." : "رزرو و خرید"}
              </button>
              <div className={styles.price}>
                <strong>{formatPersianPrice(tour.price)}</strong>
                <span>تومان</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.desktopDetails}>
          {details.map((item, index) => (
            <div className={styles.detailItem} key={index}>
              <div className={styles.detailLabel}>
                <img src={item.icon} alt="" className={styles.detailIcon} />
                <span>{item.title}</span>
              </div>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TourDetailsPage;
