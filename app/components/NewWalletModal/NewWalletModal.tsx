'use client';

import { useState } from 'react';
import styles from './NewWalletModal.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Buttons/Buttons';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void
};

const addNewWallet = async (formValue: {name: string, currency: string}) => {
  const newWallet = await fetch('http://localhost:3000/api/wallets', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(formValue)
  })

  return newWallet.json()
}

const initFormValues = { name: '', currency: '' };

const NewWalletModal = ({ isOpen, onClose }: ModalProps) => {
  const [formValues, setFormValues] = useState(initFormValues);
  return (
    <div className={isOpen ? styles.openModal : styles.closedModal} onClick={onClose}>
      <form className={styles.modal} onClick={(e) => e.stopPropagation()} onSubmit={() => {
        addNewWallet(formValues)
        setFormValues(initFormValues)
        }
        }>
        <h1>New Wallet</h1>
        <Input
          type="text"
          placeholder="Enter wallet name"
          id="walletName"
          value={formValues.name}
          required={true}
          onChange={(e) => {
            setFormValues({...formValues, name: e.target.value})
          }}
        />
        <Input
          type="text"
          placeholder="Enter wallet currency"
          id="walletCurrency"
          value={formValues.currency}
          required={true}
          onChange={(e) => {
            setFormValues({...formValues, currency: e.target.value})
          }}
        />
        <Button text="Add wallet" type="submit" />
      </form>
    </div>
  );
};

export default NewWalletModal;
