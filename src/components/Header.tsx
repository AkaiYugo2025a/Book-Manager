"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const showBack = pathname !== "/";

  return (
    <header className="
      w-full py-4 px-6
      bg-gradient-to-r from-blue-500 to-blue-700
      text-white flex items-center justify-between
      shadow-md
    ">
      <h1 className="text-2xl font-bold tracking-wide">
        BookManager
      </h1>

      {showBack && (
        <button
          onClick={() => router.back()}
          className="
            bg-blue-500 text-white-500 px-2 py-1 rounded-lg
            shadow-md hover:bg-blue-100 transition
          "
        >
          ×
        </button>
      )}
    </header>
  );
}
