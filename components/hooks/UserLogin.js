"use client";
import { useState, useRef, useEffect } from "react";

export function useLogin({ apiEndpoint = "/api/login", onSuccess } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const abortRef = useRef(null);

  // Load saved token/user from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async ({ email, password }) => {
    setError("");

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Login failed");
        return { ok: false, data };
      }

      
      localStorage.setItem("token", data.token);
      console.log("Login token:", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      if (onSuccess) onSuccess(data);

      return { ok: true, data };
    } catch (err) {
      if (err?.name === "AbortError") {
        return { ok: false, aborted: true };
      }
      setError(err?.message || "Network error");
      return { ok: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

 
  const userId = user?.id || null;

  return { login, logout, loading, error, user, userId, token };
}
