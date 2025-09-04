'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import InputField from '@/components/auth/inputs/InputField';
import PasswordField from '@/components/auth/inputs/PasswordField';
import SubmitButton from '@/components/auth/SubmitButton';

export default function LoginForm({ apiEndpoint = '/api/login' }) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setError('');

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

       localStorage.setItem("token", data.token);
       localStorage.setItem("user", JSON.stringify(data.user));

      
      router.push(`/chat/${data.user.id}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

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

        {error && (
          <p role="alert" className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <SubmitButton
          type="submit"
          disabled={loading}
          loading={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Log in
        </SubmitButton>

        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
