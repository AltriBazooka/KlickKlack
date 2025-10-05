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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Time Zone Converter</CardTitle>
        <CardDescription>Convert time between different time zones.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="timeToConvert">Time</Label>
            <Input
              id="timeToConvert"
              type="time"
              value={timeToConvert}
              onChange={(e) => setTimeToConvert(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="fromTimeZone">From Time Zone</Label>
            <Select value={fromTimeZone} onValueChange={setFromTimeZone}>
              <SelectTrigger>
                <SelectValue placeholder="Select source time zone" />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="toTimeZone">To Time Zone</Label>
            <Select value={toTimeZone} onValueChange={setToTimeZone}>
              <SelectTrigger>
                <SelectValue placeholder="Select target time zone" />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={convertTime}>Convert Time</Button>
          {convertedTime && (
            <div className="text-center text-xl font-semibold">
              Converted Time: {convertedTime}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}