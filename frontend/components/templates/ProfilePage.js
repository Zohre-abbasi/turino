import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserPanelTabs from "../modules/UserPanel/UserPanelTabs";
import AccountInfo from "../modules/Profile/AccountInfo";
import PersonalInfo from "../modules/Profile/PersonalInfo";
import BankInfo from "../modules/Profile/BankInfo";

import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const router = useRouter();

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      const timer = setTimeout(() => {
        router.replace("/");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <p>در حال بررسی اطلاعات حساب کاربری...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileLayout}>
        <aside className={styles.sidebar}>
          <UserPanelTabs activeTab="profile" />
        </aside>

        <div className={styles.content}>
          <div className={styles.profileCards}>
            <AccountInfo user={user} />
            <PersonalInfo user={user} />
            <BankInfo user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
