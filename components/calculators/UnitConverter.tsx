"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function UnitConverter() {
  const [selectedUnitCategory, setSelectedUnitCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [unitAmount, setUnitAmount] = useState<number>(1);
  const [convertedUnit, setConvertedUnit] = useState<number | null>(null);

  const unitCategories = {
    length: {
      units: ["meters", "feet", "inches", "centimeters", "kilometers", "miles"],
      conversions: {
        meters: { feet: 3.28084, inches: 39.3701, centimeters: 100, kilometers: 0.001, miles: 0.000621371 },
        feet: { meters: 0.3048, inches: 12, centimeters: 30.48, kilometers: 0.0003048, miles: 0.000189394 },
        inches: { meters: 0.0254, feet: 0.0833333, centimeters: 2.54, kilometers: 0.0000254, miles: 0.0000157828 },
        centimeters: { meters: 0.01, feet: 0.0328084, inches: 0.393701, kilometers: 0.00001, miles: 0.00000621371 },
        kilometers: { meters: 1000, feet: 3280.84, inches: 39370.1, centimeters: 100000, miles: 0.621371 },
        miles: { meters: 1609.34, feet: 5280, inches: 63360, centimeters: 160934, kilometers: 1.60934 },
      },
    },
    weight: {
      units: ["kilograms", "pounds", "ounces", "grams"],
      conversions: {
        kilograms: { pounds: 2.20462, ounces: 35.274, grams: 1000 },
        pounds: { kilograms: 0.453592, ounces: 16, grams: 453.592 },
        ounces: { kilograms: 0.0283495, pounds: 0.0625, grams: 28.3495 },
        grams: { kilograms: 0.001, pounds: 0.00220462, ounces: 0.035274 },
      },
    },
    temperature: {
      units: ["celsius", "fahrenheit", "kelvin"],
      conversions: {
        celsius: { fahrenheit: (c: number) => (c * 9) / 5 + 32, kelvin: (c: number) => c + 273.15 },
        fahrenheit: { celsius: (f: number) => ((f - 32) * 5) / 9, kelvin: (f: number) => ((f - 32) * 5) / 9 + 273.15 },
        kelvin: { celsius: (k: number) => k - 273.15, fahrenheit: (k: number) => ((k - 273.15) * 9) / 5 + 32 },
      },
    },
  };

  useEffect(() => {
    if (unitCategories[selectedUnitCategory]) {
      setFromUnit(unitCategories[selectedUnitCategory].units[0]);
      setToUnit(unitCategories[selectedUnitCategory].units[1] || unitCategories[selectedUnitCategory].units[0]);
    }
  }, [selectedUnitCategory]);

  const convertUnits = () => {
    const category = unitCategories[selectedUnitCategory];
    if (!category) return;

    if (selectedUnitCategory === "temperature") {
      const conversionFn = category.conversions[fromUnit]?.[toUnit];
      if (conversionFn && typeof conversionFn === "function") {
        setConvertedUnit(conversionFn(unitAmount));
      } else if (fromUnit === toUnit) {
        setConvertedUnit(unitAmount);
      } else {
        setConvertedUnit(null);
      }
    } else {
      const conversionRate = category.conversions[fromUnit]?.[toUnit];
      if (conversionRate) {
        setConvertedUnit(unitAmount * conversionRate);
      } else if (fromUnit === toUnit) {
        setConvertedUnit(unitAmount);
      } else {
        setConvertedUnit(null);
      }
    }
  };

  useEffect(() => {
    convertUnits();
  }, [unitAmount, fromUnit, toUnit, selectedUnitCategory]);

  return (
    <Card className="w-full max-w-md bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-700 dark:text-gray-300">Unit Converter</CardTitle>
        <CardDescription className="text-gray-700 dark:text-gray-300">Convert between various units of measurement.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="unitCategory" className="text-gray-700 dark:text-gray-300">Category</Label>
            <Select value={selectedUnitCategory} onValueChange={setSelectedUnitCategory}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                {Object.keys(unitCategories).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="amount" className="text-gray-700 dark:text-gray-300">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={unitAmount}
              onChange={(e) => setUnitAmount(parseFloat(e.target.value))}
              placeholder="Enter amount"
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromUnit" className="text-gray-700 dark:text-gray-300">From Unit</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                  {unitCategories[selectedUnitCategory]?.units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="toUnit" className="text-gray-700 dark:text-gray-300">To Unit</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                  {unitCategories[selectedUnitCategory]?.units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={convertUnits} className="bg-blue-500 hover:bg-blue-600 text-white">Convert Unit</Button>
          {convertedUnit !== null && (
            <div className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300">
              Converted Amount: {convertedUnit.toFixed(4)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}