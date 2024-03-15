'use client';

import { format } from 'date-fns';
import { Button } from '../../components/Button/Button';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { Input } from '../../components/Input/Input';
import { useEffect, useState } from 'react';
type TransactionsPageProps = {
  transactions: Transaction[];
};

const deleteTransaction = async (id: string) => {
  const delTransaction = await fetch(
    `/api/transactions/${id}`,
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
  const [fraudulentTransactions, setFraudulentTransactions] = useState<
    string[]
  >([]);
  const router = useRouter();

  const handleCheckboxChange = (transactionId: string) => {
    setFraudulentTransactions((prevCheckedTransactions) => {
      if (prevCheckedTransactions.includes(transactionId)) {
        return prevCheckedTransactions.filter((id) => id !== transactionId);
      } else {
        return [...prevCheckedTransactions, transactionId];
      }
    });
  };

  useEffect(() => {
    const storedFraudulentTransactions = localStorage.getItem(
      'fraudulentTransactions'
    );
    if (storedFraudulentTransactions) {
      const parsedTransactions = JSON.parse(storedFraudulentTransactions);

      if (Array.isArray(parsedTransactions) && parsedTransactions.length > 0) {
        setFraudulentTransactions(parsedTransactions);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'fraudulentTransactions',
      JSON.stringify(fraudulentTransactions)
    );
  }, [fraudulentTransactions]);

  return (
    <main className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Transactions</h1>
        <p>All of the transactions for your Account</p>
      </div>
      {transactions.length === 0 ? (
        <h1>There are no transactions made in any of your wallets.</h1>
      ) : (
      <table className={`${styles.table} table table-bordered`}>
        <thead>
          <tr>
            <th>Fraudulent</th>
            <th>Wallet</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {transactions.map((transaction: Transaction) => {
            return (
              <tr
                key={transaction._id}
                className={
                  fraudulentTransactions.includes(transaction._id)
                    ? styles.fraudulentTransaction
                    : ''
                }
              >
                <td className={styles.tableData}>
                  <Input
                    type="checkbox"
                    id={transaction._id}
                    required={false}
                    value="fraud"
                    checked={fraudulentTransactions.includes(transaction._id)}
                    onChange={() => handleCheckboxChange(transaction._id)}
                  />
                </td>
                <td className={styles.tableData}>wallet name</td>
                <td className={styles.tableData}>{transaction.description}</td>
                <td
                  className={`${styles.tableData} ${
                    transaction.type === 'Incoming'
                      ? styles.incoming
                      : styles.outgoing
                  }`}
                >
                  €{transaction.amount.toFixed(2)}
                </td>
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
                    buttonColor="red"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      )}
    </main>
  );
};

export default TransactionsPage;
