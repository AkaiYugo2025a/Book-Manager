'use client';

import { useEffect, useState } from 'react';
import { getAllBooks } from '@/lib/api/api';
import { BookInf } from '@/types/types';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [books, setBooks] = useState<BookInf[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const data = await getAllBooks();
      setBooks(data);
    }
    load();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {/* 本のリスト */}
      <div className="space-y-3">
        {books.map((b) => (
          <div
            key={b.id}
            onClick={() => router.push(`/edit/${b.id}`)}
            className="p-4 bg-white rounded-xl shadow cursor-pointer hover:bg-blue-50 transition border"
          >
            <h2 className="font-bold text-lg">{b.title}</h2>

            <div className="max-h-10 overflow-y-scroll text-sm text-gray-700">
              {b.author}
            </div>

            <div className="max-h-10 overflow-y-scroll text-sm text-gray-500">
              {b.publisher}
            </div>
          </div>
        ))}
      </div>

      {/* 登録ボタン */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => router.push('/input')}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-xl shadow"
        >
          登録
        </button>
      </div>
    </div>
  );
}
