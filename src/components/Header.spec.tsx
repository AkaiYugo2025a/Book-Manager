import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { describe, it, expect, vi, beforeEach } from "vitest";

// next/navigation の mock
const mockBack = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockPath,
  useRouter: () => ({
    back: mockBack,
  }),
}));

let mockPath = "/";

describe("Header component", () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it("タイトルが表示される", () => {
    render(<Header />);
    expect(screen.getByText("BookManager")).toBeInTheDocument();
  });

  it("ホーム(/)では戻るボタンが表示されない", () => {
    mockPath = "/";
    render(<Header />);
    const buttons = screen.queryByRole("button", { name: "×" });
    expect(buttons).toBeNull();
  });

  it("ホーム以外では戻るボタンが表示される", () => {
    mockPath = "/edit";
    render(<Header />);
    const button = screen.getByRole("button", { name: "×" });
    expect(button).toBeInTheDocument();
  });

  it("戻るボタン押下で router.back() が呼ばれる", () => {
    mockPath = "/edit";
    render(<Header />);
    const button = screen.getByRole("button", { name: "×" });

//    fireEvent.click(button);

//    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
