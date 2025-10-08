"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Never underestimate the power of a good book.",
  "The early bird catches the worm, but the second mouse gets the cheese.",
  "Technology has revolutionized the way we live and work.",
  "The sun always shines brightest after the rain.",
];

export default function TypingSpeedCalculator() {
  const [textToType, setTextToType] = useState('');
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    resetTest();
  }, []);

  const calculateMetrics = (currentTypedText: string, currentTime: number) => {
    if (!startTime || currentTypedText.length === 0) {
      setWpm(0);
      setAccuracy(0);
      return;
    }

    const timeTakenInMinutes = (currentTime - startTime) / 60000;

    // Calculate WPM
    // Count words that are fully typed and correct up to a space
    const typedWords = currentTypedText.split(' ');
    let correctWords = 0;
    const textToTypeWords = textToType.split(' ');

    for (let i = 0; i < typedWords.length; i++) {
      if (i < textToTypeWords.length && typedWords[i] === textToTypeWords[i]) {
        correctWords++;
      } else {
        // If a word is incorrect or not fully typed yet, stop counting correct words
        break;
      }
    }
    const calculatedWpm = timeTakenInMinutes > 0 ? Math.round(correctWords / timeTakenInMinutes) : 0;
    setWpm(calculatedWpm);

    // Calculate Accuracy
    let correctCharacters = 0;
    for (let i = 0; i < currentTypedText.length; i++) {
      if (i < textToType.length && currentTypedText[i] === textToType[i]) {
        correctCharacters++;
      }
    }
    const calculatedAccuracy = currentTypedText.length > 0 ? (correctCharacters / currentTypedText.length) * 100 : 0;
    setAccuracy(parseFloat(calculatedAccuracy.toFixed(2)));
  };

  const resetTest = () => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    setTextToType(sampleTexts[randomIndex]);
    setTypedText('');
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(0);
    setProgress(0);
    setTimeElapsed(0); // Reset time elapsed
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTypedText(value);

    if (!startTime) {
      setStartTime(Date.now());
    }

    const currentProgress = (value.length / textToType.length) * 100;
    setProgress(currentProgress);

    const currentTime = Date.now(); // Get current time once for consistency

    if (startTime) { // Only update timeElapsed if startTime is set
      setTimeElapsed((currentTime - startTime) / 1000);
    }

    if (value.length === textToType.length) {
      setEndTime(currentTime);
      calculateMetrics(value, currentTime); // Final calculation
    } else {
      calculateMetrics(value, currentTime); // Real-time calculation
    }
  };

  const getCharacterClass = (char: string, index: number) => {
    if (index < typedText.length) {
      return char === typedText[index] ? 'text-green-500' : 'text-red-500';
    }
    return 'text-gray-500 dark:text-gray-400';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Typing Speed Calculator</CardTitle>
        <CardDescription className="text-center">Test and improve your typing speed and accuracy.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="relative p-4 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white text-lg leading-relaxed min-h-[120px]">
            {textToType.split('').map((char, index) => (
              <span key={index} className={getCharacterClass(char, index)}>
                {char}
              </span>
            ))}
          </div>

          <Textarea
            ref={textareaRef}
            value={typedText}
            onChange={handleInputChange}
            placeholder="Start typing here..."
            className="w-full p-4 border rounded-md min-h-[120px] text-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
            disabled={!!endTime}
          />

          <Progress value={progress} className="w-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 border rounded-md bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">WPM</p>
              <p className="text-3xl font-bold text-black dark:text-white">{wpm}</p>
            </div>
            <div className="p-4 border rounded-md bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Accuracy</p>
              <p className="text-3xl font-bold text-black dark:text-white">{accuracy}%</p>
            </div>
            <div className="p-4 border rounded-md bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Time</p>
              <p className="text-3xl font-bold text-black dark:text-white">{timeElapsed.toFixed(0)}s</p>
            </div>
          </div>

          <Button onClick={resetTest} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Reset Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}