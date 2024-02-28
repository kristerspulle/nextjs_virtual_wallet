'use client';

import styles from './page.module.css';
import { useState } from 'react';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const router = useRouter();
  return (
    <main className={styles.main}>
      <h1>Sign In</h1>
      <form
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn('credentials', {
            callbackurl: '/protected/wallets',
            username: formValues.username,
            password: formValues.password,
          });
          router.push('/protected/wallets');
        }}
      >
        <Input
          id="username"
          type="text"
          value={formValues.username}
          required={true}
          placeholder="Username"
          onChange={(e) => {
            setFormValues({ ...formValues, username: e.target.value });
          }}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={formValues.password}
          required={true}
          onChange={(e) => {
            setFormValues({ ...formValues, password: e.target.value });
          }}
        />
        <Button type="submit" text="Sign in" />
      </form>
    </main>
  );
};

export default SignIn;
