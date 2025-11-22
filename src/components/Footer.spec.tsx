import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { describe, it, expect, vi } from 'vitest';

// // useRouter モック
// vi.mock('next/navigation', () => ({
//   useRouter: () => ({
//     back: vi.fn()
//   })
// }));

describe('Footer Block', () => {
  it('日付が yyyy/mm/dd 形式で表示', () => {
    render(<Footer />);
    const now = new Date();
    const expected = `${now.getFullYear()} ${String(now.getMonth() + 1).padStart(2, '0')}/${String(
      now.getDate()
    ).padStart(2, '0')}`;
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});
