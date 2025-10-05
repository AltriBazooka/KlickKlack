"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function BillSplitCalculator() {
  const [billAmount, setBillAmount] = useState<number>(0);
  const [numPeople, setNumPeople] = useState<number>(1);
  const [tipPercentage, setTipPercentage] = useState<number>(15);

  const billPerPerson = useMemo(() => {
    if (numPeople <= 0) return 0;
    const totalBill = billAmount * (1 + tipPercentage / 100);
    return totalBill / numPeople;
  }, [billAmount, numPeople, tipPercentage]);

  return (
    <Card className="w-full max-w-md bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-700 dark:text-gray-300">Bill Split Calculator</CardTitle>
        <CardDescription className="text-gray-700 dark:text-gray-300">Split bills and calculate tips easily.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="billAmount" className="text-gray-700 dark:text-gray-300">Bill Amount</Label>
            <Input
              id="billAmount"
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(parseFloat(e.target.value))}
              placeholder="Enter bill amount"
              min="0"
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="numPeople" className="text-gray-700 dark:text-gray-300">Number of People</Label>
            <Input
              id="numPeople"
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(parseInt(e.target.value))}
              placeholder="Enter number of people"
              min="1"
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="tipPercentage" className="text-gray-700 dark:text-gray-300">Tip Percentage</Label>
            <Input
              id="tipPercentage"
              type="number"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(parseFloat(e.target.value))}
              placeholder="Enter tip percentage"
              min="0"
              max="100"
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50"
            />
          </div>
          <div className="mt-4 text-right text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-bold">
              Bill per person: ${billPerPerson.toFixed(2)}
            </h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}