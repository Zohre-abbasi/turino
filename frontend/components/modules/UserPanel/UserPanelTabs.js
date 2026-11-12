import Link from "next/link";
import styles from "./UserPanelTabs.module.css";

function UserPanelTabs({ activeTab }) {
  const tabs = [
    {
      id: "profile",
      title: "پروفایل",
      href: "/profile",
      icon: "/icons/profile7.png",
      activeIcon: "/icons/profile.png",
    },
    {
      id: "my-tours",
      title: "تورهای من",
      href: "/profile/my-tours",
      icon: "/icons/sun.png",
      activeIcon: "/icons/sun-green.png",
    },
    {
      id: "transactions",
      title: "تراکنش‌ها",
      href: "/profile/transactions",
      icon: "/icons/card.png",
      activeIcon: "/icons/card-green.png",
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
          <img src={activeTab === tab.id ? tab.activeIcon : tab.icon} alt="" />
          <span>{tab.title}</span>
        </Link>
      ))}
    </div>
  );
}

export default UserPanelTabs;
