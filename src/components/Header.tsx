'use client';
import { useRouter } from 'next/navigation';

// ヘッダー
export default function Header() {

  const router = useRouter();

  return (
    <header className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">BookManager</h1>

      <button
        className="bg-white text-blue-600 px-4 py-1 rounded-xl shadow"
        onClick={() => router.back()}
      >
        ×
      </button>
    </header>
  );
}
