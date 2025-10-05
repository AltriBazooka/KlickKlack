"use client"
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
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
                <Button variant="default" className="text-xl font-bold text-black mb-2">Choose a Calculator</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/calculators/currency-converter" passHref><DropdownMenuItem asChild><p>Currency Converter</p></DropdownMenuItem></Link>
                <Link href="/calculators/standard-calculator" passHref><DropdownMenuItem asChild><p>Standard Calculator</p></DropdownMenuItem></Link>
                <Link href="/calculators/gpa-calculator" passHref><DropdownMenuItem asChild><p>GPA Calculator</p></DropdownMenuItem></Link>
                <Link href="/calculators/time-zone-converter" passHref><DropdownMenuItem asChild><p>Time Zone Converter</p></DropdownMenuItem></Link>
                <Link href="/calculators/unit-converter" passHref><DropdownMenuItem asChild><p>Unit Converter</p></DropdownMenuItem></Link>
                <Link href="/calculators/bill-split-calculator" passHref><DropdownMenuItem asChild><p>Bill Split Calculator</p></DropdownMenuItem></Link>
                <Link href="/calculators/age-calculator" passHref><DropdownMenuItem asChild><p>Age Calculator</p></DropdownMenuItem></Link>
                <Link href="/calculators/health-calculator" passHref><DropdownMenuItem asChild><p>Health Calculator</p></DropdownMenuItem></Link>
                <Link href="/calculators/sleep-calculator" passHref><DropdownMenuItem asChild><p>Sleep Calculator</p></DropdownMenuItem></Link>
                <Link href="/calculators/student-loan-calculator" passHref><DropdownMenuItem asChild><p>Student Loan Calculator</p></DropdownMenuItem></Link>
                <Link href="/calculators/geometry-calculator" passHref><DropdownMenuItem asChild><p>Geometry Calculator</p></DropdownMenuItem></Link>
                <Link href="/calculators/rent-calculator" passHref><DropdownMenuItem asChild><p>Rent Calculator</p></DropdownMenuItem></Link>

              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        {/* Input Form */}









      </main>
    </div>
  );
}