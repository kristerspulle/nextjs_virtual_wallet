'use client'

import { useRouter } from 'next/navigation'

type ButtonProps = {
  type: HTMLButtonElement['type'],
  text: string,
  walletId?: string,
  onClick?: () => void
}

export const Button = ({type, text, onClick}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}>{text}</button>
  )
}

export const OpenWalletButton = ({type, text, walletId}: ButtonProps) => {
  const router = useRouter()

  const handleButtonClick = () => {
    localStorage.setItem('lastOpenedWalletId', walletId || '')
    router.push(`/dashboard/${walletId}`)
  }
  
  return (
    <button type={type} onClick={handleButtonClick}>{text}</button>
  )
}

export const DeleteButton = ({type, text, walletId}: ButtonProps) => {

  const deleteWallet = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
      return response.json();
    };

  return (
    <button type={type} onClick={() => deleteWallet(walletId!)}>{text}</button>
  )
}