"use client";

import React, { useEffect, useState } from "react";

function formatToYearMonth(dateStr:string): string | null {

  if (typeof dateStr !== 'string') return null;

    // 数字のみかチェック
    if (!/^\d{6}$|^\d{8}$/.test(dateStr)) {
        return null;
    }

    let year = dateStr.slice(0, 4);
    let month = dateStr.slice(4, 6);;

    // 月の妥当性チェック
    const monthNum = parseInt(month, 10);
    if (monthNum < 1 || monthNum > 12) {
        return null;
    }

    return `${year}/${month}`;
}

type BookInfo = {
  isbn?: string;
  title?: string;
  author?: string;
  publisher?: string;
  date: string | null;
  cover?: string;
};

type Props = {
  isbn: string;
  onBookLoaded?: (book: BookInfo) => void;
};

//export default function BookInfoOpenBd({ isbn }: Props) {
export default function BookInfoOpenBd({ isbn, onBookLoaded }: Props) {

  const [book, setBook] = useState<BookInfo | null>(null);

  useEffect(() => {
    if (!/^\d{13}$/.test(isbn)) return;

    fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`)
      .then((res) => res.json())
      .then((data) => {
        const result = data[0];
        if (!result) {
          setBook(null);
          return;
        }
        console.log(result)
        const info = result.summary;
        console.log(info)
        const newBook: BookInfo = {
          isbn: info.isbn,
          title: info.title,
          author: info.author,
          publisher: info.publisher,
          date: result.hanmoto.datekoukai ?? "",
          cover: result.cover,
        };
        setBook(newBook);

        if (onBookLoaded) {
          onBookLoaded(newBook);
        }
      })
      .catch(() => setBook(null));
  }, [isbn, onBookLoaded]);

  return (
    <div>
      <h4>📚 書籍情報</h4>

      {!book && <p>ISBN を入力すると書籍情報が表示されます</p>}

      {book && (
        <div style={{ marginTop: 12 }}>
          {book.cover && (
            <img
              src={book.cover}
              width={140}
              alt="cover"
              style={{ borderRadius: 8, marginBottom: 12 }}
            />
          )}
          <div><strong>タイトル:</strong> {book.title}</div>
          <div><strong>著者:</strong> {book.author}</div>
          <div><strong>出版社:</strong> {book.publisher}</div>
          <div><strong>発 行:</strong> {book.date}</div>
          <div><strong>ISBN13:</strong> {book.isbn}</div>
        </div>
      )}
    </div>
  );
}
