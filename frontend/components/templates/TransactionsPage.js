import { useGetUserTransactions } from "../../services/queries";
import Transactions from "../modules/Transactions/Transactions";
import UserPanelTabs from "../modules/UserPanel/UserPanelTabs";

import styles from "./TransactionsPage.module.css";

function TransactionsPage() {
  const {
    data: transactions = [],
    isPending,
    isError,
  } = useGetUserTransactions();

  return (
    <div className={styles.container}>
      <div className={styles.transactionsLayout}>
        <aside className={styles.sidebar}>
          <UserPanelTabs activeTab="transactions" />
        </aside>

        <div className={styles.content}>
          {isPending ? (
            <p>در حال دریافت اطلاعات...</p>
          ) : isError ? (
            <p className={styles.error}>
              دریافت اطلاعات تراکنش‌ها با خطا مواجه شد.
            </p>
          ) : (
            <Transactions transactions={transactions} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;
