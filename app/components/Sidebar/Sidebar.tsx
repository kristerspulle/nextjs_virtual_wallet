'use client'

import Link from 'next/link'
import styles from './Sidebar.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../Buttons/Buttons'
import { signOut } from 'next-auth/react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'


export const Sidebar = async () => {
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
      <a className={styles.link} onClick={() => router.push(`/protected/dashboard/${localStorage.getItem('lastOpenedWalletId')}`)}>dashboard</a>
      <Link href={'/protected/wallets'} className={styles.link}>wallets</Link>
      <Link href={'/protected/transactions'} className={styles.link}>transactions</Link>
      <div className={''}>
        <div>Hello</div>
        <Button text='Logout' type='button' onClick={() => {
          signOut()
          router.push('/')
          }}/>
      </div>
    </nav>
  )
}

export default Sidebar