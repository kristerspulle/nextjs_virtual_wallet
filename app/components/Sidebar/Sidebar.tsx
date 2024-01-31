'use client'

import Link from 'next/link'
import styles from './Sidebar.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export const Sidebar = () => {
  const router = useRouter()

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
      <a className={styles.link} onClick={() => router.push(`/dashboard/${localStorage.getItem('lastOpenedWalletId')}`)}>dashboard</a>
      <Link href={'/wallets'} className={styles.link}>wallets</Link>
      <Link href={'/transactions'} className={styles.link}>transactions</Link>
      {/* <Button text='Login/logout' type='button'/> */}
    </nav>
  )
}

export default Sidebar