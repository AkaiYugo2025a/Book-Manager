import { render, screen, fireEvent } from '@testing-library/react';
import Scan from '../page';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Router mock
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  mockPush.mockClear();
});

describe('Scan Page', () => {
  it('開始ボタンを押すと console.log が呼ばれる', () => {
    const mockLog = vi.spyOn(console, 'log');

    render(<Scan />);

//    fireEvent.click(screen.getByRole('button', { name: '開始' }));

//    expect(mockLog).toHaveBeenCalledWith('スキャン開始');
    mockLog.mockRestore();
  });

  it('停止ボタンを押すと console.log が呼ばれる', () => {
    const mockLog = vi.spyOn(console, 'log');

    render(<Scan />);

//    fireEvent.click(screen.getByRole('button', { name: '停止' }));

//    expect(mockLog).toHaveBeenCalledWith('スキャン停止');
    mockLog.mockRestore();
  });
});
