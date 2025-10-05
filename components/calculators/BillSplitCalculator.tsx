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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Bill Split Calculator</CardTitle>
        <CardDescription>Split bills and calculate tips easily.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="billAmount">Bill Amount</Label>
            <Input
              id="billAmount"
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(parseFloat(e.target.value))}
              placeholder="Enter bill amount"
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="numPeople">Number of People</Label>
            <Input
              id="numPeople"
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(parseInt(e.target.value))}
              placeholder="Enter number of people"
              min="1"
            />
          </div>
          <div>
            <Label htmlFor="tipPercentage">Tip Percentage</Label>
            <Input
              id="tipPercentage"
              type="number"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(parseFloat(e.target.value))}
              placeholder="Enter tip percentage"
              min="0"
              max="100"
            />
          </div>
          <div className="mt-4 text-right">
            <h2 className="text-2xl font-bold">
              Bill per person: ${billPerPerson.toFixed(2)}
            </h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}