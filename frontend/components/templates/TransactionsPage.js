import { useEffect, useState } from "react";
import { getMyTransactions } from "../../services/tourServices";
import Transactions from "../modules/Transactions/Transactions";
import UserPanelTabs from "../modules/UserPanel/UserPanelTabs";

import styles from "./TransactionsPage.module.css";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await getMyTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("خطای دریافت تراکنش‌ها:", error);
        console.error("پاسخ سرور:", error.response?.data);
        console.error("کد وضعیت:", error.response?.status);

        setError("دریافت اطلاعات تراکنش‌ها با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.transactionsLayout}>
        <aside className={styles.sidebar}>
          <UserPanelTabs activeTab="transactions" />
        </aside>

        <div className={styles.content}>
          {loading ? (
            <p>در حال دریافت اطلاعات...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <Transactions transactions={transactions} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;
