import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(20); // Years
  const [futureValue, setFutureValue] = useState<number | null>(null);

  const calculateFutureValue = () => {
    const P = initialInvestment;
    const C = monthlyContribution;
    const r = annualInterestRate / 100;
    const t = investmentPeriod;

    if (P && C && r && t) {
      // Future value of initial investment
      const FV_initial = P * Math.pow((1 + r), t);

      // Future value of a series of monthly contributions (annuity future value)
      // Assuming contributions are made at the end of each month
      const monthlyRate = r / 12;
      const numberOfContributions = t * 12;
      const FV_contributions = C * ((Math.pow((1 + monthlyRate), numberOfContributions) - 1) / monthlyRate);

      setFutureValue(FV_initial + FV_contributions);
    } else {
      setFutureValue(null);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Investment Calculator</CardTitle>
        <CardDescription className="text-center">Plan your investments and see their future value.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="initialInvestment" className="text-gray-700 dark:text-gray-300">Initial Investment ($)</Label>
          <Input
            id="initialInvestment"
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
            placeholder="Enter initial investment"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="monthlyContribution" className="text-gray-700 dark:text-gray-300">Monthly Contribution ($)</Label>
          <Input
            id="monthlyContribution"
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))}
            placeholder="Enter monthly contribution"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="annualInterestRate" className="text-gray-700 dark:text-gray-300">Annual Interest Rate (%)</Label>
          <Input
            id="annualInterestRate"
            type="number"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(parseFloat(e.target.value))}
            placeholder="Enter annual interest rate"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="investmentPeriod" className="text-gray-700 dark:text-gray-300">Investment Period (Years)</Label>
          <Input
            id="investmentPeriod"
            type="number"
            value={investmentPeriod}
            onChange={(e) => setInvestmentPeriod(parseFloat(e.target.value))}
            placeholder="Enter investment period in years"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <Button onClick={calculateFutureValue} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
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

export default InvestmentCalculator;