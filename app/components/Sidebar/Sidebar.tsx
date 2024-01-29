import styles from './Sidebar.module.css'
import Image from 'next/image'

export const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <Image
        priority={true}
        className={styles.image}
        width={50}
        height={50}
        src='/logo.png'
        alt={'icon'}
      />
        Wallet
      </div>
      <div className={styles.link}>dashboard</div>
      <div className={styles.link}>wallets</div>
      <div className={styles.link}>transactions</div>
      <div className={styles.link}>logout/login</div>
    </nav>
  )
}

export default Sidebar