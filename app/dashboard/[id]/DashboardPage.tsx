'use client';

import { Button } from '@/app/components/Buttons/Buttons';
import styles from './page.module.css';
import { useState } from 'react';
import NewTransactionModal from '@/app/components/NewTransactionModal/NewTransactionModal';
import { format } from 'date-fns';
import Link from 'next/link';

type DashboardPageProps = {
  wallet: Wallet;
  transactions: Transaction[];
};

const DashboardPage = ({ wallet, transactions }: DashboardPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const incomingTotal = transactions
    .filter((transaction) => transaction.type === 'Incoming')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const outgoingTotal = transactions
    .filter((transaction) => transaction.type === 'Outgoing')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const balance = incomingTotal - outgoingTotal;
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
          <div className={styles.balance}>{balance}</div>
          <div className={styles.incoming}>{incomingTotal.toFixed(2)}</div>
          <div className={styles.outgoing}>{outgoingTotal.toFixed(2)}</div>
        </div>
        <div>
          <table className={styles.recent}>
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction._id}>
                    <td className={styles.tableData}>
                      {transaction.description}
                    </td>
                    <td className={styles.tableData}>{transaction.amount}</td>
                    <td className={styles.tableData}>{transaction.type}</td>
                    <td className={styles.tableData}>
                      {format(transaction.createdAt, 'dd.MM.yyyy HH:mm')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link href={`/transactions/${wallet._id}`}>See all transactions</Link>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
