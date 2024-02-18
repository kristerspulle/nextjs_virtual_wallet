'use client';

import styles from './Button.module.css';

type ButtonProps = {
  type: HTMLButtonElement['type'];
  text: string;
  onClick?: () => void;
  buttonColor?: string;
  textColor?: string;
};

export const Button = ({
  type,
  text,
  onClick,
  buttonColor,
  textColor,
}: ButtonProps) => {
  const buttonStyle = buttonColor ? styles[buttonColor] : styles.default;
  const textStyle = textColor ? styles[textColor] : styles.default;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${buttonStyle} ${textStyle}`}
    >
      {text}
    </button>
  );
};
