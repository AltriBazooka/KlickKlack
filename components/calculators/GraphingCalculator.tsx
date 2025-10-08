"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function GraphingCalculator() {
  const [expression, setExpression] = useState<string>("");
  const [series, setSeries] = useState<any[]>([]);
  const [options, setOptions] = useState<any>({
      chart: {
        id: "basic-line",
        background: 'transparent', // Transparent background to match the card
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: "numeric",
        min: -10,
        max: 10,
        tickAmount: 10,
        axisBorder: {
          show: true,
          color: '#E0E0E0', // Light gray axis line for dark mode
        },
        labels: {
          style: {
            colors: '#E0E0E0', // Light gray labels for dark mode
          },
        },
      },
      yaxis: {
        min: -10,
        max: 10,
        tickAmount: 10,
        axisBorder: {
          show: true,
          color: '#E0E0E0', // Light gray axis line for dark mode
        },
        labels: {
          style: {
            colors: '#E0E0E0', // Light gray labels for dark mode
          },
        },
      },
      grid: {
        borderColor: '#4A5568', // Darker gray grid lines for dark mode
        strokeDashArray: 4,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      markers: {
        size: 0,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        x: {
          formatter: function (val: number) {
            return val.toFixed(2);
          },
        },
        y: {
          formatter: function (val: number) {
            return val.toFixed(2);
          },
        },
      },
      colors: ["hsl(var(--primary))", "#E91E63", "#9C27B0", "#FFC107", "#00E396"],
  });

  useEffect(() => {
    plotExpression();
  }, [expression]);

  const plotExpression = () => {
    try {
      // Basic parsing for now, will be improved later
      const data = [];
      for (let x = -10; x <= 10; x += 0.1) {
        // Using a safer alternative to eval for mathematical expressions
        // This is a very basic example and should be replaced with a robust math expression parser
        let y;
        try {
          // Replace common math functions and operators for eval
          let safeExpression = expression
            .replace(/(\d)([a-zA-Z])/g, '$1*$2') // Handles implicit multiplication like '4x'
            .replace(/([a-zA-Z])(\d)/g, '$1*$2') // Handles implicit multiplication like 'x4'
            .replace(/([a-zA-Z])([a-zA-Z])/g, '$1*$2') // Handles implicit multiplication like 'xy'
            .replace(/sin\((.*?)\)/g, 'Math.sin($1)')
            .replace(/cos\((.*?)\)/g, 'Math.cos($1)')
            .replace(/tan\((.*?)\)/g, 'Math.tan($1)')
            .replace(/log\((.*?)\)/g, 'Math.log($1)')
            .replace(/sqrt\((.*?)\)/g, 'Math.sqrt($1)')
            .replace(/pow\((.*?),(.*?)\)/g, 'Math.pow($1,$2)')
            .replace(/\^/g, '**')
            .replace(/x/g, `(${x})`);
          y = Function('return ' + safeExpression)();
        } catch (e) {
          console.warn("Expression parsing error:", e);
          continue;
        }

        if (!isNaN(y) && isFinite(y)) {
          data.push({ x, y });
        }
      }
      setSeries([{ name: expression, data }]);
    } catch (error) {
      console.error("Error plotting expression:", error);
      setSeries([]);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Graphing Calculator</CardTitle>
        <CardDescription className="text-center">Enter an expression to plot (e.g., x^2, sin(x))</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <Input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Enter expression (e.g., x^2, sin(x))"
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-white dark:text-white"
        />
        <div className="w-full h-96">
          <Chart options={options} series={series} type="line" height="100%" />
        </div>
      </CardContent>
    </Card>
  );
}