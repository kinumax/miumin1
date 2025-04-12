'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // UIライブラリのButtonコンポーネント

const HomePage = () => {
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStartCall = async () => {
    if (!gender) {
      alert('性別を選択してください。');
      return;
    }

    setIsLoading(true);

    // デモ用に一時的にローディングを止めてメッセージを表示
    setTimeout(() => {
      alert(`ただいま、${gender === 'male' ? '女性' : '男性'}の相手を探しています... (実際のマッチングロジックは未実装です)`);
      setIsLoading(false);
      //router.push('/room/test-room-id');  // デモ用: 強制的にルームへ遷移
      handleNavigation();
    }, 2000);
  };

    const handleNavigation = () => {
        const matchedUserId = gender === 'male' ? 'female-user-id' : 'male-user-id';
        router.push(`/room/${matchedUserId}`);
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">ランダム通話を開始</h1>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          性別を選択:
          <select
            value={gender}
            onChange={(e) => setGender(e.currentTarget.value as 'male' | 'female' | '')}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">選択してください</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </label>
      </div>
      <Button
        onClick={handleStartCall}
        disabled={isLoading}
        className={isLoading
          ? "bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
      >
        {isLoading ? '検索中...' : '通話を開始'}
      </Button>
    </div>
  );
};

export default HomePage;