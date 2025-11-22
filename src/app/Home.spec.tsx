import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './page';
import { describe, it, expect, vi } from 'vitest';

// API をモック
vi.mock('@/lib/api/api', () => ({
  getAllBooks: vi.fn(),
}));

import { getAllBooks } from '@/lib/api/api';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));


describe('Home Page', () => {

  it('本の一覧が表示される', async () => {
    (getAllBooks as any).mockResolvedValue([
      {
        id: "1",
        category: 0,
        isbn: "111",
        title: "テスト本",
        author: "著者A",
        publisher: "出版B",
        date: "2024-01-01",
        cover: ""
      }
    ]);

    render(<Home />);

    expect(await screen.findByText('テスト本')).toBeInTheDocument();
    expect(screen.getByText('著者A')).toBeInTheDocument();
    expect(screen.getByText('出版B')).toBeInTheDocument();
  });

  it('本アイテムをクリックすると編集画面へ遷移する', async () => {
    // const mockPush = vi.fn();
    // vi.mock('next/navigation', () => ({
    //   useRouter: () => ({ push: mockPush }),
    // }));

    (getAllBooks as any).mockResolvedValue([
      {
        id: "1",
        category: 0,
        isbn: "111",
        title: "テスト本",
        author: "著者A",
        publisher: "出版B",
        date: "2024-01-01",
        cover: ""
      }
    ]);

    render(<Home />);

    const item = await screen.findByText('テスト本');
    fireEvent.click(item);

    expect(mockPush).toHaveBeenCalledWith('/edit/1');
  });

  it('登録ボタンがあり、押すと input へ遷移', async () => {
    // const mockPush = vi.fn();
    // vi.mock('next/navigation', () => ({
    //   useRouter: () => ({ push: mockPush }),
    // }));

    (getAllBooks as any).mockResolvedValue([]);

    render(<Home />);

    fireEvent.click(screen.getByRole('button', { name: '登録' }));
    expect(mockPush).toHaveBeenCalledWith('/input');
  });
});
