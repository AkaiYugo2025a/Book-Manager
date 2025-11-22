import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getAllBooks, addBook, editBook, deleteBook } from "./api";
import { BookInf } from "../../types/types";

const mockBooks: BookInf[] = [
    {
      "id": "1",
      "category": 0,
      "isbn": "9784295020806",
      "title": "HTML & CSS全事典 : Web制作必携",
      "author": "加藤,善規 インプレス(2014年)",
      "publisher": "インプレス",
      "date": "2024-10-09",
      "cover": ""
    },
    {
      "id": "2",
      "category": 0,
      "isbn": "9784295020806",
      "title": "HTML & CSS全事典 : Web制作必携",
      "author": "加藤,善規 インプレス(2014年)",
      "publisher": "インプレス",
      "date": "2024-10-09",
      "cover": ""
    },
    {
      "id": "3",
      "category": 0,
      "isbn": "9784295020806",
      "title": "HTML & CSS全事典 : Web制作必携",
      "author": "加藤,善規 インプレス(2014年)",
      "publisher": "インプレス",
      "date": "2024-10-09",
      "cover": ""
    }
];

const mockNewBook: BookInf =
{
  "id": "4",
  "category": 0,
  "isbn": "9784295020806",
  "title": "HTML & CSS全事典 : Web制作必携",
  "author": "加藤,善規 インプレス(2014年)",
  "publisher": "インプレス",
  "date": "2024-10-09",
  "cover": ""
};

const mockUpdatedBook: BookInf = {
  id: '1',
  category: 3,
  isbn: '97800001',
  title: '新タイトル',
  author: '新著者',
  publisher: '新出版社',
  date: '2025-01-01',
  cover: 'cover-img.jpg'
};

const mockDeletedBook: BookInf = {
  id: '1',
  category: 1,
  isbn: '97800001',
  title: '削除前タイトル',
  author: '削除前著者',
  publisher: '削除前出版社',
  date: '2024-01-01',
  cover: 'cover-img2.jpg'
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("BookInfo API logic", () => {

  it(" getAllBooks: 本の全リスト 取得", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockBooks)
    } as any);
    const books = await getAllBooks();
    expect(books).toEqual(mockBooks);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/books', { cache: 'no-store' });
  });

  it(' addBook: 新本情報 追加', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockNewBook)
    } as any);
    const res = await addBook(mockNewBook);
    expect(res).toEqual(mockNewBook);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/books',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockNewBook)
      }
    );
  });

  it(' editBook: 本情報 編集', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockUpdatedBook)
    } as any);

    const result = await editBook(
      '1',
      3,
      '97800001',
      '新タイトル',
      '新著者',
      '新出版社',
      '2025-01-01',
      'cover-img.jpg'
    );

    expect(result).toEqual(mockUpdatedBook);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/books/1',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category:   3,
          isbn:       '97800001',
          title:      '新タイトル',
          author:     '新著者',
          publisher:  '新出版社',
          date:       '2025-01-01',
          cover:      'cover-img.jpg'
        })
      }
    );
  });

  it(' deleteBook: 本情報 削除', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockDeletedBook)
    } as any);

    const result = await deleteBook('1');
    expect(result).toEqual(mockDeletedBook);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/books/1',
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  });

});
