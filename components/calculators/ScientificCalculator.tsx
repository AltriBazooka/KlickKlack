"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { evaluate } from 'mathjs';

export default function ScientificCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        setResult(evaluate(input).toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(value)) {
      setInput(prevInput => prevInput + value + '(');
    } else if (value === 'pi') {
      setInput(prevInput => prevInput + 'pi');
    } else if (value === 'e') {
      setInput(prevInput => prevInput + 'e');
    } else {
      setInput(prevInput => prevInput + value);
    }
  };

  const buttons = [
    'C', 'DEL', '(', ')', '/',
    '7', '8', '9', '*', '-',
    '4', '5', '6', '+', '%',
    '1', '2', '3', '^', 'sqrt',
    '0', '.', '=', 'sin', 'cos',
    'tan', 'log', 'ln', 'pi', 'e',
  ];

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black dark:text-white">Scientific Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            className="w-full text-right text-2xl p-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900 text-black dark:text-white"
            value={input}
            readOnly
            placeholder="0"
          />
          <Input
            type="text"
            className="w-full text-right text-3xl font-bold p-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900 text-black dark:text-white"
            value={result}
            readOnly
            placeholder="0"
          />
          <div className="grid grid-cols-5 gap-2">
            {buttons.map((button) => (
              <Button
                key={button}
                onClick={() => handleButtonClick(button)}
                className="text-xl p-4 h-16 bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {button}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}