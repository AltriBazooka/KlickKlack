"use client"
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Calculator, TrendingUp, Shield, Target, Sun, Share2, Download, Moon } from "lucide-react"

import { useTheme } from "next-themes"

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"


export default function Home() {














  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">


      <main className="w-full max-w-2xl">
        <Card className="bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm mb-4 p-8">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-2">KlickKlack</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">Smart Calculations, Made Easy.</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="text-xl font-bold text-black mb-2">Explore Tools</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Math & Academic</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem asChild>
                      <Link href="/calculators/standard-calculator">Standard Calculator</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/calculators/gpa-calculator">GPA Calculator</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/calculators/geometry-calculator">Geometry Calculator</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/calculators/percentage-calculator">Percentage Calculator</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/calculators/scientific-calculator">Scientific Calculator</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/graphing-calculator">Graphing Calculator</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/calculators/statistics-calculator">Statistics Calculator</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Productivity & Skills</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem asChild>
                      <Link href="/calculators/typing-speed-calculator">Typing Speed Calculator</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/calculators/pomodoro-calculator">Pomodoro Calculator</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Finance & Money</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem asChild>
                    <Link href="/calculators/student-loan-calculator">
                      Student Loan Calculator
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/calculators/rent-calculator">Rent Calculator</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/calculators/bill-split-calculator">
                      Bill Split Calculator
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/calculators/currency-converter">Currency Converter</Link>
                  </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Health & Lifestyle</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem asChild>
                    <Link href="/calculators/health-calculator">Health Calculator</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/calculators/sleep-calculator">Sleep Calculator</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/calculators/age-calculator">Age Calculator</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/calculators/time-zone-converter">Time Zone Converter</Link>
                  </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Conversions</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem asChild>
                    <Link href="/calculators/unit-converter">Unit Converter</Link>
                  </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        {/* Input Form */}









      </main>
    </div>
  );
}