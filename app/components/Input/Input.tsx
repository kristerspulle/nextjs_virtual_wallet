import { ChangeEvent } from 'react';
import styles from './Input.module.css';

type InputProps = {
  id: string;
  type: HTMLInputElement['type'];
  placeholder?: string;
  label?: string;
  value: string;
  onChange: (e) => void;
  required: boolean;
  checked?: boolean
};

export const Input = ({
  id,
  type,
  placeholder,
  label,
  value,
  onChange,
  required,
  checked
}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        checked={checked}
      />
    </div>
  );
};
