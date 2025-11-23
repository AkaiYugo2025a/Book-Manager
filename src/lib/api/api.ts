//import fs from "fs";
//import path from "path";
import { BookInf } from "../../types/types";

// src/data/books.json を読み込む
import booksJson from '@/data/books.json';
let allBooks: BookInf[] = booksJson.books;

// 全本情報 更新
export const updateAllBooks = async ():Promise<void> => {
  await fetch("/lib", {
    method: "POST",
    body: JSON.stringify({ books: allBooks }),
  });
}

// 指定IDの本情報が存在するかチェック
// （存在すればそのインデックス、しなければ-1 を返す）
const checkIdExists = (id: string): number => {
  return allBooks.findIndex((b) => b.id === id);
}
// 同一ISBNDの本情報が存在するかチェック
const checkBookExists = (isbn: string): number => {
  return allBooks.findIndex((b) => b.isbn === isbn);
}

// 全本情報 取得
export const getAllBooks = async (): Promise<BookInf[]> => {

  // async を維持するため Promise.resolve で包む
  return Promise.resolve(allBooks);
}

// 本情報 追加
export const addBook = async (book: BookInf): Promise<BookInf> => {

  console.warn(`addBook: ${book.id}`);

  if (checkIdExists(book.id) === -1) {
    allBooks = [...allBooks, book];
  }
  else {
    console.warn(`ID ${book.id} は既に存在します`);
    // TODO 同じISBNが存在する場合の挙動
  }

  return Promise.resolve(book);
}

// 本情報 編集
export const editBook = async (
  id: string,
  newCategory: string,
  newIsbn: string,
  newTitle: string,
  newAuthor: string,
  newPublisher: string,
  newDate: string,
  newCover: string ): Promise<BookInf> => {

  const index = checkIdExists(id);
  if (index === -1) {
    // TODO 編集対象のISBNが存在しない場合の挙動
    // console.warn(`ISBN ${newIsbn} は存在しません`);
  }

   const updated: BookInf = {
    ...allBooks[index],
    category: newCategory,
    isbn: newIsbn,
    title: newTitle,
    author: newAuthor,
    publisher: newPublisher,
    date: newDate,
    cover: newCover,
  };

  allBooks = [
    ...allBooks.slice(0, index),
    updated,
    ...allBooks.slice(index + 1),
  ];

  return Promise.resolve(updated);
}

// 本情報 削除
export const deleteBook = async (id: string): Promise<BookInf> => {

  console.warn(`deleteBook: ${id}`);

  const index = checkIdExists(id);
  if (index === -1) {
    // TODO 削除対象が存在しない場合の挙動
    // console.warn(`ID ${id} は存在しません`);
  }
  const deleted = allBooks[index];
  allBooks = allBooks.filter((b) => b.id !== id);

  return Promise.resolve(deleted);
}
