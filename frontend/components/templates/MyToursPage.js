import { useGetUserTours } from "../../services/queries";
import ParchasedTour from "../modules/MyTours/ParchasedTour";
import UserPanelTabs from "../modules/UserPanel/UserPanelTabs";

import styles from "./MyToursPage.module.css";

function MyToursPage() {
  const { data: tours = [], isPending, isError} = useGetUserTours();

  return (
    <div className={styles.container}>
      <div className={styles.myToursLayout}>
        <aside className={styles.sidebar}>
          <UserPanelTabs activeTab="my-tours" />
        </aside>

        <div className={styles.content}>
          {isPending ? (
            <p>در حال دریافت اطلاعات...</p>
          ) : isError ? (
            <p className={styles.error}>
              دریافت اطلاعات تورها با خطا مواجه شد.
            </p>
          ) : (
            <ParchasedTour tours={tours} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyToursPage;
