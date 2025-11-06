'use client';
import { Suspense } from 'react';
import Form from './RegisterFormActual';

export default function RegisterForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form />
    </Suspense>
  );
}
