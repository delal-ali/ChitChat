import { useState, useRef, useEffect } from 'react';

export function useLogin({ apiEndpoint = '/api/auth/login', onSuccess } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  const login = async ({ email, password }) => {
    setError('');

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || 'Login failed');
        return { ok: false, data };
      }

      if (onSuccess) onSuccess(data);
      return { ok: true, data };
    } catch (err) {
      if (err?.name === 'AbortError') {
       
        return { ok: false, aborted: true };
      }
      setError(err?.message || 'Network error');
      return { ok: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  return { login, loading, error };
}
