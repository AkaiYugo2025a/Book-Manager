import { BookInf } from "../../types/types";
import { DB } from "../db";

// 全本情報 取得
export const getAllBooks = async (): Promise<BookInf[]> => {

  // async を維持するため Promise.resolve で包む
  return Promise.resolve(DB.instance().selectAll());
}

// 本情報 追加
export const addBook = async (book: BookInf): Promise<BookInf> => {

  console.warn(`addBook: ${book.id}`);

  DB.instance().insert(book);

  return Promise.resolve(book);
}

// 本情報 編集
export const editBook = async (
  id: string,
  newCategory: number,
  newIsbn: string,
  newTitle: string,
  newAuthor: string,
  newPublisher: string,
  newDate: string,
  newCover: string ): Promise<BookInf> => {

  // ToDO  暫定対応
  const updated = DB.instance().select(id);

  DB.instance().update(
    id,
    newCategory,
    newIsbn,
    newTitle,
    newAuthor,
    newPublisher,
    newDate,
    newCover
  );

  return Promise.resolve(updated);
}

// 本情報 削除
export const deleteBook = async (id: string): Promise<BookInf> => {

  console.warn(`deleteBook: ${id}`);

  // ToDO  暫定対応
  const deleted = DB.instance().select(id);

  DB.instance().delete(id);
  return Promise.resolve(deleted);
}
