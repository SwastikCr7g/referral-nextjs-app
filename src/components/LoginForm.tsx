'use client';
import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';

export default function LoginForm() {
  const setUserData = useUserStore(state => state.setUserData);
  const resetUser = useUserStore(state => state.resetUser);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(''); setError(''); setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      // Update Zustand state with user details
      setUserData({
        token: data.token,
        user: data.username,
        email: data.email,
        referralCode: data.referralCode,
        credits: data.credits,
        referredCount: data.referredCount,
        convertedCount: data.convertedCount,
        hasPurchased: data.hasPurchased
      });
      setSuccess('Login successful!');
      setForm({ email: '', password: '' });
    } catch (err: any) {
      setError(err.message || 'Error');
      resetUser();
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-gray-50 dark:bg-zinc-800 rounded p-6 w-full max-w-sm mx-auto"
      style={{ marginTop: '24px' }}
    >
      <h2 className="text-xl font-bold mb-2 text-center">Login</h2>
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
      <button
        type="submit"
        disabled={loading}
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {success && <div className="text-green-600 text-center">{success}</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}
    </form>
  );
}
