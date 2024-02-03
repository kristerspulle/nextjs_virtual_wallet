'use client';

import { Button, DeleteButton } from '@/app/components/Buttons/Buttons';
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
  return (
    <main className={styles.wrapper}>
      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className={styles.header}>
        <h1>{wallet.name}</h1>
        <p>Detailed information about {wallet.name}</p>
      </div>
      <div className={styles.details}>
        <div className={styles.balanceInfo}>
          <div className={styles.balance}>{wallet.balance}</div>
          <div className={styles.currency}>{wallet.currency}</div>
          <div className={styles.incoming}>Incoming</div>
          <div className={styles.outgoing}>outgoing</div>
          <Button
            text="New Transaction"
            type="button"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div>
          <table data-toggle="table" className={styles.recent}>
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
                <th scope="col">Currency</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction._id}>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.currency}</td>
                    <td>{transaction.type}</td>
                    <td>{format(transaction.createdAt, 'dd.MM.yyyy HH:mm')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <DeleteButton text="See all transactions" type="button" />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
