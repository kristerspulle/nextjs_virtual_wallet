'use client';

import { Button } from '@/app/components/Button/Button';
import styles from './page.module.css';
import { useState } from 'react';
import NewTransactionModal from '@/app/components/NewTransactionModal/NewTransactionModal';
import { format } from 'date-fns';

type DashboardPageProps = {
  wallet: Wallet;
  transactions: Transaction[];
};

const DashboardPage = ({ wallet, transactions }: DashboardPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedTransactions, setDisplayedTransactions] = useState(5);

  const incomingTotal = transactions
    .filter((transaction) => transaction.type === 'Incoming')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const outgoingTotal = transactions
    .filter((transaction) => transaction.type === 'Outgoing')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = (incomingTotal - outgoingTotal).toFixed(2);

  const transactionsToShow = transactions.slice(0, displayedTransactions);

  return (
    <main className={styles.wrapper}>
      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1>{wallet.name}</h1>
          <p>Detailed information about {wallet.name}</p>
        </div>
        <div>
          <Button
            text="New Transaction"
            type="button"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.balanceInfo}>
          <div className={styles.balance}>€{balance}</div>
          <div className={styles.incomingTotal}>€{incomingTotal.toFixed(2)}</div>
          <div className={styles.outgoingTotal}>€{outgoingTotal.toFixed(2)}</div>
        </div>
        <div>
          <table className={styles.recent}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactionsToShow.map((transaction) => {
                return (
                  <tr key={transaction._id}>
                    <td className={styles.tableData}>
                      {transaction.description}
                    </td>
                    <td className={`${styles.tableData} ${
                    transaction.type === 'Incoming'
                      ? styles.incoming
                      : styles.outgoing
                  }`}>€{(transaction.amount).toFixed(2)}</td>
                    <td className={styles.tableData}>{transaction.type}</td>
                    <td className={styles.tableData}>
                      {format(transaction.createdAt, 'dd.MM.yyyy HH:mm')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            {transactions.length <= 5 ? (
              ''
            ) : transactions.length <= transactionsToShow.length ? (
              <Button
                text="Collapse"
                type="button"
                onClick={() => setDisplayedTransactions(5)}
              />
            ) : (
              <Button
                text="Show more"
                type="button"
                onClick={() =>
                  setDisplayedTransactions(displayedTransactions + 5)
                }
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
