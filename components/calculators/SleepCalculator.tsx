"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SleepCalculator = () => {
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [sleepDuration, setSleepDuration] = useState<number | ''>('');
  const [bedTime, setBedTime] = useState('');
  const [triggerSleepCalculation, setTriggerSleepCalculation] = useState(false);

  useEffect(() => {
    if (wakeUpTime && sleepDuration && triggerSleepCalculation) {
      const [wakeUpHour, wakeUpMinute] = wakeUpTime.split(':').map(Number);
      const wakeUpDate = new Date();
      wakeUpDate.setHours(wakeUpHour, wakeUpMinute, 0, 0);

      const sleepDurationMs = Number(sleepDuration) * 60 * 60 * 1000;
      const bedTimeDate = new Date(wakeUpDate.getTime() - sleepDurationMs);

      let hours = bedTimeDate.getHours();
      const minutes = bedTimeDate.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

      setBedTime(`${hours}:${formattedMinutes} ${ampm}`);
      setTriggerSleepCalculation(false);
    }
  }, [wakeUpTime, sleepDuration, triggerSleepCalculation]);

  const calculateBedTime = () => {
    setTriggerSleepCalculation(true);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Sleep Calculator</CardTitle>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="wakeUpTime" className="text-gray-700 dark:text-gray-300">Desired Wake Up Time</Label>
          <Input
            id="wakeUpTime"
            type="time"
            value={wakeUpTime}
            onChange={(e) => setWakeUpTime(e.target.value)}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sleepDuration" className="text-gray-700 dark:text-gray-300">Desired Sleep Duration (hours)</Label>
          <Input
            id="sleepDuration"
            type="number"
            value={sleepDuration}
            onChange={(e) => setSleepDuration(e.target.value)}
            placeholder="Enter desired sleep duration"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <Button onClick={calculateBedTime} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Calculate Bedtime
        </Button>
        {bedTime && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p className="text-sm font-medium">You should go to bed by: <span className="font-bold">{bedTime}</span></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SleepCalculator;