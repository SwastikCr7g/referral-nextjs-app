'use client';
import RegisterForm from '@/components/RegisterForm';
import Image from 'next/image';

export default function RegisterPage() {
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
        <h1 className="text-3xl font-semibold mb-4 text-black dark:text-zinc-50">
          Register
        </h1>
        <RegisterForm />
      </main>
    </div>
  );
}
