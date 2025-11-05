'use client';
import { useUserStore } from '@/store/useUserStore';
import { useState } from 'react';

export default function CopyReferralLinkButton() {
  const referralCode = useUserStore(state => state.referralCode);
  const [copied, setCopied] = useState(false);
  if (!referralCode) return null;

  // Build the unique referral URL
  const referralUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/register?ref=${referralCode}`
    : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <div className="mb-2 text-center">
      <button
        onClick={handleCopy}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {copied ? 'Copied!' : 'Copy Referral Link'}
      </button>
      <div className="mt-2 text-xs text-gray-400 break-all">{referralUrl}</div>
    </div>
  );
}
