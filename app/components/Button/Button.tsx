'use client'

type ButtonProps = {
  type: HTMLButtonElement['type'],
  text: string,
  onClick?: () => void
}

export const Button = ({type, text, onClick}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}>{text}</button>
  )
}
