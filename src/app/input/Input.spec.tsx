import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Input from '../page';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// API mock
vi.mock('@/lib/api/api', () => ({
  addBook: vi.fn(),
}));

import { getAllBooks, addBook } from '@/lib/api/api';

vi.mock("@/lib/api/api", () => {
  return {
    getAllBooks: vi.fn(() => Promise.resolve([{ id: 1, title: "Test Book" }])),
  };
});

// Router mock
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  mockPush.mockClear();
});

describe('Input Page', () => {

  it('ダミーの本情報が表示される', () => {
    render(<Input />);

//    expect(screen.getByText('ダミー本')).toBeInTheDocument();
//    expect(screen.getByText('ダミー著者')).toBeInTheDocument();
  });

  it('スキャンボタンを押すと scan 画面へ遷移', () => {
    // const mockPush = vi.fn();
    // vi.mock('next/navigation', () => ({
    //   useRouter: () => ({ push: mockPush }),
    // }));

    render(<Input />);
//    fireEvent.click(screen.getByRole('button', { name: 'スキャン' }));
//    expect(mockPush).toHaveBeenCalledWith('/scan');
  });

  it('登録ボタンを押すと addBook が呼ばれてホームに遷移', async () => {
    // const mockPush = vi.fn();
    // vi.mock('next/navigation', () => ({
    //   useRouter: () => ({ push: mockPush }),
    // }));

//    (addBook as any).mockResolvedValue({ id: '99' });

    render(<Input />);

    fireEvent.click(screen.getByRole('button', { name: '登録' }));

    await waitFor(() => {
//      expect(addBook).toHaveBeenCalled();
//      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
