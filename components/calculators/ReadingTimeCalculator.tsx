"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const ReadingTimeCalculator: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [readingTime, setReadingTime] = useState<number>(0);

  const wordsPerMinute = 200; // Average reading speed

  useEffect(() => {
    const wordCount = text.split(/\s+/).filter(word => word !== '').length;
    const time = Math.ceil(wordCount / wordsPerMinute);
    setReadingTime(time);
  }, [text]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-black dark:text-white">Reading Time Calculator</CardTitle>
        <CardDescription className="text-center text-gray-700 dark:text-gray-300">Calculate the estimated reading time for your text.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
          <Textarea
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px] text-black dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="text-center text-lg font-semibold text-black dark:text-white">
            Estimated Reading Time: {readingTime} minute{readingTime === 1 ? '' : 's'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingTimeCalculator;