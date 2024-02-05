'use client';

import { format } from 'date-fns';
import { Button } from '../components/Buttons/Buttons';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { Input } from '../components/Input/Input';
type TransactionsPageProps = {
  transactions: Transaction[];
};

const deleteTransaction = async (id: string) => {
  const delTransaction = await fetch(
    `http://localhost:3000/api/transactions/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    }
  );
  return delTransaction.json();
};

const TransactionsPage = ({ transactions }: TransactionsPageProps) => {
  const router = useRouter();
  return (
    <main className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Transactions</h1>
        <p>All of the transactions for your Account</p>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Fraudulent</th>
            <th>Wallet</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Type</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: Transaction) => {
            return (
              <tr key={transaction._id}>
                <td className={styles.tableData}>
                  <Input
                    type="checkbox"
                    id={transaction._id}
                    required={false}
                    value="fraud"
                    onChange={() => 'hi'}
                  />
                </td>
                <td className={styles.tableData}>wallet name</td>
                <td className={styles.tableData}>{transaction.description}</td>
                <td className={styles.tableData}>{transaction.amount}</td>
                <td className={styles.tableData}>{transaction.currency}</td>
                <td className={styles.tableData}>{transaction.type}</td>
                <td className={styles.tableData}>
                  {format(transaction.createdAt, 'dd.MM.yyyy HH:mm')}
                </td>
                <td className={styles.tableData}>
                  <Button
                    text="Delete"
                    type="button"
                    onClick={() => {
                      deleteTransaction(transaction._id);
                      router.refresh();
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default TransactionsPage;
