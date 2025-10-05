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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>Convert between different currencies.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fromCurrency">From</Label>
              <Select
                value={fromCurrency}
                onValueChange={(value) => setFromCurrency(value)}
              >
                <SelectTrigger id="fromCurrency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(conversionRates).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="toCurrency">To</Label>
              <Select
                value={toCurrency}
                onValueChange={(value) => setToCurrency(value)}
              >
                <SelectTrigger id="toCurrency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(conversionRates).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={convertCurrency}>Convert</Button>
          {convertedAmount !== null && (
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold">
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