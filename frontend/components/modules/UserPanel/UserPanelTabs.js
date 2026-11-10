import Link from "next/link";
import styles from "./UserPanelTabs.module.css";

function UserPanelTabs({ activeTab }) {
  const tabs = [
    {
      id: "profile",
      title: "پروفایل",
      href: "/profile",
      icon: "/icons/profile.png",
    },
    {
      id: "my-tours",
      title: "تورهای من",
      href: "/profile/my-tours",
      icon: "/icons/sun.png",
    },
    {
      id: "transactions",
      title: "تراکنش‌ها",
      href: "/profile/transactions",
      icon: "/icons/card.png",
    },
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`${styles.tab} ${
            activeTab === tab.id ? styles.active : ""
          }`}
        >
          <img src={tab.icon} alt="" />
          <span>{tab.title}</span>
        </Link>
      ))}
    </div>
  );
}

export default UserPanelTabs;
