import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const SavingsGoalCalculator: React.FC = () => {
  const [goalAmount, setGoalAmount] = useState<number | ''>('');
  const [initialDeposit, setInitialDeposit] = useState<number | ''>('');
  const [monthlyContribution, setMonthlyContribution] = useState<number | ''>('');
  const [interestRate, setInterestRate] = useState<number | ''>('');
  const [timeToReachGoal, setTimeToReachGoal] = useState<string | null>(null);

  const calculateSavings = () => {
    if (
      typeof goalAmount !== 'number' ||
      typeof initialDeposit !== 'number' ||
      typeof monthlyContribution !== 'number' ||
      typeof interestRate !== 'number' ||
      goalAmount <= 0 ||
      initialDeposit < 0 ||
      monthlyContribution < 0 ||
      interestRate < 0
    ) {
      setTimeToReachGoal('Please enter valid positive numbers for all fields.');
      return;
    }

    let remainingAmount = goalAmount - initialDeposit;
    if (remainingAmount <= 0) {
      setTimeToReachGoal('Goal already met or exceeded!');
      return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    let months = 0;
    let currentSavings = initialDeposit;

    if (monthlyInterestRate === 0) {
      if (monthlyContribution === 0) {
        setTimeToReachGoal('With no interest and no monthly contributions, you will never reach your goal.');
        return;
      }
      months = remainingAmount / monthlyContribution;
    } else {
      // Using a numerical approximation for time to reach goal with compound interest
      // This is a simplified approach and might not be perfectly accurate for all scenarios
      // A more precise calculation would involve solving a complex financial formula
      while (currentSavings < goalAmount && months < 1200) { // Limit to 100 years to prevent infinite loops
        currentSavings += monthlyContribution;
        currentSavings *= (1 + monthlyInterestRate);
        months++;
      }
      if (months >= 1200) {
        setTimeToReachGoal('It will take more than 100 years to reach your goal with these inputs.');
        return;
      }
    }

    const years = Math.floor(months / 12);
    const remainingMonths = Math.round(months % 12);

    setTimeToReachGoal(
      `You will reach your goal in approximately ${years} years and ${remainingMonths} months.`
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Savings Goal Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="goalAmount" className="text-gray-700 dark:text-gray-300">Savings Goal Amount ($)</Label>
            <Input
              id="goalAmount"
              type="number"
              placeholder="e.g., 10000"
              value={goalAmount}
              onChange={(e) => setGoalAmount(parseFloat(e.target.value) || '')}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="initialDeposit" className="text-gray-700 dark:text-gray-300">Initial Deposit ($)</Label>
            <Input
              id="initialDeposit"
              type="number"
              placeholder="e.g., 1000"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(parseFloat(e.target.value) || '')}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="monthlyContribution" className="text-gray-700 dark:text-gray-300">Monthly Contribution ($)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              placeholder="e.g., 200"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || '')}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="interestRate" className="text-gray-700 dark:text-gray-300">Annual Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              placeholder="e.g., 5"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || '')}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
            />
          </div>
          <Button onClick={calculateSavings} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Calculate Time to Goal
          </Button>
          {timeToReachGoal && (
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-black dark:text-white">{timeToReachGoal}</h2>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsGoalCalculator;