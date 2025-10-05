"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StandardCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      try {
        setResult(eval(input).toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult(null);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "C", "0", "=", "+",
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Standard Calculator</CardTitle>
        <CardDescription className="text-center">Perform basic arithmetic operations.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-4">
          <Input type="text" value={input} readOnly className="text-right text-2xl p-4 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white" />
          {result !== null && (
            <div className="text-right text-xl text-gray-500 dark:text-gray-300">= {result}</div>
          )}
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((button) => (
              <Button
                key={button}
                variant="outline"
                className="text-xl p-4 h-16 bg-blue-500 hover:bg-blue-600 text-white font-bold"
                onClick={() => handleButtonClick(button)}
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