import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { describe, it, expect, vi, beforeEach } from "vitest";

// 日付固定のため Mock を使う
const fixedDate = new Date("2025-01-15T12:00:00Z");
vi.useFakeTimers();
vi.setSystemTime(fixedDate);

describe("Footer component", () => {
  it("フッターが表示される", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("現在日付が yyyy/mm/dd の形式で表示される", () => {
    render(<Footer />);
    expect(screen.getByText("2025/01/15")).toBeInTheDocument();
  });
});
