import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function QuadraticFormulaCalculator() {
  const [a, setA] = useState<number | ''>('');
  const [b, setB] = useState<number | ''>('');
  const [c, setC] = useState<number | ''>('');
  const [result, setResult] = useState<string | null>(null);

  const calculateRoots = () => {
    if (a === '' || b === '' || c === '') {
      setResult('Please enter values for a, b, and c.');
      return;
    }

    const numA = Number(a);
    const numB = Number(b);
    const numC = Number(c);

    const equation = `${numA}x² + ${numB}x + ${numC} = 0`;
    let steps = `Equation: ${equation}\n\n`;
    steps += `Steps:\n`;
    steps += `x = (-b ± √b² - 4ac) / 2a\n`;
    steps += `= (-${numB} ± √(${numB})² - 4 * ${numA} * ${numC}) / (2 * ${numA})\n`;

    if (numA === 0) {
      setResult('Coefficient \'a\' cannot be zero for a quadratic equation.');
      return;
    }

    const discriminant = numB * numB - 4 * numA * numC;
    steps += `= (-${numB} ± √${discriminant}) / ${2 * numA}\n`;

    if (discriminant < 0) {
      const realPart = -numB / (2 * numA);
      const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * numA);
      const x1 = `${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`;
      const x2 = `${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`;
      setResult(`${steps}Two complex roots: x1 = ${x1}, x2 = ${x2}`);
    } else if (discriminant === 0) {
      const x = -numB / (2 * numA);
      setResult(`${steps}One real root: x = ${x.toFixed(4)}`);
    } else {
      const x1 = (-numB + Math.sqrt(discriminant)) / (2 * numA);
      const x2 = (-numB - Math.sqrt(discriminant)) / (2 * numA);
      setResult(`${steps}Two real roots: x1 = ${x1.toFixed(4)}, x2 = ${x2.toFixed(4)}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800/50 shadow-lg rounded-lg">
      <CardHeader className="bg-blue-600 dark:bg-blue-800 text-white rounded-t-lg p-4">
        <CardTitle className="text-2xl font-bold">Quadratic Formula Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="a" className="text-gray-700 dark:text-gray-300">Coefficient a</Label>
          <Input
            id="a"
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value === '' ? '' : parseFloat(e.target.value))}
            placeholder="Enter a"
            className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b" className="text-gray-700 dark:text-gray-300">Coefficient b</Label>
          <Input
            id="b"
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value === '' ? '' : parseFloat(e.target.value))}
            placeholder="Enter b"
            className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c" className="text-gray-700 dark:text-gray-300">Coefficient c</Label>
          <Input
            id="c"
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value === '' ? '' : parseFloat(e.target.value))}
            placeholder="Enter c"
            className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <Button
          onClick={calculateRoots}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Calculate Roots
        </Button>
        {result && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200">
            <h3 className="text-lg font-semibold">Result:</h3>
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}