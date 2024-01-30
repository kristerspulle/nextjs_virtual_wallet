'use client'

import Link from 'next/link'
import styles from './Sidebar.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export const Sidebar = () => {
  const [walletId, setWalletId] = useState<string | null>(localStorage.getItem('lastOpenedWalletId'));

  useEffect(() => {
    // Update walletId when localStorage changes
    const handleStorageChange = () => {
      setWalletId(localStorage.getItem('lastOpenedWalletId'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // const walletId = localStorage.getItem('lastOpenedWalletId')

  return (
    <nav className={styles.sidebar}>
      <Link href={'/'} className={styles.logo}>
        <Image
        priority={true}
        className={styles.image}
        width={50}
        height={50}
        src='/logo.png'
        alt={'icon'}
      />
        Wallet
      </Link>
      <Link href={`/dashboard/${walletId}`} className={styles.link}>dashboard</Link>
      <Link href={'/wallets'} className={styles.link}>wallets</Link>
      <Link href={'/transactions'} className={styles.link}>transactions</Link>
      {/* <Button text='Login/logout' type='button'/> */}
    </nav>
  )
}

export default Sidebar