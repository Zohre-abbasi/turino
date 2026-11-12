import styles from "./Transactions.module.css";

import { formatPersianDateTime } from "../../../utils/dateUtils";
import { formatPersianPrice } from "../../../utils/tourUtils";

function Transactions({ transactions }) {
  if (!transactions.length) {
    return <p>هنوز تراکنشی ثبت نکرده‌اید.</p>;
  }

  return (
    <div className={styles.transactionsContainer}>
      <div className={styles.tableHeader}>
        <span>تاریخ و ساعت</span>
        <span>مبلغ (تومان)</span>
        <span className={styles.desktopOnly}>نوع تراکنش</span>
        <span>شماره سفارش</span>
      </div>

      <div className={styles.transactionsList}>
        {transactions.map((transaction) => (
          <div className={styles.transactionRow} key={transaction.id}>
            <span className={styles.date}>
              {formatPersianDateTime(transaction.createdAt)}
            </span>

            <span className={styles.amount}>
              {formatPersianPrice(transaction.amount)}
            </span>

            <span className={styles.type}>
              {transaction.type === "Purchase" ? "ثبت نام در تور گردشگری" : transaction.type}
            </span>

            <span className={styles.orderNumber}>۱۲۳۴۵</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
