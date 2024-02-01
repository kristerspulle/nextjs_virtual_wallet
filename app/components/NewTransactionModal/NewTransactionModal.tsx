'use client';

import { useState } from 'react';
import styles from './NewTransactionModal.module.css'
import { Input } from '../Input/Input';
import { Button } from '../Buttons/Buttons';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void
};

const addNewTransaction = async (formValue: { description: string, currency: string, amount: string, type: string}) => {
  const newTransaction = await fetch('http://localhost:3000/api/Transactions', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(formValue)
  })

  return newTransaction.json()
}

const initFormValues = { description: '', currency: '', amount: '', type: ''};

const NewTransactionModal = ({ isOpen, onClose}: ModalProps) => {
  const [formValues, setFormValues] = useState(initFormValues);
  return (
    <div className={isOpen ? styles.openModal : styles.closedModal} onClick={onClose}>
      <form className={styles.modal} onClick={(e) => e.stopPropagation()} onSubmit={() => {
        addNewTransaction(formValues)
        setFormValues(initFormValues)
        }
        }>
        <h1>New Transaction</h1>
        <Input
          type="text"
          placeholder="Enter transaction details"
          id="transactionName"
          value={formValues.description}
          required={true}
          onChange={(e) => {
            setFormValues({...formValues, description: e.target.value})
          }}
        />
        <Input
          type="text"
          placeholder="Enter transaction currency"
          id="transactionCurrency"
          value={formValues.currency}
          required={true}
          onChange={(e) => {
            setFormValues({...formValues, currency: e.target.value})
          }}
        />
        <Input
          type="text"
          placeholder="Enter transaction amount"
          id="transactionAmount"
          value={formValues.amount}
          required={true}
          onChange={(e) => {
            setFormValues({...formValues, amount: e.target.value})
          }}
        />
        <select onChange={(e) => {
            setFormValues({...formValues, type: e.target.value})
          }}>
          <option value="Incoming">Incoming</option>
          <option value="Outgoing">Outgoing</option>
        </select>
        <Button text="Add transaction" type="submit" />
      </form>
    </div>
  );
};

export default NewTransactionModal;
