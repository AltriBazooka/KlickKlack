"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StatisticsCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState<number[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addNumbersFromInput = () => {
    const numbers = input.split(',').map(s => parseFloat(s.trim())).filter(num => !isNaN(num));
    if (numbers.length > 0) {
      setData([...data, ...numbers]);
      setInput('');
    }
  };

  const clearData = () => {
    setData([]);
    setInput('');
    setResult('');
  };

  const calculateMean = () => {
    if (data.length === 0) return 'N/A';
    const sum = data.reduce((acc, curr) => acc + curr, 0);
    return (sum / data.length).toFixed(2);
  };

  const calculateMedian = () => {
    if (data.length === 0) return 'N/A';
    const sortedData = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sortedData.length / 2);
    return sortedData.length % 2 === 0
      ? ((sortedData[mid - 1] + sortedData[mid]) / 2).toFixed(2)
      : sortedData[mid].toFixed(2);
  };

  const calculateMode = () => {
    if (data.length === 0) return 'N/A';
    const frequencyMap: { [key: number]: number } = {};
    data.forEach(num => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });

    let mode: number[] = [];
    let maxFrequency = 0;

    for (const numStr in frequencyMap) {
      const num = parseFloat(numStr);
      const freq = frequencyMap[num];
      if (freq > maxFrequency) {
        maxFrequency = freq;
        mode = [num];
      } else if (freq === maxFrequency) {
        mode.push(num);
      }
    }
    return mode.length === data.length ? 'N/A' : mode.join(', ');
  };

  const calculateStandardDeviation = () => {
    if (data.length < 2) return 'N/A';
    const mean = parseFloat(calculateMean() as string);
    const variance = data.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / (data.length - 1);
    return Math.sqrt(variance).toFixed(2);
  };

  const calculateRange = () => {
    if (data.length === 0) return 'N/A';
    const sortedData = [...data].sort((a, b) => a - b);
    return (sortedData[sortedData.length - 1] - sortedData[0]).toFixed(2);
  };

  const calculateMin = () => {
    if (data.length === 0) return 'N/A';
    return Math.min(...data).toFixed(2);
  };

  const calculateMax = () => {
    if (data.length === 0) return 'N/A';
    return Math.max(...data).toFixed(2);
  };

  const calculateQuartiles = () => {
    if (data.length < 4) return 'N/A'; // Need at least 4 data points for quartiles
    const sortedData = [...data].sort((a, b) => a - b);
    const q1Index = (sortedData.length + 1) / 4 - 1;
    const q2Index = (sortedData.length + 1) / 2 - 1; // Median
    const q3Index = 3 * (sortedData.length + 1) / 4 - 1;

    const interpolate = (arr: number[], index: number) => {
      const lower = Math.floor(index);
      const upper = Math.ceil(index);
      if (lower === upper) return arr[lower];
      return arr[lower] * (upper - index) + arr[upper] * (index - lower);
    };

    const q1 = interpolate(sortedData, q1Index).toFixed(2);
    const q2 = interpolate(sortedData, q2Index).toFixed(2);
    const q3 = interpolate(sortedData, q3Index).toFixed(2);

    return { q1, q2, q3 };
  };

  const calculateInterquartileRange = () => {
    if (data.length < 4) return 'N/A';
    const quartiles = calculateQuartiles();
    if (typeof quartiles === 'string') return 'N/A';
    return (parseFloat(quartiles.q3) - parseFloat(quartiles.q1)).toFixed(2);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black dark:text-white">Statistics Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            className="w-full text-right text-2xl p-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900 text-black dark:text-white"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter Data Set (e.g., 9, 10, 12)"
          />
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={addNumbersFromInput} className="text-xl p-4 h-16 bg-blue-500 text-white hover:bg-blue-600">Add Data</Button>
            <Button onClick={clearData} className="text-xl p-4 h-16 bg-red-500 text-white hover:bg-red-600">Clear</Button>
          </div>
          <div className="space-y-2">
            <p className="text-black dark:text-white">Data: {data.join(', ')}</p>
            <p className="text-black dark:text-white">Mean: {calculateMean()}</p>
            <p className="text-black dark:text-white">Median: {calculateMedian()}</p>
            <p className="text-black dark:text-white">Mode: {calculateMode()}</p>
            <p className="text-black dark:text-white">Standard Deviation: {calculateStandardDeviation()}</p>
            <p className="text-black dark:text-white">Range: {calculateRange()}</p>
            <p className="text-black dark:text-white">Minimum: {calculateMin()}</p>
            <p className="text-black dark:text-white">Maximum: {calculateMax()}</p>
            {typeof calculateQuartiles() !== 'string' && (
              <>
                <p className="text-black dark:text-white">Quartile 1 (Q1): {calculateQuartiles().q1}</p>
                <p className="text-black dark:text-white">Quartile 2 (Q2): {calculateQuartiles().q2}</p>
                <p className="text-black dark:text-white">Quartile 3 (Q3): {calculateQuartiles().q3}</p>
                <p className="text-black dark:text-white">Interquartile Range (IQR): {calculateInterquartileRange()}</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}