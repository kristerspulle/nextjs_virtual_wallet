'use client';

import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './components/Button/Button';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Home = () => {
  const router = useRouter();
  const session = useSession();
  if (session.status === 'authenticated') {
    redirect('/protected/wallets');
  }

  return (
    <main className={styles.mainWrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image
            priority={true}
            width={50}
            height={50}
            src="/logo.png"
            alt={'icon'}
          />
          Wallet
        </div>
        <div className={styles.authButtons}>
          <Button
            type="button"
            text="Register"
            onClick={() => router.push('/register')}
          />
          <Link href={'/api/auth/signin'} className={styles.signIn}>
            Log in
          </Link>
        </div>
      </div>
      <section className={styles.hero}>
        <div className={styles.wrapper}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.heading}>Virtual Wallet</h1>
            <p className={styles.paragraph}>
              Virtual wallet created to follow up on your daily spendings and
              budget planning
            </p>
            <Image
              priority={true}
              width={600}
              height={508}
              src="/graph.png"
              alt={'graph'}
            />
          </div>
          <div className={styles.vectorWrapper}>
            <Image
              priority={true}
              width={684}
              height={456}
              src="/laptop.png"
              alt={'laptop'}
            />
            <ul className={styles.list}>
              <li>- Create multiple wallets</li>
              <li>- Manage transactions of all the wallets</li>
              <li>- See all the transactions in one place</li>
              <li>- Plan your budget for maximized savings</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
