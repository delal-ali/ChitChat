// components/auth/LoginForm.jsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from './input/InputField';
import PasswordField from './input/PasswordField';
import SubmitButton from './SubmitButton';
import SocialLogin from './SocialLogin';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm({ apiEndpoint = '/api/auth/login' }) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const { login, loading, error } = useLogin({
    apiEndpoint,
    onSuccess: () => {
      router.push('/dashboard');
    },
  });

  const validate = () => {
    const e = {};
    if (!email) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter a valid email';

    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'At least 6 characters';

    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setFieldErrors({});
    if (!validate()) return;

    const result = await login({ email, password });
    
    if (result?.ok) {
      setEmail('');
      setPassword('');
      setFieldErrors({});
    } else if (result?.aborted) {
      

      
    } else {
 
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
      />

      <PasswordField
        label="Password"
        name="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
      />

      {error && <p role="alert">{error}</p>}

      <SubmitButton type="submit" disabled={loading} loading={loading}>
        Log in
      </SubmitButton>

      <SocialLogin />
    </form>
  );
}
