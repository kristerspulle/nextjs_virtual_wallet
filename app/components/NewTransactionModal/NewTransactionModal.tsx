'use client';

import { useState } from 'react';
import styles from './NewTransactionModal.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useParams, useRouter } from 'next/navigation';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const initFormValues = { description: '', amount: '', type: 'Incoming' };

const NewTransactionModal = ({ isOpen, onClose }: ModalProps) => {
  const [formValues, setFormValues] = useState(initFormValues);
  const params = useParams();
  const router = useRouter();

  const addNewTransaction = async (formValue: {
    description: string;
    amount: string;
    type: string;
  }) => {
    const newTransaction = await fetch(
      `http://localhost:3000/api/wallets/${params.id}/transactions`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formValue),
      }
    );

    return newTransaction.json();
  };

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
          addNewTransaction(formValues);
          setFormValues(initFormValues);
          router.refresh();
        }}
      >
        <h1>New Transaction</h1>
        <Input
          type="text"
          placeholder="Enter transaction details"
          id="transactionName"
          value={formValues.description}
          required={true}
          onChange={(e) => {
            setFormValues({ ...formValues, description: e.target.value });
          }}
        />
        <Input
          type="text"
          placeholder="0"
          id="transactionAmount"
          value={formValues.amount}
          required={true}
          onChange={(e) => {
            setFormValues({ ...formValues, amount: e.target.value });
          }}
        />
        <select
          onChange={(e) => {
            setFormValues({ ...formValues, type: e.target.value });
          }}
          id='transactionType'
        >
          <option value="Incoming">Incoming</option>
          <option value="Outgoing">Outgoing</option>
        </select>
        <Button text="Add transaction" type="submit" />
      </form>
    </div>
  );
};

export default NewTransactionModal;
