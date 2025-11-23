'use client';

import { BrowserMultiFormatReader } from "@zxing/browser";
import { Result } from "@zxing/library";
import React, { useRef, useEffect, useState } from "react";
import BookInfoOpenBd from "../../components/isbn-info/BookLookup";
import { useRouter } from 'next/navigation';
import { addBook } from '@/lib/api/api';
import { BookInf } from '@/types/types';

const IsbnScannerPage: React.FC = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isbn, setIsbn] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  const startScan = async () => {

    if (scanning) return;

    setScanning(true);
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    console.log('scan start');

    // 継続的にコールバックを呼ぶ
    codeReader.decodeFromVideoDevice(
      undefined,
      videoRef.current!,
      (result: Result | undefined, err) => {
        if (result) {
          const text = result.getText();
          console.log('sucess:', text);
          setIsbn(text);
          stopScan(); // 成功したら停止
        }
        if (err) {
          // デコードエラー（バーコードがまだ検出されない等）は無視でOK
          console.warn(err);
        }
      }
    );

  };

  const stopScan = () => {
    setScanning(false);
    console.log('scan stop');
  };

  const targetBook: BookInf = {
    id: crypto.randomUUID(),
    category: 1,
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    date: "",
    cover: "",
  };

  // 登録ボタン押下
  const handleRegister = async () => {
    await addBook(targetBook);
    router.push('/');
  };

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <div style={{ padding: 80 }}>
      <h1><strong>ISBNバーコードスキャナ</strong></h1>

      <video ref={videoRef} style={{ width: 600, height: 150 }} />
      <div style={{ marginTop: 16, rowGap: 20}}>
        <button
          onClick={startScan}
          disabled={scanning}
          style={{
            borderRadius: 8,
            backgroundColor: scanning ? '#cccccc': 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          スキャン開始
        </button>
        <button
          onClick={stopScan}
          disabled={!scanning}
          style={{
            borderRadius: 8,
            backgroundColor: !scanning ? '#cccccc' : 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          スキャン停止
        </button>
      </div>
      <div style={{ marginTop: 24 }}>
        {isbn ?
          <div>
            <BookInfoOpenBd
              isbn={isbn}
              onBookLoaded={(book) => {
                targetBook.isbn = book.isbn || "";
                targetBook.title = book.title || "";
                targetBook.author = book.author || "";
                targetBook.publisher = book.publisher || "";
                targetBook.date = book.date || "";
                console.log("scan book:", book);
              }}
            />
            <button
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl shadow"
              onClick={handleRegister}
            >
              登録
            </button>
          </div>
          : <span>バーコードを読み取ってください</span>
        }
      </div>
    </div>
  );
};

export default IsbnScannerPage;


// export default function Scan() {
//   const handleStart = () => {
//     console.log('スキャン開始');
//   };

//   const handleStop = () => {
//     console.log('スキャン停止');
//   };

//   return (
//     <div className="p-6 space-y-6">

//       <h1 className="text-2xl font-bold text-blue-700">スキャン</h1>

//       <div className="flex gap-4">
//         <button
//           className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-xl shadow"
//           onClick={handleStart}
//         >
//           開始
//         </button>

//         <button
//           className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl shadow"
//           onClick={handleStop}
//         >
//           停止
//         </button>
//       </div>
//     </div>
//   );
// }
