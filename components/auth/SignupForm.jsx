
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from './input/InputField';
import PasswordField from './input/PasswordField';
import Checkbox from './input/Checkbox'; 
import SubmitButton from './SubmitButton';
import SocialLogin from './SocialLogin';
import { useRegister } from '../hooks/useRegister';

export default function SignupForm({ apiEndpoint = '/api/auth/register' }) {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const { register, loading, error } = useRegister({
    apiEndpoint,
    onSuccess: () => {
      router.push('/dashboard');
    },
  });

  const validate = () => {
    const e = {};
    if (!firstName) e.firstName = 'First name required';
    if (!lastName) e.lastName = 'Last name required';

    if (!email) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter a valid email';

    if (!phone) e.phone = 'Phone is required';
    else if (!/^\+?\d{7,15}$/.test(phone)) e.phone = 'Enter a valid phone';

    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'At least 6 characters';

    if (password !== confirmPassword) e.confirmPassword = 'Passwords must match';

    if (!acceptedTerms) e.terms = 'You must accept the terms';

    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setFieldErrors({});
    if (!validate()) return;

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };

    const result = await register(payload);
    if (result?.ok) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setAcceptedTerms(false);
        setFieldErrors({});

        // Successful registration handled by onSuccess redirect
        
    } else if (result?.aborted) {
      // ignore aborted
    } else {
     
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <InputField
        label="First name"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        error={fieldErrors.firstName}
      />
      <InputField
        label="Last name"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        error={fieldErrors.lastName}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
      />
      <InputField
        label="Phone"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={fieldErrors.phone}
      />

      <PasswordField
        label="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
      />
      <PasswordField
        label="Confirm password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={fieldErrors.confirmPassword}
      />

      <Checkbox
        name="terms"
        checked={acceptedTerms}
        onChange={(e) => setAcceptedTerms(e.target.checked)}
        label="I accept the terms and conditions"
        error={fieldErrors.terms}
      />

      {error && <p role="alert">{error}</p>}

      <SubmitButton type="submit" disabled={loading} loading={loading}>
        Sign up
      </SubmitButton>

      <SocialLogin />
    </form>
  );
}
