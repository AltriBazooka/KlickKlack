"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type TimerType = 'focus' | 'shortBreak' | 'longBreak';

export default function PomodoroCalculator() {
  const [focusDuration, setFocusDuration] = useState(25 * 60); // 25 minutes
  const [shortBreakDuration, setShortBreakDuration] = useState(5 * 60); // 5 minutes
  const [longBreakDuration, setLongBreakDuration] = useState(15 * 60); // 15 minutes
  const [timeRemaining, setTimeRemaining] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState<TimerType>('focus');
  const [pomodoroCount, setPomodoroCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeRemaining === 0) {
      handleTimerEnd();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeRemaining]);

  const handleTimerEnd = () => {
    setIsRunning(false);
    if (currentTimer === 'focus') {
      setPomodoroCount((prevCount) => prevCount + 1);
      if ((pomodoroCount + 1) % 4 === 0) {
        setCurrentTimer('longBreak');
        setTimeRemaining(longBreakDuration);
      } else {
        setCurrentTimer('shortBreak');
        setTimeRemaining(shortBreakDuration);
      }
    } else {
      setCurrentTimer('focus');
      setTimeRemaining(focusDuration);
    }
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setPomodoroCount(0);
    setCurrentTimer('focus');
    setTimeRemaining(focusDuration);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    let totalDuration = 0;
    if (currentTimer === 'focus') {
      totalDuration = focusDuration;
    } else if (currentTimer === 'shortBreak') {
      totalDuration = shortBreakDuration;
    } else {
      totalDuration = longBreakDuration;
    }
    return ((totalDuration - timeRemaining) / totalDuration) * 100;
  };

  const handleTabChange = (value: string) => {
    setIsRunning(false);
    setCurrentTimer(value as TimerType);
    if (value === 'focus') {
      setTimeRemaining(focusDuration);
    } else if (value === 'shortBreak') {
      setTimeRemaining(shortBreakDuration);
    } else {
      setTimeRemaining(longBreakDuration);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-black dark:text-white">Pomodoro Calculator</CardTitle>
        <CardDescription className="text-center">Boost your productivity with timed work and breaks.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Tabs value={currentTimer} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="focus">Focus</TabsTrigger>
            <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
            <TabsTrigger value="longBreak">Long Break</TabsTrigger>
          </TabsList>
          <TabsContent value="focus">
            <div className="text-center">
              <div className="text-6xl font-bold text-black dark:text-white mb-4">
                {formatTime(timeRemaining)}
              </div>
              <Progress value={getProgress()} className="w-full" />
            </div>
          </TabsContent>
          <TabsContent value="shortBreak">
            <div className="text-center">
              <div className="text-6xl font-bold text-black dark:text-white mb-4">
                {formatTime(timeRemaining)}
              </div>
              <Progress value={getProgress()} className="w-full" />
            </div>
          </TabsContent>
          <TabsContent value="longBreak">
            <div className="text-center">
              <div className="text-6xl font-bold text-black dark:text-white mb-4">
                {formatTime(timeRemaining)}
              </div>
              <Progress value={getProgress()} className="w-full" />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center space-x-4">
          {!isRunning ? (
            <Button onClick={startTimer} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Start
            </Button>
          ) : (
            <Button onClick={pauseTimer} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              Pause
            </Button>
          )}
          <Button onClick={resetTimer} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Reset
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="focus-duration" className="w-24">Focus (min)</Label>
            <Input
              id="focus-duration"
              type="number"
              value={focusDuration / 60}
              onChange={(e) => setFocusDuration(parseInt(e.target.value) * 60)}
              min="1"
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="short-break-duration" className="w-24">Short Break (min)</Label>
            <Input
              id="short-break-duration"
              type="number"
              value={shortBreakDuration / 60}
              onChange={(e) => setShortBreakDuration(parseInt(e.target.value) * 60)}
              min="1"
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="long-break-duration" className="w-24">Long Break (min)</Label>
            <Input
              id="long-break-duration"
              type="number"
              value={longBreakDuration / 60}
              onChange={(e) => setLongBreakDuration(parseInt(e.target.value) * 60)}
              min="1"
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
            />
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Pomodoros completed: {pomodoroCount}
        </div>
      </CardContent>
    </Card>
  );
}