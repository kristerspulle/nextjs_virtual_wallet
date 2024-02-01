'use client'

import { Button, DeleteButton } from '@/app/components/Buttons/Buttons'
import styles from './page.module.css'
import { useState } from 'react'
import NewTransactionModal from '@/app/components/NewTransactionModal/NewTransactionModal'

type DashboardPageProps = {
  wallet: Wallet
}

const DashboardPage = ({wallet}: DashboardPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return(
    <main className={styles.wrapper}>
      <NewTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
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
          <Button text='New Transaction' type='button' onClick={() => setIsModalOpen(true)}/>
        </div>
        <div>
          <div className={styles.recent}>Recent transaction table (5)</div>
          <DeleteButton text='See all transactions' type='button'/>
        </div>
      </div>
    </main>
  )
}

export default DashboardPage