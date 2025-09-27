"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Calculator, TrendingUp, Shield, Target, Sun, Share2, Download, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import jsPDF from "jspdf"
import Head from "next/head"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function Home() {
  const [selectedCalculator, setSelectedCalculator] = useState('Currency Converter');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('WON');
  const [amount, setAmount] = useState<number | ''>('');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const convertCurrency = () => {
    // This is a placeholder for actual currency conversion logic
    // In a real application, you would fetch exchange rates from an API
    const exchangeRates: { [key: string]: { [key: string]: number } } = {
      USD: { WON: 1300, USD: 1 },
      WON: { USD: 0.00077, WON: 1 },
    };

    if (fromCurrency && toCurrency && amount) {
      const rate = exchangeRates[fromCurrency][toCurrency];
      setConvertedAmount(Number(amount) * rate);
    }
  };

  const [fromTimeZone, setFromTimeZone] = useState("America/New_York");
  const [toTimeZone, setToTimeZone] = useState("Europe/London");
  const [timeToConvert, setTimeToConvert] = useState("");
  const [convertedTime, setConvertedTime] = useState("");

  const [selectedUnitCategory, setSelectedUnitCategory] = useState("Length");
  const unitCategories = {
    Length: ["meters", "feet", "kilometers", "miles"],
    Weight: ["kilograms", "pounds", "grams", "ounces"],
    Temperature: ["celsius", "fahrenheit", "kelvin"],
    Speed: ["km/h", "mph", "m/s"],
    Volume: ["liters", "gallons", "milliliters"]
  };
  
  const conversionRates = {
    Length: {
      meters: { feet: 3.28084, kilometers: 0.001, miles: 0.000621371 },
      feet: { meters: 0.3048, kilometers: 0.0003048, miles: 0.000189394 },
      kilometers: { meters: 1000, feet: 3280.84, miles: 0.621371 },
      miles: { meters: 1609.34, feet: 5280, kilometers: 1.60934 }
    },
    Weight: {
      kilograms: { pounds: 2.20462, grams: 1000, ounces: 35.274 },
      pounds: { kilograms: 0.453592, grams: 453.592, ounces: 16 },
      grams: { kilograms: 0.001, pounds: 0.00220462, ounces: 0.035274 },
      ounces: { kilograms: 0.0283495, pounds: 0.0625, grams: 28.3495 }
    },
    Temperature: {
      celsius: { fahrenheit: (c) => (c * 9/5) + 32, kelvin: (c) => c + 273.15 },
      fahrenheit: { celsius: (f) => (f - 32) * 5/9, kelvin: (f) => (f - 32) * 5/9 + 273.15 },
      kelvin: { celsius: (k) => k - 273.15, fahrenheit: (k) => (k - 273.15) * 9/5 + 32 }
    },
    Speed: {
      "km/h": { mph: 0.621371, "m/s": 0.277778 },
      mph: { "km/h": 1.60934, "m/s": 0.44704 },
      "m/s": { "km/h": 3.6, mph: 2.23694 }
    },
    Volume: {
      liters: { gallons: 0.264172, milliliters: 1000 },
      gallons: { liters: 3.78541, milliliters: 3785.41 },
      milliliters: { liters: 0.001, gallons: 0.000264172 }
    }
  };
  
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [unitAmount, setUnitAmount] = useState<number | ''>('');
  const [convertedUnit, setConvertedUnit] = useState<number | null>(null);
  
  const [totalBill, setTotalBill] = useState<number | ''>('');
  const [numberOfPeople, setNumberOfPeople] = useState<number | ''>('');
  const [tipPercentage, setTipPercentage] = useState<number | ''>('15'); // Default tip to 15%
  const [individualShare, setIndividualShare] = useState<number | null>(null);

  const calculateBillSplit = () => {
      const bill = Number(totalBill);
      const people = Number(numberOfPeople);
      const tip = Number(tipPercentage);
  
      if (isNaN(bill) || isNaN(people) || people <= 0) {
          setIndividualShare(null);
          return;
      }
  
      const totalWithTip = bill * (1 + tip / 100);
      setIndividualShare(totalWithTip / people);
  };

  const convertUnits = () => {
    if (unitAmount === '' || isNaN(Number(unitAmount))) {
      setConvertedUnit(null);
      return;
    }

    const amount = Number(unitAmount);
    let result: number | null = null;

    if (selectedUnitCategory === "Temperature") {
      const from = fromUnit as keyof typeof conversionRates["Temperature"];
      const to = toUnit as keyof typeof conversionRates["Temperature"];

      if (from === to) {
        result = amount;
      } else if (conversionRates.Temperature[from] && (conversionRates.Temperature[from][to] as Function)) {
        result = (conversionRates.Temperature[from][to] as Function)(amount);
      } else if (conversionRates.Temperature[to] && (conversionRates.Temperature[to][from] as Function)) {
        // Handle inverse conversion if direct is not available
        if (from === "celsius" && to === "fahrenheit") result = (amount * 9/5) + 32;
        else if (from === "fahrenheit" && to === "celsius") result = (amount - 32) * 5/9;
        else if (from === "celsius" && to === "kelvin") result = amount + 273.15;
        else if (from === "kelvin" && to === "celsius") result = amount - 273.15;
        else if (from === "fahrenheit" && to === "kelvin") result = (amount - 32) * 5/9 + 273.15;
        else if (from === "kelvin" && to === "fahrenheit") result = (amount - 273.15) * 9/5 + 32;
      }
    } else {
      const rates = conversionRates[selectedUnitCategory as keyof typeof conversionRates];
      if (!rates) {
        setConvertedUnit(null);
        return;
      }

      const from = fromUnit as keyof typeof rates;
      const to = toUnit as keyof typeof rates;

      if (from === to) {
        result = amount;
      } else if (rates[from] && (rates[from][to] as number)) {
        result = amount * (rates[from][to] as number);
      } else if (rates[to] && (rates[to][from] as number)) {
        result = amount / (rates[to][from] as number);
      }
    }

    setConvertedUnit(result);
  };

  const [courses, setCourses] = useState<Array<{ name: string; credits: number; grade: string }>>([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseCredits, setNewCourseCredits] = useState<number | "">("");
  const [newCourseGrade, setNewCourseGrade] = useState("");
  const [gpa, setGpa] = useState<string | null>(null);

  const gradeToPoints: { [key: string]: number } = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    "D-": 0.7,
    F: 0.0,
  };

  const addCourse = () => {
    if (newCourseName && newCourseCredits && newCourseGrade) {
      setCourses([...courses, { name: newCourseName, credits: Number(newCourseCredits), grade: newCourseGrade }]);
      setNewCourseName("");
      setNewCourseCredits("");
      setNewCourseGrade("");
    }
  };

  const calculateGPA = () => {
    if (courses.length === 0) {
      setGpa("0.00");
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const points = gradeToPoints[course.grade.toUpperCase()];
      if (points !== undefined) {
        totalPoints += points * course.credits;
        totalCredits += course.credits;
      }
    });

    if (totalCredits === 0) {
      setGpa("N/A");
    } else {
      setGpa((totalPoints / totalCredits).toFixed(2));
    }
  };

  useEffect(() => {
    calculateGPA();
  }, [courses]);

  const convertTime = () => {
    if (!timeToConvert) {
      setConvertedTime("Please enter a time to convert.");
      return;
    }

    try {
      const date = new Date(timeToConvert);
      if (isNaN(date.getTime())) {
        setConvertedTime("Invalid time format. Please use YYYY-MM-DD HH:MM.");
        return;
      }

      const fromTime = new Date(date.toLocaleString("en-US", { timeZone: fromTimeZone }));
      const toTime = new Date(date.toLocaleString("en-US", { timeZone: toTimeZone }));

      const diff = toTime.getTime() - fromTime.getTime();
      const resultDate = new Date(date.getTime() + diff);

      setConvertedTime(resultDate.toLocaleString("en-US", { timeZone: toTimeZone }));
    } catch (error) {
      setConvertedTime("Error converting time. Please check your input and try again.");
      console.error("Time conversion error:", error);
    }
  };

  const timeZones = [
    { value: "America/New_York", label: "Eastern Time (US & Canada)" },
    { value: "America/Chicago", label: "Central Time (US & Canada)" },
    { value: "America/Denver", label: "Mountain Time (US & Canada)" },
    { value: "America/Los_Angeles", label: "Pacific Time (US & Canada)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Europe/Berlin", label: "Berlin (GMT+1)" },
    { value: "Asia/Tokyo", label: "Tokyo (GMT+9)" },
    { value: "Asia/Dubai", label: "Dubai (GMT+4)" },
    { value: "Australia/Sydney", label: "Sydney (GMT+10)" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <Head>
        <title>KlickKlack - Smart Calculations</title>
        <meta name="description" content="Smart Calculations, Made Easy." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-md">
        <Card className="bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm mb-4">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-2">KlickKlack</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">Smart Calculations, Made Easy.</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="text-xl font-bold text-black mb-2">Choose a Calculator</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedCalculator('Currency Converter')}>Currency Converter</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCalculator('GPA Calculator')}>GPA Calculator</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCalculator('Time Zone Converter')}>Time Zone Converter</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCalculator('Unit Converter')}>Unit Converter</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCalculator('Bill Split Calculator')}>Bill Split Calculator</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        {/* Input Form */}
        {selectedCalculator === 'Currency Converter' && (
          <Card className="bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-black dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Currency Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fromCurrency" className="text-gray-700 dark:text-slate-300">
                  From Currency
                </Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="WON">WON</SelectItem>
                    {/* Add more currencies as needed */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="toCurrency" className="text-gray-700 dark:text-slate-300">
                  To Currency
                </Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="WON">WON</SelectItem>
                    {/* Add more currencies as needed */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-gray-700 dark:text-slate-300">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="e.g., 1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
                />
              </div>

              <Button onClick={convertCurrency} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Convert
              </Button>
            </CardContent>
          </Card>
        )}

        {selectedCalculator === 'GPA Calculator' && (
          <Card className="bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-black dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                GPA Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="courseName" className="text-gray-700 dark:text-slate-300">Course Name</Label>
                <Input
                  id="courseName"
                  type="text"
                  placeholder="e.g., Calculus I"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseCredits" className="text-gray-700 dark:text-slate-300">Credits</Label>
                <Input
                  id="courseCredits"
                  type="number"
                  placeholder="e.g., 3"
                  value={newCourseCredits}
                  onChange={(e) => setNewCourseCredits(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseGrade" className="text-gray-700 dark:text-slate-300">Grade</Label>
                <Select value={newCourseGrade} onValueChange={setNewCourseGrade}>
                  <SelectTrigger className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradeToPoints).map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addCourse} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Add Course
              </Button>

              {courses.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-black dark:text-white">Courses Added:</h3>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-slate-300">
                    {courses.map((course, index) => (
                      <li key={index}>{course.name} ({course.credits} credits) - {course.grade}</li>
                    ))}
                  </ul>
                </div>
              )}

              {gpa !== null && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <p className="text-sm font-medium">Calculated GPA:</p>
                  <p className="text-lg font-bold">{gpa}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {selectedCalculator === "Time Zone Converter" && (
          <Card className="bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-black dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Time Zone Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timeToConvert" className="text-gray-700 dark:text-slate-300">Time to Convert</Label>
                <Input
                  id="timeToConvert"
                  type="datetime-local"
                  value={timeToConvert}
                  onChange={(e) => setTimeToConvert(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromTimeZone" className="text-gray-700 dark:text-slate-300">From Time Zone</Label>
                <Select value={fromTimeZone} onValueChange={setFromTimeZone}>
                  <SelectTrigger className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400">
                    <SelectValue placeholder="Select a time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="toTimeZone" className="text-gray-700 dark:text-slate-300">To Time Zone</Label>
                <Select value={toTimeZone} onValueChange={setToTimeZone}>
                  <SelectTrigger className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400">
                    <SelectValue placeholder="Select a time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={convertTime} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Convert Time</Button>
              {convertedTime && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <p className="text-sm font-medium">Converted Time:</p>
                  <p className="text-lg font-bold">{convertedTime}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {selectedCalculator === 'Unit Converter' && (
            <Card className="w-full max-w-md mx-auto bg-gray-100 dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-700 shadow-lg rounded-lg">
                <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Unit Converter</CardTitle>
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="unitCategory" className="text-gray-700 dark:text-gray-300">Unit Category</Label>
                        <Select value={selectedUnitCategory} onValueChange={setSelectedUnitCategory}>
                            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white">
                                {Object.keys(unitCategories).map((category) => (
                                    <SelectItem key={category} value={category}>{category}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="unitAmount" className="text-gray-700 dark:text-gray-300">Amount</Label>
                        <Input
                            id="unitAmount"
                            type="number"
                            value={unitAmount}
                            onChange={(e) => setUnitAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fromUnit" className="text-gray-700 dark:text-gray-300">From Unit</Label>
                        <Select value={fromUnit} onValueChange={setFromUnit}>
                            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white">
                                {unitCategories[selectedUnitCategory as keyof typeof unitCategories].map((unit) => (
                                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="toUnit" className="text-gray-700 dark:text-gray-300">To Unit</Label>
                        <Select value={toUnit} onValueChange={setToUnit}>
                            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white">
                                {unitCategories[selectedUnitCategory as keyof typeof unitCategories].map((unit) => (
                                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={convertUnits} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Convert Unit
                    </Button>
                    {convertedUnit !== null && (
                        <div className="mt-4 p-3 bg-gray-200 dark:bg-gray-700 rounded-md text-center text-lg font-semibold">
                            Converted Amount: {convertedUnit.toFixed(4)}
                        </div>
                    )}
                </div>
            </Card>
            )}

            {selectedCalculator === 'Bill Split Calculator' && (
                <Card className="w-full max-w-md mx-auto bg-gray-100 dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-700 shadow-lg rounded-lg">
                    <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Bill Split Calculator</CardTitle>
                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="totalBill" className="text-gray-700 dark:text-gray-300">Total Bill Amount</Label>
                            <Input
                                id="totalBill"
                                type="number"
                                value={totalBill}
                                onChange={(e) => setTotalBill(e.target.value)}
                                placeholder="Enter total bill"
                                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="numberOfPeople" className="text-gray-700 dark:text-gray-300">Number of People</Label>
                            <Input
                                id="numberOfPeople"
                                type="number"
                                value={numberOfPeople}
                                onChange={(e) => setNumberOfPeople(e.target.value)}
                                placeholder="Enter number of people"
                                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tipPercentage" className="text-gray-700 dark:text-gray-300">Tip Percentage (%)</Label>
                            <Input
                                id="tipPercentage"
                                type="number"
                                value={tipPercentage}
                                onChange={(e) => setTipPercentage(e.target.value)}
                                placeholder="Enter tip percentage"
                                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
                            />
                        </div>
                        <Button onClick={calculateBillSplit} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Calculate Share
                        </Button>
                        {individualShare !== null && (
                            <div className="mt-4 p-3 bg-gray-200 dark:bg-gray-700 rounded-md text-center text-lg font-semibold">
                                Each person pays: ${individualShare.toFixed(2)}
                            </div>
                        )}
                    </div>
                </Card>
            )}
        </main>
        </div>
    )
}