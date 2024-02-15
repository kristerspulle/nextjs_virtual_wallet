'use client';

import { useState } from 'react';
import styles from './NewWalletModal.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useRouter } from 'next/navigation';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const addNewWallet = async (formValue: string) => {
  const newWallet = await fetch('http://localhost:3000/api/wallets', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name: formValue }),
  });

  return newWallet.json();
};

const NewWalletModal = ({ isOpen, onClose }: ModalProps) => {
  const [formValues, setFormValues] = useState('');
  const router = useRouter();
  return (
    <div
      className={isOpen ? styles.openModal : styles.closedModal}
      onClick={onClose}
    >
      <form
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          addNewWallet(formValues);
          router.refresh();
          setFormValues('');
        }}
      >
        <h1>New Wallet</h1>
        <Input
          type="text"
          placeholder="Enter wallet name"
          id="walletName"
          value={formValues}
          required={true}
          onChange={(e) => {
            setFormValues(e.target.value);
          }}
        />
        <Button text="Add wallet" type="submit" />
      </form>
    </div>
  );
};

export default NewWalletModal;
