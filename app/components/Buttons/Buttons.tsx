'use client'

import { useRouter } from 'next/navigation'

type ButtonProps = {
  type: HTMLButtonElement['type'],
  text: string,
  walletId: string
}

export const OpenWalletButton = ({type, text, walletId}: ButtonProps) => {
  const router = useRouter()

  const handleButtonClick = () => {
    localStorage.setItem('lastOpenedWalletId', walletId)
    router.push(`/dashboard/${walletId}`)
  }
  
  return (
    <button type={type} onClick={handleButtonClick}>{text}</button>
  )
}

export const DeleteButton = ({type, text}: ButtonProps) => {
  return (
    <button type={type} >{text}</button>
  )
}