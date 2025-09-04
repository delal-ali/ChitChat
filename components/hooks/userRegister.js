import { useState, useRef, useEffect } from 'react';

export function useRegister({ apiEndpoint = '/api/signup', onSuccess } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  const register = async (payload) => {
    setError('');
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = await res.json();

      if (!res.ok) {
        // backend sends errors in `error` key
        setError(data?.error || 'Registration failed');
        return { ok: false, data };
      }

      // success response contains user object
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

  useEffect(() => () => abortRef.current?.abort(), []);
  return { register, loading, error };
}
