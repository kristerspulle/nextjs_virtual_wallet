'use client'

import { useState } from 'react'
import { Button, OpenWalletButton, DeleteButton } from '../components/Buttons/Buttons'
import NewWalletModal from '../components/NewWalletModal/NewWalletModal'
import styles from './page.module.css'

type WalletsPageProps = {
  wallets: Wallet[]
}

const WalletPage = ({wallets}: WalletsPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <main className={styles.wrapper}>
      <NewWalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1>Wallets</h1>
          <p>List of wallets for your account</p>
        </div>
        <div>
          <Button type='button' text='Create a new wallet' onClick={() => setIsModalOpen(true)}/>
        </div>
      </div>
        <table data-toggle='table' className={`${styles.table} table-primary table-hover`}>
          <thead>
            <tr>
              <th scope="col">Wallet Name</th>
              <th scope="col">Wallet Balance</th>
              <th scope="col">Wallet Currency</th>
              <th scope="col">Wallet Actions</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet: Wallet) => (
              <tr key={wallet._id}>
                <td>{wallet.name}</td>
                <td>{wallet.balance}</td>
                <td>{wallet.currency}</td>
                <td><OpenWalletButton type='button' text='Open' walletId={wallet._id}/></td>
                <td><Button type='button' text='Edit' walletId={wallet._id}/></td>
                <td><DeleteButton type='button' text='Delete' walletId={wallet._id}/></td>
              </tr>
            ))}
          </tbody>
        </table>
    </main>
  )
}

export default WalletPage