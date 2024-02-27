'use client';

import styles from './page.module.css';
import { useState } from 'react';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';

const SignIn = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  return (
    <main className={styles.main}>
      <h1>Sign In</h1>
      <p>
        If you don`t have an account already, just fill in your credentials and
        an account will be created for you!
      </p>
      <form className={styles.form} onSubmit={() => ''}>
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
        <Button type="submit" text="Sign in / Register" />
      </form>
    </main>
  );
};

export default SignIn;
