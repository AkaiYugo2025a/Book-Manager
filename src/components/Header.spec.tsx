import { render, screen } from '@testing-library/react';
import Header from './Header';
import { describe, it, expect, vi } from 'vitest';

// useRouter モック
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn()
  })
}));

describe('Header Part', () => {

  it('タイトル「BookManager」が表示される', () => {
    render(<Header />);
    expect(screen.getByText('BookManager')).toBeInTheDocument();
  });

  it('戻るボタンがある', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
  });
});
