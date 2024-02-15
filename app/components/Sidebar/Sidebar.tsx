'use client';

import Link from 'next/link';
import styles from './Sidebar.module.css';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../Button/Button';
import { signOut } from 'next-auth/react';

export const Sidebar = () => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ callbackUrl: 'http://localhost:3000/' })
    localStorage.removeItem('lastOpenedWalletId')
  }
  return (
    <nav className={styles.sidebar}>
      <Link href={'/'} className={styles.logo}>
        <Image
          priority={true}
          className={styles.image}
          width={50}
          height={50}
          src="/logo.png"
          alt={'icon'}
        />
        Wallet
      </Link>
      <a
        className={styles.link}
        onClick={() =>{
          if(localStorage.getItem('lastOpenedWalletId') === null) {
            alert('Open a wallet first')
            router.push('/protected/wallets')
          } else {
            router.push(
              `/protected/dashboard/${localStorage.getItem('lastOpenedWalletId')}`
            )
          }}
        }
      >
        dashboard
      </a>
      <Link href={'/protected/wallets'} className={styles.link}>
        wallets
      </Link>
      <Link href={'/protected/transactions'} className={styles.link}>
        transactions
      </Link>
      <div className={''}>
        <div>Hello</div>
        <Button
          text="Logout"
          type="button"
          onClick={() => handleSignOut()}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
