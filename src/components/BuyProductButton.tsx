'use client';
import { useUserStore } from '@/store/useUserStore';
import { useState } from 'react';

export default function BuyProductButton() {
  const token = useUserStore(state => state.token);
  const setUserData = useUserStore(state => state.setUserData);
  const hasPurchased = useUserStore(state => state.hasPurchased);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const disabled = !token || hasPurchased;

  const handleBuy = async () => {
    setLoading(true); setMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Purchase failed');
      setMsg(data.message || 'Purchase successful!');
      // Update credits and metrics with response
      setUserData({ credits: data.credits, hasPurchased: true });
    } catch (err: any) {
      setMsg(err.message || 'Error');
    }
    setLoading(false);
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleBuy}
        disabled={disabled || loading}
        className={`p-2 rounded text-white ${disabled ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} w-full`}
      >
        {hasPurchased ? 'Already Purchased' : loading ? 'Buying...' : 'Buy Product'}
      </button>
      {!!msg && <div className={msg.startsWith('Purchase') ? "text-green-600" : "text-red-500"} style={{marginTop:8}}>{msg}</div>}
    </div>
  );
}
