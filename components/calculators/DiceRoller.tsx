"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DiceRoller() {
  const [numDice, setNumDice] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);

  const rollDice = () => {
    const newResults: number[] = [];
    let newTotal = 0;
    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * 6) + 1; // D6 dice
      newResults.push(roll);
      newTotal += roll;
    }
    setResults(newResults);
    setTotal(newTotal);
  };

  const handleNumDiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 10) {
      setNumDice(value);
    } else if (e.target.value === '') {
      setNumDice(0); // Allow empty input temporarily
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black dark:text-white">Dice Roller</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">Roll one or more six-sided dice.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="numDice" className="text-black dark:text-white">Number of Dice (1-10)</Label>
            <Input
              id="numDice"
              type="number"
              min="1"
              max="10"
              value={numDice === 0 ? '' : numDice}
              onChange={handleNumDiceChange}
              className="w-full mt-1 text-black dark:text-white bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-gray-700"
            />
          </div>
          <Button onClick={rollDice} className="w-full text-xl p-4 h-16 bg-blue-500 text-white hover:bg-blue-600">Roll Dice</Button>
          {results.length > 0 && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Results:</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {results.map((roll, index) => (
                  <span key={index} className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-lg font-bold">
                    {roll}
                  </span>
                ))}
              </div>
              <p className="text-xl font-bold text-black dark:text-white">Total: {total}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}