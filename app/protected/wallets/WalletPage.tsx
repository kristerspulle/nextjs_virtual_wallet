'use client';

import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import NewWalletModal from '../../components/NewWalletModal/NewWalletModal';
import styles from './page.module.css';
import { Input } from '../../components/Input/Input';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type WalletsPageProps = {
  wallets: Wallet[];
};

const WalletPage = ({ wallets }: WalletsPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletNameValue, setWalletNameValue] = useState('');
  const [editingWalletId, setEditingWalletId] = useState<string | null>(null);
  const router = useRouter();

  const handleEdit = (walletId: string) => {
    const walletToEdit = wallets.find((wallet) => wallet._id === walletId);
    setEditingWalletId(walletId);
    setWalletNameValue(walletToEdit!.name);
  };

  const handleOpenWallet = (walletId: string) => {
    localStorage.setItem('lastOpenedWalletId', walletId || '');
    router.push(`/protected/dashboard/${walletId}`);
  };

  const deleteWallet = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    return response.json();
  };

  const handleSave = async (id: string) => {
    const editWalletName = await fetch(
      `http://localhost:3000/api/wallets/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(walletNameValue),
      }
    );
    router.refresh();
    setEditingWalletId(null);
    return editWalletName.json();
  };

  return (
    <main className={styles.wrapper}>
      <NewWalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1>Wallets</h1>
          <p>List of wallets for your account</p>
        </div>
        <div>
          <Button
            type="button"
            text="Create a new wallet"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      <table
        data-toggle="table"
        className={`${styles.table} table-primary table-hover`}
      >
        <thead>
          <tr>
            <th scope="col">Wallet Name</th>
            <th scope="col">Wallet Actions</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet: Wallet) => (
            <tr className={styles.tableRow} key={wallet._id}>
              <td className={styles.tableData}>
                {editingWalletId === wallet._id ? (
                  <Input
                    required
                    id={wallet._id}
                    type="text"
                    value={walletNameValue}
                    onChange={(e) => setWalletNameValue(e.target.value)}
                  />
                ) : (
                  wallet.name
                )}
              </td>
              <td className={styles.tableActions}>
                <Button
                  type="button"
                  text="Open"
                  onClick={() => handleOpenWallet(wallet._id)}
                  buttonColor='green'
                  textColor='blackText'
                />
                {editingWalletId === wallet._id ? (
                  <Button
                    type="button"
                    text="Save"
                    onClick={() => handleSave(wallet._id)}
                    buttonColor='green'
                    textColor='blackText'
                  />
                ) : (
                  <Button
                    type="button"
                    text="Edit"
                    onClick={() => handleEdit(wallet._id)}
                    buttonColor='yellow'
                    textColor='blackText'
                  />
                )}
                <Button
                  type="button"
                  text="Delete"
                  onClick={() => {
                    deleteWallet(wallet._id);
                    router.refresh();
                  }}
                  buttonColor='red'
                  textColor='blackText'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default WalletPage;
