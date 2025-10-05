"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const GeometryCalculator = () => {
  const [geometryShape, setGeometryShape] = useState('Circle');
  const [side1, setSide1] = useState<number | ''>('');
  const [side2, setSide2] = useState<number | ''>('');
  const [radius, setRadius] = useState<number | ''>('');
  const [base, setBase] = useState<number | ''>('');
  const [geometryHeight, setGeometryHeight] = useState<number | ''>('');
  const [area, setArea] = useState<number | null>(null);
  const [perimeter, setPerimeter] = useState<number | null>(null);

  const calculateGeometry = () => {
    setArea(null);
    setPerimeter(null);

    switch (geometryShape) {
      case 'Circle':
        if (radius) {
          const r = Number(radius);
          setArea(Math.PI * r * r);
          setPerimeter(2 * Math.PI * r);
        }
        break;
      case 'Square':
        if (side1) {
          const s = Number(side1);
          setArea(s * s);
          setPerimeter(4 * s);
        }
        break;
      case 'Rectangle':
        if (side1 && side2) {
          const l = Number(side1);
          const w = Number(side2);
          setArea(l * w);
          setPerimeter(2 * (l + w));
        }
        break;
      case 'Triangle':
        if (base && geometryHeight && side1 && side2) { // Assuming side1 and side2 are the other two sides for perimeter
          const b = Number(base);
          const h = Number(geometryHeight);
          const s1 = Number(side1);
          const s2 = Number(side2);
          setArea(0.5 * b * h);
          setPerimeter(b + s1 + s2);
        } else if (base && geometryHeight) { // For area only if sides are not provided for perimeter
          const b = Number(base);
          const h = Number(geometryHeight);
          setArea(0.5 * b * h);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Geometry Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="geometryShape" className="text-gray-700 dark:text-gray-300">Shape</Label>
          <Select onValueChange={setGeometryShape} value={geometryShape}>
            <SelectTrigger className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400">
              <SelectValue placeholder="Select a shape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Circle">Circle</SelectItem>
              <SelectItem value="Square">Square</SelectItem>
              <SelectItem value="Rectangle">Rectangle</SelectItem>
              <SelectItem value="Triangle">Triangle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {geometryShape === 'Circle' && (
          <div className="grid gap-2">
            <Label htmlFor="radius">Radius</Label>
            <Input
              id="radius"
              type="number"
              placeholder="Enter radius"
              value={radius === '' ? '' : radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
            />
          </div>
        )}

        {geometryShape === 'Square' && (
          <div className="grid gap-2">
            <Label htmlFor="side1">Side Length</Label>
            <Input
              id="side1"
              type="number"
              placeholder="Enter side length"
              value={side1 === '' ? '' : side1}
              onChange={(e) => setSide1(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
            />
          </div>
        )}

        {geometryShape === 'Rectangle' && (
          <div className="grid gap-2">
            <Label htmlFor="side1">Length</Label>
            <Input
              id="side1"
              type="number"
              placeholder="Enter length"
              value={side1 === '' ? '' : side1}
              onChange={(e) => setSide1(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
            />
            <Label htmlFor="side2">Width</Label>
            <Input
              id="side2"
              type="number"
              placeholder="Enter width"
              value={side2 === '' ? '' : side2}
              onChange={(e) => setSide2(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
            />
          </div>
        )}

        {geometryShape === 'Triangle' && (
          <div className="grid gap-2">
            <Label htmlFor="base">Base</Label>
            <Input
              id="base"
              type="number"
              placeholder="Enter base length"
              value={base === '' ? '' : base}
              onChange={(e) => setBase(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
            />
            <Label htmlFor="geometryHeight">Height</Label>
            <Input
              id="geometryHeight"
              type="number"
              placeholder="Enter height"
              value={geometryHeight === '' ? '' : geometryHeight}
              onChange={(e) => setGeometryHeight(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
            />
            <Label htmlFor="side1">Side 1 (for perimeter)</Label>
            <Input
              id="side1"
              type="number"
              placeholder="Enter side 1 length"
              value={side1 === '' ? '' : side1}
              onChange={(e) => setSide1(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
            />
            <Label htmlFor="side2">Side 2 (for perimeter)</Label>
            <Input
              id="side2"
              type="number"
              placeholder="Enter side 2 length"
              value={side2 === '' ? '' : side2}
              onChange={(e) => setSide2(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
            />
          </div>
        )}

        <Button onClick={calculateGeometry} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Calculate Geometry
        </Button>

        {(area !== null || perimeter !== null) && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
            {area !== null && (
              <p className="text-sm font-medium">Area: {area.toFixed(2)}</p>
            )}
            {perimeter !== null && (
              <p className="text-sm font-medium">Perimeter: {perimeter.toFixed(2)}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};