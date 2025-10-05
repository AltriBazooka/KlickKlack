"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const RentCalculator = () => {
  const [monthlyRent, setMonthlyRent] = useState<number | ''>('');
  const [securityDeposit, setSecurityDeposit] = useState<number | ''>('');
  const [leaseTerm, setLeaseTerm] = useState<number | ''>(''); // in months
  const [totalRentCost, setTotalRentCost] = useState<number | null>(null);
  const [totalMoveInCost, setTotalMoveInCost] = useState<number | null>(null);

  const calculateRent = () => {
    const rent = parseFloat(monthlyRent as string);
    const deposit = parseFloat(securityDeposit as string);
    const term = parseFloat(leaseTerm as string);

    if (!isNaN(rent) && !isNaN(term)) {
      setTotalRentCost(rent * term);
    }
    if (!isNaN(rent) && !isNaN(deposit)) {
      setTotalMoveInCost(rent + deposit);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Rent Calculator</CardTitle>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="monthlyRent" className="text-gray-700 dark:text-gray-300">Monthly Rent ($)</Label>
          <Input
            id="monthlyRent"
            type="number"
            placeholder="e.g., 1200"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="securityDeposit" className="text-gray-700 dark:text-gray-300">Security Deposit ($)</Label>
          <Input
            id="securityDeposit"
            type="number"
            placeholder="e.g., 1200"
            value={securityDeposit}
            onChange={(e) => setSecurityDeposit(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="leaseTerm" className="text-gray-700 dark:text-gray-300">Lease Term (months)</Label>
          <Input
            id="leaseTerm"
            type="number"
            placeholder="e.g., 12"
            value={leaseTerm}
            onChange={(e) => setLeaseTerm(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
          />
        </div>
        <Button onClick={calculateRent} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Calculate Rent
        </Button>
        {(totalRentCost !== null || totalMoveInCost !== null) && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
            {totalRentCost !== null && <p className="text-sm font-medium">Total Rent Cost: <span className="font-bold">${totalRentCost.toFixed(2)}</span></p>}
            {totalMoveInCost !== null && <p className="text-sm font-medium">Total Move-In Cost: <span className="font-bold">${totalMoveInCost.toFixed(2)}</span></p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};