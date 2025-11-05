'use client';
import { useUserStore } from '@/store/useUserStore';

export default function LogoutButton() {
  const resetUser = useUserStore(state => state.resetUser);

  // If you use JWTs in Zustand, this is enough for assignment.
  // If you use session/cookie auth, add a call to your backend logout API as well.
  const handleLogout = async () => {
    // await fetch('http://localhost:5000/api/logout', { method: 'POST', credentials: 'include' });
    resetUser();
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 mb-2 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-semibold"
    >
      Logout
    </button>
  );
}
