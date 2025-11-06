'use client';
import Image from 'next/image';
import { useUserStore } from '@/store/useUserStore';
import RegisterForm from '@/components/RegisterForm';
import LoginForm from '@/components/LoginForm';
import BuyProductButton from '@/components/BuyProductButton';
import LogoutButton from '@/components/LogoutButton';
import CopyReferralLinkButton from '@/components/CopyReferralLinkButton';

export default function Home() {
  // Access Zustand state and actions
  const user      = useUserStore((state) => state.user);
  const credits   = useUserStore((state) => state.credits);
  const referredCount   = useUserStore((state) => state.referredCount);
  const convertedCount  = useUserStore((state) => state.convertedCount);
  const referralCode    = useUserStore((state) => state.referralCode);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center w-full max-w-xl p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <Image
          className="mb-4 dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <h1 className="text-3xl font-semibold mb-4 text-black dark:text-zinc-50">Referral Dashboard</h1>
        <div className="w-full bg-gray-100 dark:bg-zinc-800 p-4 rounded mb-6">
          <div className="mb-1"><b>User:</b> {user || 'Guest'}</div>
          <div className="mb-1"><b>Credits:</b> {credits}</div>
          <div className="mb-1"><b>Total Referred:</b> {referredCount}</div>
          <div className="mb-1"><b>Converted Users:</b> {convertedCount}</div>
          <div className="mb-1"><b>Referral Code:</b> {referralCode || '—'}</div>
        </div>
        {user ? (
          <>
            <CopyReferralLinkButton />
            <LogoutButton />
          </>
        ) : (
          <>
            <RegisterForm />
            <LoginForm />
          </>
        )}
        <BuyProductButton />
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 mt-6">
          Register, login, buy a product, and share your referral link (ex: <b>?ref=SWAS676</b>)!
        </p>
      </main>
    </div>
  );
}
