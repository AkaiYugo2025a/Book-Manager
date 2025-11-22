import { BookInf } from "../../types/types";

// 全本情報 取得
export const getAllBooks = async (): Promise<BookInf[]> => {
  const res = await fetch('http://localhost:3001/books',
    { cache: 'no-store' }
  );
  const allBooks = await res.json();

  return allBooks;
}

// 本情報 追加
export const addBook = async (book: BookInf): Promise<BookInf> => {
  const res = await fetch('http://localhost:3001/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  const newBook = res.json();

  return newBook;
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

  const res = await fetch(`http://localhost:3001/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      category:   newCategory,
      isbn:       newIsbn,
      title:      newTitle,
      author:     newAuthor,
      publisher:  newPublisher,
      date:       newDate,
      cover:      newCover
    }),
  });
  const updatedBook = res.json();

  return updatedBook;
}

// 本情報 削除
export const deleteBook = async (id: string): Promise<BookInf> => {
  const res = await fetch(`http://localhost:3001/books/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const deletedBooks = res.json();

  return deletedBooks;
}
