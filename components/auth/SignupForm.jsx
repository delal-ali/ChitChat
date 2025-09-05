"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import InputField from "@/components/auth/inputs/InputField";
import PasswordField from "@/components/auth/inputs/PasswordField";
import SubmitButton from "@/components/auth/SubmitButton";

export default function SignupForm({ apiEndpoint = "/api/signup" }) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    const e = {};
    if (!username) e.username = "Username is required";

    if (!email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";

    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "At least 6 characters";

    if (password !== confirmPassword)
      e.confirmPassword = "Passwords must match";

    if (!acceptedTerms) e.terms = "You must accept the terms";

    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setFieldErrors({});
    setError("");

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAcceptedTerms(false);
      setFieldErrors({});

      router.push("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-black-100 px-4 sm:px-6 md:px-8 min-h-screen">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-pink-200 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl text-pink-600 font-extrabold text-center">
          Sign Up
        </h2>

        <InputField
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={fieldErrors.username}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
        />

        <PasswordField
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
        />

        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors.confirmPassword}
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            id="terms"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="text-gray-600 text-sm">
            I accept the{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              terms & conditions
            </a>
          </label>
        </div>
        {fieldErrors.terms && (
          <p className="text-red-500 text-sm">{fieldErrors.terms}</p>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <SubmitButton
          loading={loading}
          disabled={loading}
          className="w-full sm:w-3xs mt-2 bg-pink-600 hover:bg-pink-500 text-white py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Sign Up
        </SubmitButton>

        <p className="text-center text-gray-500 text-sm sm:text-base">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
