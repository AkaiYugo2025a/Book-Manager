
"use client";

export default function Footer() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  const today = `${yyyy}/${mm}/${dd}`;

  return (
    <footer
      data-testid="footer"
      className="
        w-full py-3
        bg-gradient-to-r from-blue-700 to-blue-500
        text-white text-center
        shadow-inner
      "
    >
      <p className="tracking-wide text-sm">{today}</p>
    </footer>
  );
}
