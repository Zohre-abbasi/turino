import { useEffect, useState } from "react";
import { getMyTours } from "../../services/tourServices";
import ParchasedTour from "../modules/MyTours/ParchasedTour";
import UserPanelTabs from "../modules/UserPanel/UserPanelTabs";

import styles from "./MyToursPage.module.css";

function MyToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTours() {
      try {
        const data = await getMyTours();
        setTours(data);
      } catch (error) {
        // setError("دریافت اطلاعات تورها با خطا مواجه شد.");
        console.error("خطای دریافت تورهای من:", error);
        console.error("پاسخ سرور:", error.response?.data);
        console.error("کد وضعیت:", error.response?.status);

        setError("دریافت اطلاعات تورها با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.myToursLayout}>
        <aside className={styles.sidebar}>
          <UserPanelTabs activeTab="my-tours" />
        </aside>

        <div className={styles.content}>
          {loading ? (
            <p>در حال دریافت اطلاعات...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <ParchasedTour tours={tours} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyToursPage;
