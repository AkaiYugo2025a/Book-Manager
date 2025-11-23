'use client';

export default function Scan() {
  const handleStart = () => {
    console.log('スキャン開始');
  };

  const handleStop = () => {
    console.log('スキャン停止');
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold text-blue-700">スキャン</h1>

      <div className="flex gap-4">
        <button
          className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-xl shadow"
          onClick={handleStart}
        >
          開始
        </button>

        <button
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl shadow"
          onClick={handleStop}
        >
          停止
        </button>
      </div>
    </div>
  );
}
