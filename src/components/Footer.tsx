// フッター
export default function Footer() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');

  return (
    <footer className="w-full text-center p-2 text-gray-700 bg-gradient-to-r from-blue-100 to-blue-200">
      {`${y} ${m}/${d}`}
    </footer>
  );
}
