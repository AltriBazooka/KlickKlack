"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const StudentLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number | ''>('');
  const [interestRate, setInterestRate] = useState<number | ''>('');
  const [loanTerm, setLoanTerm] = useState<number | ''>(''); // in years
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateLoanPayments = () => {
    if (loanAmount && interestRate && loanTerm) {
      const principal = Number(loanAmount);
      const annualInterestRate = Number(interestRate) / 100;
      const numberOfPayments = Number(loanTerm) * 12;

      if (annualInterestRate === 0) {
        const monthly = principal / numberOfPayments;
        setMonthlyPayment(monthly);
        setTotalInterest(0);
        return;
      }

      const monthlyInterestRate = annualInterestRate / 12;
      const monthlyPaymentValue = 
        (principal * monthlyInterestRate) / 
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      
      setMonthlyPayment(monthlyPaymentValue);
      setTotalInterest((monthlyPaymentValue * numberOfPayments) - principal);
    } else {
      setMonthlyPayment(null);
      setTotalInterest(null);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Student Loan Calculator</CardTitle>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="loanAmount" className="text-gray-700 dark:text-gray-300">Loan Amount ($)</Label>
          <Input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g., 20000"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interestRate" className="text-gray-700 dark:text-gray-300">Annual Interest Rate (%)</Label>
          <Input
            id="interestRate"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g., 5"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="loanTerm" className="text-gray-700 dark:text-gray-300">Loan Term (Years)</Label>
          <Input
            id="loanTerm"
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g., 10"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <Button onClick={calculateLoanPayments} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Calculate Payments
        </Button>
        {(monthlyPayment !== null && totalInterest !== null) && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p className="text-sm font-medium">Monthly Payment: <span className="font-bold">${monthlyPayment.toFixed(2)}</span></p>
            <p className="text-sm font-medium">Total Interest: <span className="font-bold">${totalInterest.toFixed(2)}</span></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentLoanCalculator;