'use client';

import React, { useEffect, useState } from 'react';
import { updateAllBooks,getAllBooks, editBook, deleteBook } from '@/lib/api/api';
import { BookInf } from '@/types/types';
import { useRouter } from 'next/navigation';

const categories = ["在 庫", "購 入", "希 望", "出庫済"];

export default function Edit({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);

  const [book, setBook] = useState<BookInf | null>(null);

  useEffect(() => {
    async function load() {
      const books = await getAllBooks();
      const target = books.find((b) => b.id === id);
      if (target) setBook(target);
    }
    load();
  }, [id]);

  if (!book) return <div className="p-4">Loading...</div>;

  const handleUpdate = async () => {
    await editBook(
      id,
      String(book.category),
      book.isbn,
      book.title,
      book.author,
      book.publisher,
      book.date,
      book.cover
    );
    router.push('/');
  };

  const handleDelete = async () => {
    await deleteBook(id);
    updateAllBooks()
    router.push('/');
  };

  return (
    <div className="p-4 space-y-6">

      {/* 入力フォーム */}
      <div className="space-y-4 bg-white p-4 shadow rounded-xl">

        <input
          className="w-full p-2 border rounded"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          value={book.publisher}
          onChange={(e) => setBook({ ...book, publisher: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          value={book.isbn}
          onChange={(e) => setBook({ ...book, isbn: e.target.value })}
        />

        <input
          type="date"
          className="w-full p-2 border rounded"
          value={book.date}
          onChange={(e) => setBook({ ...book, date: e.target.value })}
        />

        {/* category セレクト */}
        <select
          className="w-full p-2 border rounded"
          value={categories[book.category]}
          onChange={(e) =>
            setBook({ ...book, category: categories.indexOf(e.target.value) })
          }
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* ボタン */}
      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-bold"
        >
          登録
        </button>

        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl font-bold"
        >
          削除
        </button>
      </div>

    </div>
  );
}
