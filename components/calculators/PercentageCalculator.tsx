"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function PercentageCalculator() {
  const [number, setNumber] = useState<number | string>('');
  const [percentage, setPercentage] = useState<number | string>('');
  const [result, setResult] = useState<number | null>(null);
  const [mode, setMode] = useState<'percentageOf' | 'percentageChange' | 'whatPercentage'>('percentageOf');

  const calculatePercentage = () => {
    const num = parseFloat(number as string);
    const perc = parseFloat(percentage as string);

    if (!isNaN(num) && !isNaN(perc)) {
      if (mode === 'percentageOf') {
        setResult((num * perc) / 100);
      } else if (mode === 'percentageChange') {
        setResult(((perc - num) / num) * 100);
      } else if (mode === 'whatPercentage') {
        setResult((num / perc) * 100);
      }
    } else {
      setResult(null);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Percentage Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <Tabs defaultValue="percentageOf" onValueChange={(value) => setMode(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="percentageOf">% of</TabsTrigger>
            <TabsTrigger value="percentageChange">% Change</TabsTrigger>
            <TabsTrigger value="whatPercentage">What %</TabsTrigger>
          </TabsList>
          <TabsContent value="percentageOf">
            <div className="space-y-2">
              <Label htmlFor="number" className="text-gray-700 dark:text-gray-300">Number</Label>
              <Input
                id="number"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a number"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentage" className="text-gray-700 dark:text-gray-300">Percentage (%)</Label>
              <Input
                id="percentage"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="Enter percentage"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
              />
            </div>
          </TabsContent>
          <TabsContent value="percentageChange">
            <div className="space-y-2">
              <Label htmlFor="original" className="text-gray-700 dark:text-gray-300">Original Number</Label>
              <Input
                id="original"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter original number"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new" className="text-gray-700 dark:text-gray-300">New Number</Label>
              <Input
                id="new"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="Enter new number"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
              />
            </div>
          </TabsContent>
          <TabsContent value="whatPercentage">
            <div className="space-y-2">
              <Label htmlFor="part" className="text-gray-700 dark:text-gray-300">Part</Label>
              <Input
                id="part"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter part"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whole" className="text-gray-700 dark:text-gray-300">Whole</Label>
              <Input
                id="whole"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="Enter whole"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
              />
            </div>
          </TabsContent>
        </Tabs>
        <Button onClick={calculatePercentage} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Calculate
        </Button>
        {result !== null && (
          <div className="mt-4 text-center text-2xl font-bold text-black dark:text-white">
            Result: {result.toFixed(2)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}