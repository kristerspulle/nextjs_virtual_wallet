'use client';

import { useState } from 'react';
import {
  Button,
  OpenWalletButton,
  DeleteButton,
} from '../components/Buttons/Buttons';
import NewWalletModal from '../components/NewWalletModal/NewWalletModal';
import styles from './page.module.css';
import { Input } from '../components/Input/Input';
import { useRouter } from 'next/navigation';

type WalletsPageProps = {
  wallets: Wallet[];
};

const WalletPage = ({ wallets }: WalletsPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletNameValue, setWalletNameValue] = useState('');
  const [editingWalletId, setEditingWalletId] = useState<string | null>(null);
  const router = useRouter()
  const handleEdit = (walletId: string) => {
    const walletToEdit = wallets.find((wallet) => wallet._id === walletId)
    setEditingWalletId(walletId);
    setWalletNameValue(walletToEdit!.name)
  };

  const handleSave = async (id: string) => {
    const editWalletName = await fetch(`http://localhost:3000/api/wallets/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(walletNameValue)
    })
    router.refresh()
    setEditingWalletId(null);
    return editWalletName.json()
  };


console.log(walletNameValue);

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
            <th scope="col">Wallet Currency</th>
            <th scope="col">Wallet Actions</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet: Wallet) => (
            <tr key={wallet._id}>
              <td className={styles.tableData}>
                {editingWalletId === wallet._id ? (
                <Input
                  required
                  id={wallet._id}
                  type="text"
                  value={walletNameValue}
                  onChange={(e) => setWalletNameValue(e.target.value)}
                />
                ) : (wallet.name)}
              </td>
              <td className={styles.tableData}>{wallet.currency}</td>
              <td className={styles.tableData}>
                <OpenWalletButton
                  type="button"
                  text="Open"
                  walletId={wallet._id}
                />
                {editingWalletId === wallet._id ? (
                  <Button type="button" text="Save" onClick={() => handleSave(wallet._id)} />
                ) : (
                  <Button type="button" text="Edit" onClick={() => handleEdit(wallet._id)} />
                )}
                <DeleteButton
                  type="button"
                  text="Delete"
                  walletId={wallet._id}
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
