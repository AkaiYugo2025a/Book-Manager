'use client';

import { useRouter } from 'next/navigation';
import { addBook } from '@/lib/api/api';
import { BookInf } from '@/types/types';

export default function Input() {
  const router = useRouter();

  // ダミーの本情報（あとでフォーム化してもOK）
  const dummyBook: BookInf = {
    id: crypto.randomUUID(),
    category: 0,
    isbn: "0000000000",
    title: "ダミー本",
    author: "ダミー著者",
    publisher: "ダミー出版社",
    date: "2024-01-01",
    cover: "",
  };

  // 登録ボタン押下
  const handleRegister = async () => {
    await addBook(dummyBook);
    router.push('/');
  };

  return (
    <div className="p-4 space-y-6">

      {/* 本情報表示 */}
      <div className="p-4 bg-white rounded-xl shadow">
        <p><strong>タイトル:</strong> {dummyBook.title}</p>
        <p><strong>著者:</strong> {dummyBook.author}</p>
        <p><strong>出版社:</strong> {dummyBook.publisher}</p>
        <p><strong>ISBN:</strong> {dummyBook.isbn}</p>
      </div>

      {/* ボタン */}
      <div className="flex gap-4">
        <button
          className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-xl shadow"
          onClick={() => router.push('/scan')}
        >
          スキャン
        </button>

        <button
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl shadow"
          onClick={handleRegister}
        >
          登録
        </button>
      </div>
    </div>
  );
}
