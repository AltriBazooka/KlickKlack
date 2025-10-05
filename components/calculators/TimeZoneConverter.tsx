"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function TimeZoneConverter() {
  const [timeToConvert, setTimeToConvert] = useState("12:00");
  const [fromTimeZone, setFromTimeZone] = useState("America/New_York");
  const [toTimeZone, setToTimeZone] = useState("Europe/London");
  const [convertedTime, setConvertedTime] = useState<string | null>(null);

  const timeZones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Berlin",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
  ];

  const convertTime = () => {
    try {
      const [hours, minutes] = timeToConvert.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);

      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        timeZone: toTimeZone,
      };

      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: fromTimeZone,
      });
      const formattedFromTime = formatter.format(date);

      const convertedDate = new Date(date.toLocaleString("en-US", { timeZone: fromTimeZone }));
      const targetDate = new Date(convertedDate.toLocaleString("en-US", { timeZone: toTimeZone }));

      setConvertedTime(targetDate.toLocaleTimeString("en-US", options));
    } catch (error) {
      setConvertedTime("Invalid Time");
    }
  };

  useEffect(() => {
    convertTime();
  }, [timeToConvert, fromTimeZone, toTimeZone]);

  return (
    <Card className="w-full max-w-md bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-700 dark:text-gray-300">Time Zone Converter</CardTitle>
        <CardDescription className="text-gray-700 dark:text-gray-300">Convert time between different time zones.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="timeToConvert" className="text-gray-700 dark:text-gray-300">Time</Label>
            <Input
              id="timeToConvert"
              type="time"
              value={timeToConvert}
              onChange={(e) => setTimeToConvert(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="fromTimeZone" className="text-gray-700 dark:text-gray-300">From Time Zone</Label>
            <Select value={fromTimeZone} onValueChange={setFromTimeZone}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50">
                <SelectValue placeholder="Select source time zone" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                {timeZones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="toTimeZone" className="text-gray-700 dark:text-gray-300">To Time Zone</Label>
            <Select value={toTimeZone} onValueChange={setToTimeZone}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50">
                <SelectValue placeholder="Select target time zone" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                {timeZones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={convertTime} className="bg-blue-500 hover:bg-blue-600 text-white">Convert Time</Button>
          {convertedTime && (
            <div className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300">
              Converted Time: {convertedTime}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}