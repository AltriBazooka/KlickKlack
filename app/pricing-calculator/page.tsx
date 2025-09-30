'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
// Removed: import { Metadata } from "next";
import React, { useState } from 'react';

// Removed: export const metadata: Metadata = {
// Removed:   title: "Pricing Calculator",
// Removed:   description: "Calculate suggested prices for your projects.",
// Removed: };

export default function PricingCalculatorPage() {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [estimatedHours, setEstimatedHours] = useState<number>(0);
  const [commissionCost, setCommissionCost] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculatePrice = () => {
    const subtotal = (hourlyRate * estimatedHours) + commissionCost;
    const discountedTotal = subtotal - discount;
    setTotalPrice(discountedTotal);
  };

  return (
    <div className="container relative pb-10">
      <div className="grid gap-4 py-4">
        <Card className="bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-black dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Pricing Calculator
            </CardTitle>
            <CardDescription>Calculate suggested prices for your projects.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="hourlyRate">Hourly Rate ($)</label>
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="e.g., 50"
                  value={hourlyRate === 0 ? '' : hourlyRate}
                  onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="hours">Estimated Hours</label>
                <Input
                  id="hours"
                  type="number"
                  placeholder="e.g., 100"
                  value={estimatedHours === 0 ? '' : estimatedHours}
                  onChange={(e) => setEstimatedHours(parseFloat(e.target.value) || 0)}
                  className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="commissionCost">Commission Cost ($)</label>
                <Input
                  id="commissionCost"
                  type="number"
                  placeholder="e.g., 50"
                  value={commissionCost === 0 ? '' : commissionCost}
                  onChange={(e) => setCommissionCost(parseFloat(e.target.value) || 0)}
                  className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="discount">Discount ($)</label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="e.g., 20"
                  value={discount === 0 ? '' : discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
                />
              </div>
              <Button onClick={calculatePrice}>Calculate Price</Button>
              <div className="text-lg font-bold">Total Price: ${totalPrice.toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}