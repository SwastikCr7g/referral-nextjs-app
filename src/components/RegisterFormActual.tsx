'use client';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { useSearchParams } from 'next/navigation';

export default function Form() {
  const setUserData = useUserStore(state => state.setUserData);
  const [form, setForm] = useState({ username: '', email: '', password: '', referral: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');

  useEffect(() => {
    if (ref) {
      setForm(prev => ({ ...prev, referral: ref }));
    }
  }, [ref]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(''); setError(''); setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setSuccess('Registration successful!');
      setForm({ username: '', email: '', password: '', referral: '' });
    } catch (err: any) {
      setError(err.message || 'Error');
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-gray-50 dark:bg-zinc-800 rounded p-6 w-full max-w-sm mx-auto"
      style={{ marginTop: '24px' }}
    >
      <h2 className="text-xl font-bold mb-2 text-center">Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="referral"
        placeholder="Referral code (optional)"
        value={form.referral}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
      {success && <div className="text-green-600 text-center">{success}</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}
    </form>
  );
}
