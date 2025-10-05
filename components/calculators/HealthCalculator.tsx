"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HealthCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | string>('');
  const [height, setHeight] = useState<number | string>('');
  const [sex, setSex] = useState<'male' | 'female' | ''>('');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active' | ''>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);

  // Assuming 'age' is passed as a prop or derived elsewhere if needed for BMR/TDEE
  // For now, let's assume a placeholder age or derive it from a DOB input within this component if necessary.
  // For simplicity, let's add a placeholder for age for BMR/TDEE calculation.
  const [age, setAge] = useState<number | string>(''); // Placeholder for age

  useEffect(() => {
    if (weight && height) {
      const calculatedBmi = Number(weight) / (Number(height) / 100) ** 2;
      setBmi(calculatedBmi);

      let category = '';
      if (calculatedBmi < 18.5) {
        category = 'Underweight';
      } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
        category = 'Normal weight';
      } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
        category = 'Overweight';
      } else {
        category = 'Obesity';
      }
      setBmiCategory(category);
    }
  }, [weight, height]);

  useEffect(() => {
    if (weight && height && age && sex && activityLevel) {
      let calculatedBmr = 0;
      if (sex === 'male') {
        calculatedBmr = 88.362 + 13.397 * Number(weight) + 4.799 * Number(height) - 5.677 * Number(age);
      } else if (sex === 'female') {
        calculatedBmr = 447.593 + 9.247 * Number(weight) + 3.098 * Number(height) - 4.330 * Number(age);
      }
      setBmr(calculatedBmr);

      let activityFactor = 1.2;
      switch (activityLevel) {
        case 'lightly_active':
          activityFactor = 1.375;
          break;
        case 'moderately_active':
          activityFactor = 1.55;
          break;
        case 'very_active':
          activityFactor = 1.725;
          break;
        case 'extra_active':
          activityFactor = 1.9;
          break;
      }
      setTdee(calculatedBmr * activityFactor);
    }
  }, [weight, height, age, sex, activityLevel]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Health Calculator</CardTitle>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-gray-700 dark:text-gray-300">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height" className="text-gray-700 dark:text-gray-300">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age" className="text-gray-700 dark:text-gray-300">Age</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sex" className="text-gray-700 dark:text-gray-300">Sex</Label>
          <Select onValueChange={(value: 'male' | 'female') => setSex(value)} value={sex}>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              <SelectValue placeholder="Select sex" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="activityLevel" className="text-gray-700 dark:text-gray-300">Activity Level</Label>
          <Select onValueChange={(value: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active') => setActivityLevel(value)} value={activityLevel}>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white">
              <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
              <SelectItem value="lightly_active">Lightly Active (light exercise/sports 1-3 days/week)</SelectItem>
              <SelectItem value="moderately_active">Moderately Active (moderate exercise/sports 3-5 days/week)</SelectItem>
              <SelectItem value="very_active">Very Active (hard exercise/sports 6-7 days a week)</SelectItem>
              <SelectItem value="extra_active">Extra Active (very hard exercise/physical job)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {bmi && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p className="text-sm font-medium">BMI: <span className="font-bold">{bmi.toFixed(2)}</span> ({bmiCategory})</p>
            {bmr && <p className="text-sm font-medium">BMR: <span className="font-bold">{bmr.toFixed(2)}</span> calories/day</p>}
            {tdee && <p className="text-sm font-medium">TDEE: <span className="font-bold">{tdee.toFixed(2)}</span> calories/day</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthCalculator;