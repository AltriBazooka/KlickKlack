"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function WheelOfNames() {
  const [namesInput, setNamesInput] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef<HTMLCanvasElement>(null);
  const [startAngle, setStartAngle] = useState(0);
  const [arc, setArc] = useState(0);

  useEffect(() => {
    if (names.length > 0) {
      setArc(2 * Math.PI / names.length);
      drawWheel();
    }
  }, [names, startAngle]);

  const drawWheel = () => {
    const canvas = wheelRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const outsideRadius = 200;
    const textRadius = 160;
    const insideRadius = 30; // Increased inside radius for the central circle

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.font = "bold 20px Arial"; // Increased font size and changed font family

    for (let i = 0; i < names.length; i++) {
      const angle = startAngle + i * arc;
      ctx.fillStyle = getColor(i);

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.lineTo(250 + Math.cos(angle) * insideRadius, 250 + Math.sin(angle) * insideRadius); // Draw line to inner circle
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.closePath(); // Close the path to form a segment
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.fillStyle = "white";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2); // Rotate text to be upright within the segment
      const text = names[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    // Draw central circle
    ctx.beginPath();
    ctx.arc(250, 250, insideRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    // Draw pointer
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(250 + outsideRadius + 10, 250);
    ctx.lineTo(250 + outsideRadius - 10, 240);
    ctx.lineTo(250 + outsideRadius - 10, 260);
    ctx.closePath();
    ctx.fill();
  };

  const getColor = (itemIndex: number) => {
    const colors = ["#FF0000", "#0000FF", "#008000", "#FFFF00"]; // Red, Blue, Green, Yellow
    return colors[itemIndex % colors.length];
  };

  const spin = () => {
    if (names.length === 0) return;
    setSpinning(true);
    setResult(null);

    const spinTimeTotal = 3000; // Total spin duration in milliseconds
    let startTime: DOMHighResTimeStamp | null = null;

    const winningIndex = Math.floor(Math.random() * names.length);
    const numRotations = 5 + Math.random() * 5; // 5 to 10 full rotations

    // Calculate the target angle for the winning segment to align with the pointer (top, Math.PI / 2)
    const targetAngleForWinningSegment = Math.PI / 2 - (winningIndex * arc + arc / 2);
    const finalAngle = (numRotations * 2 * Math.PI) + targetAngleForWinningSegment;

    const initialStartAngle = startAngle; // Capture the current startAngle

    const runSpin = (timestamp: DOMHighResTimeStamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / spinTimeTotal, 1); // Progress from 0 to 1

      // Ease-out effect for spinning
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

      const currentAngle = initialStartAngle + (finalAngle - initialStartAngle) * easedProgress;
      setStartAngle(currentAngle);
      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(runSpin);
      } else {
        setSpinning(false);
        setResult(names[winningIndex]);
      }
    };
    requestAnimationFrame(runSpin);
  };

  const handleNamesInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNamesInput(e.target.value);
  };

  const addNames = () => {
    const newNames = namesInput.split("\n").map(name => name.trim()).filter(name => name !== "");
    setNames(newNames);
    setResult(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black dark:text-white">Wheel of Names</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">Enter names, spin the wheel, and get a random result!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="names" className="text-black dark:text-white">Enter Names (one per line)</Label>
            <Textarea
              id="names"
              value={namesInput}
              onChange={handleNamesInputChange}
              placeholder="Enter names here, one per line..."
              rows={5}
              className="w-full mt-1 text-black dark:text-white bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-gray-700"
            />
          </div>
          <Button onClick={addNames} className="w-full bg-green-500 text-white hover:bg-green-600">Set Names for Wheel</Button>
          
          {names.length > 0 && (
            <div className="flex flex-col items-center space-y-4">
              <canvas ref={wheelRef} width="500" height="500" className="border border-gray-300 dark:border-gray-600 rounded-full"></canvas>
              <Button onClick={spin} disabled={spinning} className="w-full bg-blue-500 text-white hover:bg-blue-600">
                {spinning ? "Spinning..." : "Spin the Wheel"}
              </Button>
              {result && (
                <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-700 rounded-md">
                  <h3 className="text-xl font-semibold text-black dark:text-white">Result:</h3>
                  <p className="text-2xl font-bold text-black dark:text-white">{result}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}