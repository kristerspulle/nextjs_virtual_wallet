'use client';

import styles from './page.module.css';
import { useState } from 'react';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { useRouter } from 'next/navigation';

const addUser = async (userCredentials: {
  username: string;
  password: string;
}) => {
  const newuser = await fetch(`/api/users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userCredentials),
  });

  return newuser.json();
};

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    repeatedPassword: '',
  });
  const router = useRouter();

  const handleSubmit = async () => {
    if (formValues.password === formValues.repeatedPassword) {
      await addUser(formValues);
      router.push('/api/auth/signin');
    } else {
      alert("Password didn't match");
      setFormValues({ ...formValues, repeatedPassword: '' });
    }
  };
  return (
    <div className={styles.wrapper}>
      <h1>Create a new account</h1>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          required={true}
          placeholder="Username"
          id="username"
          label="Enter your username"
          type="text"
          value={formValues.username}
          onChange={(e) => {
            setFormValues({ ...formValues, username: e.target.value });
          }}
        />
        <Input
          required={true}
          placeholder="Password"
          id="password"
          label="Enter your password"
          type="password"
          value={formValues.password}
          onChange={(e) => {
            setFormValues({ ...formValues, password: e.target.value });
          }}
        />
        <Input
          required={true}
          placeholder="Password"
          id="repeatedPassword"
          label="Repeat your password"
          type="password"
          value={formValues.repeatedPassword}
          onChange={(e) => {
            setFormValues({ ...formValues, repeatedPassword: e.target.value });
          }}
        />
        <div className={styles.buttonWrapper}>

        <Button text="Register" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Register;
