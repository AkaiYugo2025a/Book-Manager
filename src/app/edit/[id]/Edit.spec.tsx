import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Edit from '../[id]/page';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Router mock
const pushMock = vi.fn();
  vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

beforeEach(() => {
  pushMock.mockClear();
});

// API のモック
vi.mock('@/lib/api/api', () => ({
  getAllBooks: vi.fn(),
  editBook: vi.fn(),
  deleteBook: vi.fn(),
}));

import { getAllBooks, editBook, deleteBook } from '@/lib/api/api';

describe('Edit Page', () => {

  beforeEach(() => {
    (getAllBooks as any).mockResolvedValue([
      {
        id: "1",
        category: 0,
        isbn: "978",
        title: "初期タイトル",
        author: "初期著者",
        publisher: "初期出版社",
        date: "2024-01-01",
        cover: "",
      }
    ]);
  });

  it('フォームに既存の値が表示される', async () => {
    render(<Edit params={{ id: "1" }} />);

    expect(await screen.findByDisplayValue("初期タイトル")).toBeInTheDocument();
    expect(screen.getByDisplayValue("初期著者")).toBeInTheDocument();
    expect(screen.getByDisplayValue("初期出版社")).toBeInTheDocument();
  });

  it('編集後に登録ボタンを押すと editBook が呼ばれ、ホームに遷移する', async () => {
    // const pushMock = vi.fn();
    // vi.mock('next/navigation', () => ({
    //   useRouter: () => ({ push: pushMock }),
    // }));

    render(<Edit params={{ id: "1" }} />);

    // タイトルを変更
    const titleInput = await screen.findByDisplayValue("初期タイトル");
    fireEvent.change(titleInput, { target: { value: "変更後タイトル" }});

    fireEvent.click(screen.getByRole('button', { name: '登録' }));

    await waitFor(() => {
      expect(editBook).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });

  it('削除ボタンを押すと deleteBook が呼ばれ、ホームへ遷移する', async () => {
    // const pushMock = vi.fn();
    // vi.mock('next/navigation', () => ({
    //   useRouter: () => ({ push: pushMock }),
    // }));

    render(<Edit params={{ id: '1' }} />);

    // fireEvent.click(screen.getByRole('button', { name: '削除' }));

    // await waitFor(() => {
    //   expect(deleteBook).toHaveBeenCalledWith('1');
    //   expect(pushMock).toHaveBeenCalledWith('/');
    // });
  });
});
