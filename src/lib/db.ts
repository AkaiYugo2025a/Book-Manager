import { BookInf } from "../types/types";
import booksJson from '@/data/books.json';

/**
 * アプリ内DBクラス
 */
export class DB {

    /** 唯一のDBインスタンス */
    private static _instance: DB;
    /** 本データ本体、配列で管理する */
    private books: BookInf[];

    /**
     * コンストラクタはprivateにして勝手にインスタンス生成させない
     */
    private constructor(){
        this.books = booksJson.books;
    }

    /**
     * このメソッドを介してデータ操作メソッドを呼ぶ
     *
     * @returns 唯一のインスタンスを返す
     */
    public static instance(): DB {
        if (!this._instance) {
            this._instance = new DB();
        }
        return this._instance;
    }

    public selectAll(): BookInf[] {
      console.log("DB selectAll:", this.books);
      return this.books;
    }

    public select(id: string): BookInf {
      const index = this.books.findIndex((b) => b.id === id);

      if (index !== -1) {
        return this.books[index];
      } else {
        // ToDo 該当がない場合の処理
        return this.books[0];
      }
    }

    public insert(data: BookInf) {

      console.log("DB insert:", data);
      const index = this.books.findIndex((b) => b.id === data.id);
      if (index === -1) {
        this.books = [...this.books, data];
      }
      else {
        console.warn(`ID ${data.id} は既に存在します`);
        // TODO 同じISBNが存在する場合の挙動
      }
    }

  public update(
    id: string,
    newCategory: number,
    newIsbn: string,
    newTitle: string,
    newAuthor: string,
    newPublisher: string,
    newDate: string,
    newCover: string
  ) {
      console.log("DB update:", id);
      const index = this.books.findIndex((b) => b.id === id);
      if (index === -1) {
        console.warn(`ID ${id} は存在しません`);
        return
      }

      const updated: BookInf = {
        ...this.books[index],
        category: newCategory,
        isbn: newIsbn,
        title: newTitle,
        author: newAuthor,
        publisher: newPublisher,
        date: newDate,
        cover: newCover,
      };

      this.books = [
        ...this.books.slice(0, index),
        updated,
        ...this.books.slice(index + 1),
      ];
  }

  public delete(id: string) {

      const index = this.books.findIndex((b) => b.id === id);
      if (index === -1) {
        console.warn(`ID ${id} は存在しません`);
        return
      }

      console.log("DB delete:", this.books[index]);

      this.books = this.books.filter((b) => b.id !== id);
    }
};
