"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState<number | string>("");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [conversionRates, setConversionRates] = useState<any>({});

  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setConversionRates(data.rates);
      } catch (error) {
        console.error("Error fetching conversion rates:", error);
      }
    };

    fetchConversionRates();
  }, []);

  const convertCurrency = () => {
    if (amount && conversionRates[fromCurrency] && conversionRates[toCurrency]) {
      const rateFromUSD = 1 / conversionRates[fromCurrency];
      const rateToUSD = conversionRates[toCurrency];
      const result = Number(amount) * rateFromUSD * rateToUSD;
      setConvertedAmount(result);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Currency Converter</CardTitle>
        <CardDescription className="text-center">Convert between different currencies.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-gray-700 dark:text-gray-300">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fromCurrency" className="text-gray-700 dark:text-gray-300">From</Label>
              <Select
                value={fromCurrency}
                onValueChange={(value) => setFromCurrency(value)}
              >
                <SelectTrigger id="fromCurrency" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                  {Object.keys(conversionRates).map((currency) => (
                    <SelectItem key={currency} value={currency} className="text-black dark:text-white">
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="toCurrency" className="text-gray-700 dark:text-gray-300">To</Label>
              <Select
                value={toCurrency}
                onValueChange={(value) => setToCurrency(value)}
              >
                <SelectTrigger id="toCurrency" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                  {Object.keys(conversionRates).map((currency) => (
                    <SelectItem key={currency} value={currency} className="text-black dark:text-white">
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={convertCurrency} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Convert
          </Button>
          {convertedAmount !== null && (
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
              <h3 className="text-sm font-medium">
                {amount} {fromCurrency} is {convertedAmount.toFixed(2)}{" "}
                {toCurrency}
              </h3>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}