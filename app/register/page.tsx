'use client';

import { useState } from 'react';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { useRouter } from 'next/navigation';

const addUser = async (userCredentials: {
  username: string;
  password: string;
}) => {
  const newuser = await fetch('http://localhost:3000/api/users', {
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

  const handleSubmit = () => {
    if (formValues.password === formValues.repeatedPassword) {
      addUser(formValues);
      router.push('/api/auth/signin');
    } else {
      alert("Password didn't match");
      setFormValues({ ...formValues, repeatedPassword: '' });
    }
  };
  return (
    <form
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
      <Button text="Register" type="submit" />
    </form>
  );
};

export default Register;
