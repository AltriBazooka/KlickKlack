import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(1000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12); // Monthly
  const [timePeriod, setTimePeriod] = useState<number>(10); // Years
  const [futureValue, setFutureValue] = useState<number | null>(null);

  const calculateCompoundInterest = () => {
    const P = principal;
    const r = interestRate / 100;
    const n = compoundingFrequency;
    const t = timePeriod;

    if (P && r && n && t) {
      const FV = P * Math.pow((1 + r / n), n * t);
      setFutureValue(FV);
    } else {
      setFutureValue(null);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Compound Interest Calculator</CardTitle>
        <CardDescription className="text-center">Calculate your future wealth with compound interest.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="principal" className="text-gray-700 dark:text-gray-300">Principal Amount ($)</Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value))}
            placeholder="Enter principal amount"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="interestRate" className="text-gray-700 dark:text-gray-300">Annual Interest Rate (%)</Label>
          <Input
            id="interestRate"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            placeholder="Enter annual interest rate"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="compoundingFrequency" className="text-gray-700 dark:text-gray-300">Compounding Frequency</Label>
          <Select
            value={String(compoundingFrequency)}
            onValueChange={(value) => setCompoundingFrequency(parseInt(value))}
          >
            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <SelectItem value="1" className="text-black dark:text-white">Annually</SelectItem>
              <SelectItem value="2" className="text-black dark:text-white">Semi-Annually</SelectItem>
              <SelectItem value="4" className="text-black dark:text-white">Quarterly</SelectItem>
              <SelectItem value="12" className="text-black dark:text-white">Monthly</SelectItem>
              <SelectItem value="365" className="text-black dark:text-white">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="timePeriod" className="text-gray-700 dark:text-gray-300">Time Period (Years)</Label>
          <Input
            id="timePeriod"
            type="number"
            value={timePeriod}
            onChange={(e) => setTimePeriod(parseFloat(e.target.value))}
            placeholder="Enter time period in years"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <Button onClick={calculateCompoundInterest} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Calculate
        </Button>
        {futureValue !== null && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Future Value:</h3>
            <p className="text-2xl font-bold text-black dark:text-white">${futureValue.toFixed(2)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompoundInterestCalculator;