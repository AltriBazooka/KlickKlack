"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function UnitConverter() {
  const [selectedUnitCategory, setSelectedUnitCategory] = useState("area");
  const [fromUnit, setFromUnit] = useState("square meters");
  const [toUnit, setToUnit] = useState("square feet");
  const [unitAmount, setUnitAmount] = useState<number>(1);
  const [convertedUnit, setConvertedUnit] = useState<number | null>(null);
  // const [showResult, setShowResult] = useState<boolean>(false);

  const unitCategories = {
    length: {
      units: ["kilometers", "meters", "centimeters", "millimeters", "micrometers", "nanometers", "miles", "yards", "feet", "inches", "nautical miles"],
      conversions: {
        meters: { feet: 3.28084, inches: 39.3701, centimeters: 100, kilometers: 0.001, miles: 0.000621371, millimeters: 1000, micrometers: 1000000, nanometers: 1000000000, yards: 1.09361, "nautical miles": 0.000539957 },
        feet: { meters: 0.3048, inches: 12, centimeters: 30.48, kilometers: 0.0003048, miles: 0.000189394, millimeters: 304.8, micrometers: 304800, nanometers: 304800000, yards: 0.333333, "nautical miles": 0.000164579 },
        inches: { meters: 0.0254, feet: 0.0833333, centimeters: 2.54, kilometers: 0.0000254, miles: 0.0000157828, millimeters: 25.4, micrometers: 25400, nanometers: 25400000, yards: 0.0277778, "nautical miles": 0.0000137149 },
        centimeters: { meters: 0.01, feet: 0.0328084, inches: 0.393701, kilometers: 0.00001, miles: 0.00000621371, millimeters: 10, micrometers: 10000, nanometers: 10000000, yards: 0.0109361, "nautical miles": 0.00000539957 },
        kilometers: { meters: 1000, feet: 3280.84, inches: 39370.1, centimeters: 100000, miles: 0.621371, millimeters: 1000000, micrometers: 1000000000, nanometers: 1000000000000, yards: 1093.61, "nautical miles": 0.539957 },
        miles: { meters: 1609.34, feet: 5280, inches: 63360, centimeters: 160934, kilometers: 1.60934, millimeters: 1609340, micrometers: 1609340000, nanometers: 1609340000000, yards: 1760, "nautical miles": 0.868976 },
        millimeters: { meters: 0.001, feet: 0.00328084, inches: 0.0393701, centimeters: 0.1, kilometers: 0.000001, miles: 0.000000621371, micrometers: 1000, nanometers: 1000000, yards: 0.00109361, "nautical miles": 0.000000539957 },
        micrometers: { meters: 0.000001, feet: 0.00000328084, inches: 0.0000393701, centimeters: 0.0001, kilometers: 0.000000001, miles: 0.000000000621371, millimeters: 0.001, nanometers: 1000, yards: 0.00000109361, "nautical miles": 0.000000000539957 },
        nanometers: { meters: 0.000000001, feet: 0.00000000328084, inches: 0.0000000393701, centimeters: 0.0000001, kilometers: 0.000000000001, miles: 0.000000000000621371, millimeters: 0.000001, micrometers: 0.001, yards: 0.00000000109361, "nautical miles": 0.000000000000539957 },
        yards: { meters: 0.9144, feet: 3, inches: 36, centimeters: 91.44, kilometers: 0.0009144, miles: 0.000568182, millimeters: 914.4, micrometers: 914400, nanometers: 914400000, "nautical miles": 0.000493737 },
        "nautical miles": { meters: 1852, feet: 6076.12, inches: 72913.4, centimeters: 185200, kilometers: 1.852, miles: 1.15078, millimeters: 1852000, micrometers: 1852000000, nanometers: 1852000000000, yards: 2025.37 },
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
    area: {
      units: ["square meters", "square kilometers", "square centimeters", "square millimeters", "square miles", "square yards", "square feet", "square inches", "acres", "hectares"],
      conversions: {
        "square meters": { "square kilometers": 0.000001, "square centimeters": 10000, "square millimeters": 1000000, "square miles": 3.861e-7, "square yards": 1.19599, "square feet": 10.7639, "square inches": 1550, acres: 0.000247105, hectares: 0.0001 },
        "square kilometers": { "square meters": 1000000, "square centimeters": 1e10, "square millimeters": 1e12, "square miles": 0.386102, "square yards": 1.196e6, "square feet": 1.076e7, "square inches": 1.55e9, acres: 247.105, hectares: 100 },
        "square centimeters": { "square meters": 0.0001, "square kilometers": 1e-10, "square millimeters": 100, "square miles": 3.861e-11, "square yards": 0.000119599, "square feet": 0.00107639, "square inches": 0.155, acres: 2.471e-8, hectares: 1e-8 },
        "square millimeters": { "square meters": 1e-6, "square kilometers": 1e-12, "square centimeters": 0.01, "square miles": 3.861e-13, "square yards": 1.196e-6, "square feet": 1.076e-5, "square inches": 0.00155, acres: 2.471e-10, hectares: 1e-10 },
        "square miles": { "square meters": 2.59e6, "square kilometers": 2.58999, "square centimeters": 2.59e10, "square millimeters": 2.59e12, "square yards": 3.098e6, "square feet": 2.788e7, "square inches": 4.014e9, acres: 640, hectares: 258.999 },
        "square yards": { "square meters": 0.836127, "square kilometers": 8.3613e-7, "square centimeters": 8361.27, "square millimeters": 836127, "square miles": 3.2283e-7, "square feet": 9, "square inches": 1296, acres: 0.000206612, hectares: 0.0000836127 },
        "square feet": { "square meters": 0.092903, "square kilometers": 9.2903e-8, "square centimeters": 929.03, "square millimeters": 92903, "square miles": 3.587e-8, "square yards": 0.111111, "square inches": 144, acres: 2.2957e-5, hectares: 9.2903e-6 },
        "square inches": { "square meters": 0.00064516, "square kilometers": 6.4516e-10, "square centimeters": 6.4516, "square millimeters": 645.16, "square miles": 2.491e-10, "square yards": 0.000771605, "square feet": 0.00694444, acres: 1.5942e-7, hectares: 6.4516e-8 },
        acres: { "square meters": 4046.86, "square kilometers": 0.00404686, "square centimeters": 4.047e7, "square millimeters": 4.047e9, "square miles": 0.0015625, "square yards": 4840, "square feet": 43560, "square inches": 6.273e6, hectares: 0.404686 },
        hectares: { "square meters": 10000, "square kilometers": 0.01, "square centimeters": 1e8, "square millimeters": 1e10, "square miles": 0.00386102, "square yards": 11959.9, "square feet": 107639, "square inches": 1.55e7, acres: 2.47105 },
      },
    },
    "data transfer rate": {
      units: ["bits per second", "kilobits per second", "megabits per second", "gigabits per second", "terabits per second", "bytes per second", "kilobytes per second", "megabytes per second", "gigabytes per second", "terabytes per second"],
      conversions: {
        "bits per second": { "kilobits per second": 0.001, "megabits per second": 1e-6, "gigabits per second": 1e-9, "terabits per second": 1e-12, "bytes per second": 0.125, "kilobytes per second": 0.000125, "megabytes per second": 1.25e-7, "gigabytes per second": 1.25e-10, "terabytes per second": 1.25e-13 },
        "kilobits per second": { "bits per second": 1000, "megabits per second": 0.001, "gigabits per second": 1e-6, "terabits per second": 1e-9, "bytes per second": 125, "kilobytes per second": 0.125, "megabytes per second": 0.000125, "gigabytes per second": 1.25e-7, "terabytes per second": 1.25e-10 },
        "megabits per second": { "bits per second": 1e6, "kilobits per second": 1000, "gigabits per second": 0.001, "terabits per second": 1e-6, "bytes per second": 125000, "kilobytes per second": 125, "megabytes per second": 0.125, "gigabytes per second": 0.000125, "terabytes per second": 1.25e-7 },
        "gigabits per second": { "bits per second": 1e9, "kilobits per second": 1e6, "megabits per second": 1000, "terabits per second": 0.001, "bytes per second": 1.25e8, "kilobytes per second": 1.25e5, "megabytes per second": 125, "gigabytes per second": 0.125, "terabytes per second": 0.000125 },
        "terabits per second": { "bits per second": 1e12, "kilobits per second": 1e9, "megabits per second": 1e6, "gigabits per second": 1000, "bytes per second": 1.25e11, "kilobytes per second": 1.25e8, "megabytes per second": 1.25e5, "gigabytes per second": 125, "terabytes per second": 0.125 },
        "bytes per second": { "bits per second": 8, "kilobits per second": 0.008, "megabits per second": 8e-6, "gigabits per second": 8e-9, "terabits per second": 8e-12, "kilobytes per second": 0.001, "megabytes per second": 1e-6, "gigabytes per second": 1e-9, "terabytes per second": 1e-12 },
        "kilobytes per second": { "bits per second": 8000, "kilobits per second": 8, "megabits per second": 0.008, "gigabits per second": 8e-6, "terabits per second": 8e-9, "bytes per second": 1000, "megabytes per second": 0.001, "gigabytes per second": 1e-6, "terabytes per second": 1e-9 },
        "megabytes per second": { "bits per second": 8e6, "kilobits per second": 8000, "megabits per second": 8, "gigabits per second": 0.008, "terabits per second": 8e-6, "bytes per second": 1e6, "kilobytes per second": 1000, "gigabytes per second": 0.001, "terabytes per second": 1e-6 },
        "gigabytes per second": { "bits per second": 8e9, "kilobits per second": 8e6, "megabits per second": 8000, "gigabits per second": 8, "terabits per second": 0.008, "bytes per second": 1e9, "kilobytes per second": 1e6, "megabytes per second": 1000, "terabytes per second": 0.001 },
        "terabytes per second": { "bits per second": 8e12, "kilobits per second": 8e9, "megabits per second": 8e6, "gigabits per second": 8000, "terabits per second": 8, "bytes per second": 1e12, "kilobytes per second": 1e9, "megabytes per second": 1e6, "gigabytes per second": 1000 },
      },
    },
    "digital storage": {
      units: ["bits", "bytes", "kilobits", "megabits", "gigabits", "terabits", "kilobytes", "megabytes", "gigabytes", "terabytes"],
      conversions: {
        bits: { bytes: 0.125, kilobits: 0.001, megabits: 1e-6, gigabits: 1e-9, terabits: 1e-12, kilobytes: 0.000125, megabytes: 1.25e-7, gigabytes: 1.25e-10, terabytes: 1.25e-13 },
        bytes: { bits: 8, kilobits: 0.008, megabits: 8e-6, gigabits: 8e-9, terabits: 8e-12, kilobytes: 0.001, megabytes: 1e-6, gigabytes: 1e-9, terabytes: 1e-12 },
        kilobits: { bits: 1000, bytes: 125, megabits: 0.001, gigabits: 1e-6, terabits: 1e-9, kilobytes: 0.125, megabytes: 0.000125, gigabytes: 1.25e-7, terabytes: 1.25e-10 },
        megabits: { bits: 1e6, bytes: 125000, kilobits: 1000, gigabits: 0.001, terabits: 1e-6, kilobytes: 125, megabytes: 0.125, gigabytes: 0.000125, terabytes: 1.25e-7 },
        gigabits: { bits: 1e9, bytes: 1.25e8, kilobits: 1e6, megabits: 1000, terabits: 0.001, kilobytes: 1.25e5, megabytes: 125, gigabytes: 0.125, terabytes: 0.000125 },
        terabits: { bits: 1e12, bytes: 1.25e11, kilobits: 1e9, megabits: 1e6, gigabits: 1000, kilobytes: 1.25e8, megabytes: 1.25e5, gigabytes: 125, terabytes: 0.125 },
        kilobytes: { bits: 8000, bytes: 1000, kilobits: 8, megabits: 0.008, gigabits: 8e-6, terabits: 8e-9, megabytes: 0.001, gigabytes: 1e-6, terabytes: 1e-9 },
        megabytes: { bits: 8e6, bytes: 1e6, kilobits: 8000, megabits: 8, gigabits: 0.008, terabits: 8e-6, kilobytes: 1000, gigabytes: 0.001, terabytes: 1e-6 },
        gigabytes: { bits: 8e9, bytes: 1e9, kilobits: 8e6, megabits: 8000, gigabits: 8, terabits: 0.008, kilobytes: 1e6, megabytes: 1000, terabytes: 0.001 },
        terabytes: { bits: 8e12, bytes: 1e12, kilobits: 8e9, megabits: 8e6, gigabits: 8000, terabits: 8, kilobytes: 1e9, megabytes: 1e6, gigabytes: 1000 },
      },
    },
    energy: {
      units: ["joules", "kilojoules", "calories", "kilocalories", "watt-hours", "kilowatt-hours", "electronvolts", "BTUs"],
      conversions: {
        joules: { kilojoules: 0.001, calories: 0.239006, kilocalories: 0.000239006, "watt-hours": 0.000277778, "kilowatt-hours": 2.7778e-7, electronvolts: 6.242e18, BTUs: 0.000947817 },
        kilojoules: { joules: 1000, calories: 239.006, kilocalories: 0.239006, "watt-hours": 0.277778, "kilowatt-hours": 0.000277778, electronvolts: 6.242e21, BTUs: 0.947817 },
        calories: { joules: 4.184, kilojoules: 0.004184, kilocalories: 0.001, "watt-hours": 0.00116222, "kilowatt-hours": 1.1622e-6, electronvolts: 2.611e19, BTUs: 0.00396567 },
        kilocalories: { joules: 4184, kilojoules: 4.184, calories: 1000, "watt-hours": 1.16222, "kilowatt-hours": 0.00116222, electronvolts: 2.611e22, BTUs: 3.96567 },
        "watt-hours": { joules: 3600, kilojoules: 3.6, calories: 859.845, kilocalories: 0.859845, "kilowatt-hours": 0.001, electronvolts: 2.247e22, BTUs: 3.41214 },
        "kilowatt-hours": { joules: 3.6e6, kilojoules: 3600, calories: 859845, kilocalories: 859.845, "watt-hours": 1000, electronvolts: 2.247e25, BTUs: 3412.14 },
        electronvolts: { joules: 1.60218e-19, kilojoules: 1.60218e-22, calories: 3.82929e-20, kilocalories: 3.82929e-23, "watt-hours": 4.4505e-23, "kilowatt-hours": 4.4505e-26, BTUs: 1.5186e-22 },
        BTUs: { joules: 1055.06, kilojoules: 1.05506, calories: 252.164, kilocalories: 0.252164, "watt-hours": 0.293071, "kilowatt-hours": 0.000293071, electronvolts: 6.585e21 },
      },
    },
    frequency: {
      units: ["hertz", "kilohertz", "megahertz", "gigahertz"],
      conversions: {
        hertz: { kilohertz: 0.001, megahertz: 1e-6, gigahertz: 1e-9 },
        kilohertz: { hertz: 1000, megahertz: 0.001, gigahertz: 1e-6 },
        megahertz: { hertz: 1e6, kilohertz: 1000, gigahertz: 0.001 },
        gigahertz: { hertz: 1e9, kilohertz: 1e6, megahertz: 1000 },
      },
    },
    "fuel economy": {
      units: ["miles per gallon (US)", "miles per gallon (UK)", "kilometers per liter", "liters per 100 km"],
      conversions: {
        "miles per gallon (US)": { "miles per gallon (UK)": 1.20095, "kilometers per liter": 0.425144, "liters per 100 km": (mpg: number) => 235.214583 / mpg },
        "miles per gallon (UK)": { "miles per gallon (US)": 0.832674, "kilometers per liter": 0.354006, "liters per 100 km": (mpg: number) => 282.481 / mpg },
        "kilometers per liter": { "miles per gallon (US)": 2.35214583, "miles per gallon (UK)": 2.82481, "liters per 100 km": (kpl: number) => 100 / kpl },
        "liters per 100 km": { "miles per gallon (US)": (lphk: number) => 235.214583 / lphk, "miles per gallon (UK)": (lphk: number) => 282.481 / lphk, "kilometers per liter": (lphk: number) => 100 / lphk },
      },
    },
    mass: {
      units: ["kilograms", "grams", "milligrams", "micrograms", "metric tons", "pounds", "ounces", "stones"],
      conversions: {
        kilograms: { grams: 1000, milligrams: 1e6, micrograms: 1e9, "metric tons": 0.001, pounds: 2.20462, ounces: 35.274, stones: 0.157473 },
        grams: { kilograms: 0.001, milligrams: 1000, micrograms: 1e6, "metric tons": 1e-6, pounds: 0.00220462, ounces: 0.035274, stones: 0.000157473 },
        milligrams: { kilograms: 1e-6, grams: 0.001, micrograms: 1000, "metric tons": 1e-9, pounds: 2.2046e-6, ounces: 3.5274e-5, stones: 1.5747e-7 },
        micrograms: { kilograms: 1e-9, grams: 1e-6, milligrams: 0.001, "metric tons": 1e-12, pounds: 2.2046e-9, ounces: 3.5274e-8, stones: 1.5747e-10 },
        "metric tons": { kilograms: 1000, grams: 1e6, milligrams: 1e9, micrograms: 1e12, pounds: 2204.62, ounces: 35274, stones: 157.473 },
        pounds: { kilograms: 0.453592, grams: 453.592, milligrams: 453592, micrograms: 4.536e8, "metric tons": 0.000453592, ounces: 16, stones: 0.0714286 },
        ounces: { kilograms: 0.0283495, grams: 28.3495, milligrams: 28349.5, micrograms: 2.835e7, "metric tons": 2.835e-5, pounds: 0.0625, stones: 0.00446429 },
        stones: { kilograms: 6.35029, grams: 6350.29, milligrams: 6.35e6, micrograms: 6.35e9, "metric tons": 0.00635029, pounds: 14, ounces: 224 },
      },
    },
    "plane angle": {
      units: ["degrees", "radians", "gradians", "arcminutes", "arcseconds"],
      conversions: {
        degrees: { radians: 0.0174533, gradians: 1.11111, arcminutes: 60, arcseconds: 3600 },
        radians: { degrees: 57.2958, gradians: 63.662, arcminutes: 3437.75, arcseconds: 206265 },
        gradians: { degrees: 0.9, radians: 0.015708, arcminutes: 54, arcseconds: 3240 },
        arcminutes: { degrees: 0.0166667, radians: 0.000290888, gradians: 0.0185185, arcseconds: 60 },
        arcseconds: { degrees: 0.000277778, radians: 4.8481e-6, gradians: 0.000308642, arcminutes: 0.0166667 },
      },
    },
    pressure: {
      units: ["pascals", "kilopascals", "megapascals", "PSI", "bar", "atmosphere", "torr"],
      conversions: {
        pascals: { kilopascals: 0.001, megapascals: 1e-6, PSI: 0.000145038, bar: 1e-5, atmosphere: 9.8692e-6, torr: 0.00750062 },
        kilopascals: { pascals: 1000, megapascals: 0.001, PSI: 0.145038, bar: 0.01, atmosphere: 0.00986923, torr: 7.50062 },
        megapascals: { pascals: 1e6, kilopascals: 1000, PSI: 145.038, bar: 10, atmosphere: 9.86923, torr: 7500.62 },
        PSI: { pascals: 6894.76, kilopascals: 6.89476, megapascals: 0.00689476, bar: 0.0689476, atmosphere: 0.068046, torr: 51.7149 },
        bar: { pascals: 100000, kilopascals: 100, megapascals: 0.1, PSI: 14.5038, atmosphere: 0.986923, torr: 750.062 },
        atmosphere: { pascals: 101325, kilopascals: 101.325, megapascals: 0.101325, PSI: 14.6959, bar: 1.01325, torr: 760 },
        torr: { pascals: 133.322, kilopascals: 0.133322, megapascals: 0.000133322, PSI: 0.0193368, bar: 0.00133322, atmosphere: 0.00131579 },
      },
    },
    speed: {
      units: ["meters per second", "kilometers per hour", "miles per hour", "knots", "feet per second"],
      conversions: {
        "meters per second": { "kilometers per hour": 3.6, "miles per hour": 2.23694, knots: 1.94384, "feet per second": 3.28084 },
        "kilometers per hour": { "meters per second": 0.277778, "miles per hour": 0.621371, knots: 0.539957, "feet per second": 0.911344 },
        "miles per hour": { "meters per second": 0.44704, "kilometers per hour": 1.60934, knots: 0.868976, "feet per second": 1.46667 },
        knots: { "meters per second": 0.514444, "kilometers per hour": 1.852, "miles per hour": 1.15078, "feet per second": 1.68781 },
        "feet per second": { "meters per second": 0.3048, "kilometers per hour": 1.09728, "miles per hour": 0.681818, knots: 0.592484 },
      },
    },
    time: {
      units: ["seconds", "milliseconds", "microseconds", "nanoseconds", "minutes", "hours", "days", "weeks", "months", "years"],
      conversions: {
        seconds: { milliseconds: 1000, microseconds: 1e6, nanoseconds: 1e9, minutes: 0.0166667, hours: 0.000277778, days: 1.1574e-5, weeks: 1.6534e-6, months: 3.8052e-7, years: 3.171e-8 },
        milliseconds: { seconds: 0.001, microseconds: 1000, nanoseconds: 1e6, minutes: 1.6667e-5, hours: 2.7778e-7, days: 1.1574e-8, weeks: 1.6534e-9, months: 3.8052e-10, years: 3.171e-11 },
        microseconds: { seconds: 1e-6, milliseconds: 0.001, nanoseconds: 1000, minutes: 1.6667e-8, hours: 2.7778e-10, days: 1.1574e-11, weeks: 1.6534e-12, months: 3.8052e-13, years: 3.171e-14 },
        nanoseconds: { seconds: 1e-9, milliseconds: 1e-6, microseconds: 0.001, minutes: 1.6667e-11, hours: 2.7778e-13, days: 1.1574e-14, weeks: 1.6534e-15, months: 3.8052e-16, years: 3.171e-17 },
        minutes: { seconds: 60, milliseconds: 60000, microseconds: 6e7, nanoseconds: 6e10, hours: 0.0166667, days: 0.000694444, weeks: 9.9206e-5, months: 2.2831e-5, years: 1.9026e-6 },
        hours: { seconds: 3600, milliseconds: 3.6e6, microseconds: 3.6e9, nanoseconds: 3.6e12, minutes: 60, days: 0.0416667, weeks: 0.00595238, months: 0.00136986, years: 0.000114155 },
        days: { seconds: 86400, milliseconds: 8.64e7, microseconds: 8.64e10, nanoseconds: 8.64e13, minutes: 1440, hours: 24, weeks: 0.142857, months: 0.0328767, years: 0.00273973 },
        weeks: { seconds: 604800, milliseconds: 6.048e8, microseconds: 6.048e11, nanoseconds: 6.048e14, minutes: 10080, hours: 168, days: 7, months: 0.22998, years: 0.0191781 },
        months: { seconds: 2.62974e6, milliseconds: 2.62974e9, microseconds: 2.62974e12, nanoseconds: 2.62974e15, minutes: 43829.1, hours: 730.485, days: 30.4369, weeks: 4.34813, years: 0.0833333 },
        years: { seconds: 3.15569e7, milliseconds: 3.15569e10, microseconds: 3.15569e13, nanoseconds: 3.15569e16, minutes: 525949, hours: 8765.81, days: 365.242, weeks: 52.1775, months: 12 },
      },
    },
    volume: {
      units: ["cubic meters", "liters", "milliliters", "gallons (US)", "quarts (US)", "pints (US)", "cups (US)", "fluid ounces (US)", "cubic feet", "cubic inches"],
      conversions: {
        "cubic meters": { liters: 1000, milliliters: 1e6, "gallons (US)": 264.172, "quarts (US)": 1056.69, "pints (US)": 2113.38, "cups (US)": 4226.75, "fluid ounces (US)": 33814, "cubic feet": 35.3147, "cubic inches": 61023.7 },
        liters: { "cubic meters": 0.001, milliliters: 1000, "gallons (US)": 0.264172, "quarts (US)": 1.05669, "pints (US)": 2.11338, "cups (US)": 4.22675, "fluid ounces (US)": 33.814, "cubic feet": 0.0353147, "cubic inches": 61.0237 },
        milliliters: { "cubic meters": 1e-6, liters: 0.001, "gallons (US)": 0.000264172, "quarts (US)": 0.00105669, "pints (US)": 0.00211338, "cups (US)": 0.00422675, "fluid ounces (US)": 0.033814, "cubic feet": 3.53147e-5, "cubic inches": 0.0610237 },
        "gallons (US)": { "cubic meters": 0.00378541, liters: 3.78541, milliliters: 3785.41, "quarts (US)": 4, "pints (US)": 8, "cups (US)": 16, "fluid ounces (US)": 128, "cubic feet": 0.133681, "cubic inches": 231 },
        "quarts (US)": { "cubic meters": 0.000946353, liters: 0.946353, milliliters: 946.353, "gallons (US)": 0.25, "pints (US)": 2, "cups (US)": 4, "fluid ounces (US)": 32, "cubic feet": 0.0334201, "cubic inches": 57.75 },
        "pints (US)": { "cubic meters": 0.000473176, liters: 0.473176, milliliters: 473.176, "gallons (US)": 0.125, "quarts (US)": 0.5, "cups (US)": 2, "fluid ounces (US)": 16, "cubic feet": 0.0167101, "cubic inches": 28.875 },
        "cups (US)": { "cubic meters": 0.000236588, liters: 0.236588, milliliters: 236.588, "gallons (US)": 0.0625, "quarts (US)": 0.25, "pints (US)": 0.5, "fluid ounces (US)": 8, "cubic feet": 0.00835503, "cubic inches": 14.4375 },
        "fluid ounces (US)": { "cubic meters": 2.95735e-5, liters: 0.0295735, milliliters: 29.5735, "gallons (US)": 0.0078125, "quarts (US)": 0.03125, "pints (US)": 0.0625, "cups (US)": 0.125, "cubic feet": 0.00104438, "cubic inches": 1.80469 },
        "cubic feet": { "cubic meters": 0.0283168, liters: 28.3168, milliliters: 28316.8, "gallons (US)": 7.48052, "quarts (US)": 29.9221, "pints (US)": 59.8442, "cups (US)": 119.688, "fluid ounces (US)": 957.506, "cubic inches": 1728 },
        "cubic inches": { "cubic meters": 1.63871e-5, liters: 0.0163871, milliliters: 16.3871, "gallons (US)": 0.004329, "quarts (US)": 0.017316, "pints (US)": 0.034632, "cups (US)": 0.069264, "fluid ounces (US)": 0.554113, "cubic feet": 0.000578704 },
      },
    },
  };

  useEffect(() => {
    if (unitCategories[selectedUnitCategory]) {
      setFromUnit(unitCategories[selectedUnitCategory].units[0]);
      setToUnit(unitCategories[selectedUnitCategory].units[1] || unitCategories[selectedUnitCategory].units[0]);
      // setConvertedUnit(null);
      // setShowResult(false);
    }
  }, [selectedUnitCategory]);

  useEffect(() => {
    convertUnits();
  }, [unitAmount, fromUnit, toUnit, selectedUnitCategory]);

  const convertUnits = () => {
    const category = unitCategories[selectedUnitCategory];
    if (!category) {
      setConvertedUnit(null);
      // setShowResult(true);
      return;
    }

    let result: number | null = null;

    if (fromUnit === toUnit) {
      result = unitAmount;
    } else if (selectedUnitCategory === "temperature") {
      const conversionFn = category.conversions[fromUnit]?.[toUnit];
      if (conversionFn && typeof conversionFn === "function") {
        result = conversionFn(unitAmount);
      }
    } else {
      const conversionRate = category.conversions[fromUnit]?.[toUnit];
      if (conversionRate) {
        result = unitAmount * conversionRate;
      }
    }
    setConvertedUnit(result);
    // setShowResult(true);
  };



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
          <div className="flex items-center gap-2">
            <div className="grid gap-1 flex-1">
              <Label htmlFor="amount" className="sr-only">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={unitAmount}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setUnitAmount(isNaN(value) ? 0 : value);
                }}
                placeholder="Enter amount"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50"
              />
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
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">=</div>
            <div className="grid gap-1 flex-1">
              <Label htmlFor="convertedAmount" className="sr-only">Converted Amount</Label>
              <Input
                id="convertedAmount"
                type="text"
                readOnly
                value={convertedUnit !== null && !isNaN(convertedUnit) ? convertedUnit.toFixed(4) : ""}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50"
              />
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
        </div>
      </CardContent>
    </Card>
  );
}