'use client';

import { useRouter } from 'next/navigation';
import { addBook } from '@/lib/api/api';
import { BookInf } from '@/types/types';
import { useState } from "react";
import IsbnInput from "../../components/isbn-info/IsbnSelector";
import BookInfoOpenBd from "../../components/isbn-info/BookLookup";

export default function Input() {
  const [isbn, setIsbn] = useState("");
  const router = useRouter();

  const targetBook: BookInf = {
    id: crypto.randomUUID(),
    category: 1,
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    date: "",
    cover: "",
  };

  // 登録ボタン押下
  const handleRegister = async () => {
    await addBook(targetBook);
    router.push('/');
  };

  return (
    <div className="p-4 space-y-6">

      <div style={{ padding: 20 }}>
        <IsbnInput onIsbnChange={setIsbn} />
        <BookInfoOpenBd
          isbn={isbn}
          onBookLoaded = { (book) => {
            targetBook.isbn = book.isbn || "";
            targetBook.title = book.title || "";
            targetBook.author = book.author || "";
            targetBook.publisher = book.publisher || "";
            targetBook.date = book.date || "";
            console.log("Loaded book:", targetBook);
          }}
        />
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
