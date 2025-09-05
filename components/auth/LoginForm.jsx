'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconMail, IconLock } from '@tabler/icons-react';
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
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) e.email = 'Valid email required';
    if (!password || password.length < 6) e.password = 'At least 6 characters';
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push(`/chat/${data.user.id}`);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 flex items-center justify-center bg-black-100 px-4 ">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-indigo-200 p-8 m-20 rounded-2xl shadow-xl w-xl space-y-6 text-indigo-900 h-4vh"
      >
        <h2 className="text-3xl font-extrabold text-center">Log in</h2>

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          icon={<IconMail size={18} />}
        />

        <PasswordField
          label="Password"
          name="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          icon={<IconLock size={18} />}
        />

        {error && (
          <p
            role="alert"
            className="text-red-500 text-sm text-center animate-shake"
          >
            {error}
          </p>
        )}

        <SubmitButton
          type="submit"
          disabled={loading}
          loading={loading}
          className="w-3xs bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg ml-30 mt-3"
        >
          Submit
        </SubmitButton>

        <p className="text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="underline hover:text-indigo-900 transition text-indigo-700"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
