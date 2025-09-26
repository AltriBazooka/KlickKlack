"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Calculator, TrendingUp, Shield, Target, Sun, Share2, Download, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import jsPDF from "jspdf"

export default function CryptoPositionCalculator() {
  const [capital, setCapital] = useState<string>("")
  const [riskPercentage, setRiskPercentage] = useState<string>("")
  const [entryPrice, setEntryPrice] = useState<string>("")
  const [stopLoss, setStopLoss] = useState<string>("")
  const [takeProfit, setTakeProfit] = useState<string>("")

  const [results, setResults] = useState({
    riskAmount: 0,
    positionSize: 0,
    potentialProfit: 0,
    riskRewardRatio: 0,
  })

  const { theme, setTheme } = useTheme()

  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Header
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("Crypto Position Size Calculator", pageWidth / 2, 20, { align: "center" })

    // Input Parameters
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Trading Parameters:", 20, 40)

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Capital: $${capital || "0"} USDT/USDC`, 20, 55)
    doc.text(`Risk Percentage: ${riskPercentage || "0"}%`, 20, 65)
    doc.text(`Entry Price: $${entryPrice || "0"} USDT/USDC`, 20, 75)
    doc.text(`Stop Loss: $${stopLoss || "0"} USDT/USDC`, 20, 85)
    if (takeProfit) {
      doc.text(`Take Profit: $${takeProfit} USDT/USDC`, 20, 95)
    }

    // Results
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Calculation Results:", 20, 115)

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Risk Amount: $${results.riskAmount.toFixed(2)}`, 20, 130)
    doc.text(`Position Size: ${results.positionSize.toFixed(4)}`, 20, 140)

    if (results.potentialProfit > 0) {
      doc.text(`Potential Profit: $${results.potentialProfit.toFixed(2)}`, 20, 150)
      doc.text(`Risk/Reward Ratio: 1:${results.riskRewardRatio.toFixed(2)}`, 20, 160)
    }

    // Formula
    if (results.positionSize > 0) {
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Formula Used:", 20, 180)

      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")
      doc.text("POSITION SIZE = RISK ÷ (ENTRY - STOP LOSS)", 20, 195)
      doc.text(
        `${results.positionSize.toFixed(4)} = ${results.riskAmount.toFixed(2)} ÷ (${entryPrice} - ${stopLoss})`,
        20,
        205,
      )
    }

    // Warning
    doc.setFontSize(10)
    doc.setFont("helvetica", "italic")
    doc.text(`Risk Management: This will never let you lose more than ${riskPercentage}% of your capital`, 20, 230)
    doc.text("Always trade responsibly and never risk more than you can afford to lose", 20, 240)

    // Footer
    doc.setFontSize(8)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 280)

    // Save the PDF
    doc.save("crypto-position-calculation.pdf")
  }

  useEffect(() => {
    const capitalNum = Number.parseFloat(capital) || 0
    const riskPercNum = Number.parseFloat(riskPercentage) || 0
    const entryNum = Number.parseFloat(entryPrice) || 0
    const stopLossNum = Number.parseFloat(stopLoss) || 0
    const takeProfitNum = Number.parseFloat(takeProfit) || 0

    if (capitalNum > 0 && riskPercNum > 0 && entryNum > 0 && stopLossNum > 0) {
      const riskAmount = (capitalNum * riskPercNum) / 100
      const priceDifference = Math.abs(entryNum - stopLossNum)
      const positionSize = priceDifference > 0 ? riskAmount / priceDifference : 0

      let potentialProfit = 0
      let riskRewardRatio = 0

      if (takeProfitNum > 0 && positionSize > 0) {
        potentialProfit = Math.abs(takeProfitNum - entryNum) * positionSize
        riskRewardRatio = potentialProfit / riskAmount
      }

      setResults({
        riskAmount,
        positionSize,
        potentialProfit,
        riskRewardRatio,
      })
    } else {
      setResults({ riskAmount: 0, positionSize: 0, potentialProfit: 0, riskRewardRatio: 0 })
    }
  }, [capital, riskPercentage, entryPrice, stopLoss, takeProfit])

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pt-8 mb-6">
          <div className="flex-1">
            <div className="flex items-center justify-center gap-2">
              <Calculator className="w-8 h-8 text-yellow-400" />
              <h1 className="text-2xl font-bold text-black dark:text-white">KlickKlack</h1>
            </div>
            <p className="text-gray-600 dark:text-slate-400 text-sm text-center mt-2">
              Smart Calculations, Made Easy.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-4"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Art of Position Sizing Banner */}
        <Card className="bg-gradient-to-r from-yellow-400 to-yellow-500 border-0 dark:from-yellow-500 dark:to-yellow-600">
          <CardContent className="p-4 text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="text-xl font-bold text-black mb-2">Choose a Calculator</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Category 1</DropdownMenuItem>
                <DropdownMenuItem>Category 2</DropdownMenuItem>
                <DropdownMenuItem>Category 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        {/* Input Form */}
        <Card className="bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-black dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Trading Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="capital" className="text-gray-700 dark:text-slate-300">
                Overall Capital (USDT/USDC)
              </Label>
              <Input
                id="capital"
                type="number"
                placeholder="e.g., 1000"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk" className="text-gray-700 dark:text-slate-300">
                Risk Percentage (%)
              </Label>
              <Input
                id="risk"
                type="number"
                placeholder="e.g., 2"
                value={riskPercentage}
                onChange={(e) => setRiskPercentage(e.target.value)}
                className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entry" className="text-gray-700 dark:text-slate-300">
                Entry Price (USDT/USDC)
              </Label>
              <Input
                id="entry"
                type="number"
                placeholder="e.g., 100"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stopLoss" className="text-gray-700 dark:text-slate-300">
                Stop Loss (USDT/USDC)
              </Label>
              <Input
                id="stopLoss"
                type="number"
                placeholder="e.g., 97"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="takeProfit" className="text-gray-700 dark:text-slate-300">
                Take Profit (USDT/USDC) - Optional
              </Label>
              <Input
                id="takeProfit"
                type="number"
                placeholder="e.g., 105"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-black dark:text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-400" />
                Calculation Results
              </CardTitle>
              {results.positionSize > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generatePDF}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Share2 className="w-4 h-4" />
                  <Download className="w-4 h-4" />
                  PDF
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-gray-600 dark:text-slate-400 text-sm">Risk Amount</p>
                <p className="text-green-400 font-bold text-lg">${results.riskAmount.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 dark:text-slate-400 text-sm">Position Size</p>
                <p className="text-yellow-400 font-bold text-lg">{results.positionSize.toFixed(4)}</p>
              </div>
            </div>

            {results.potentialProfit > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-gray-600 dark:text-slate-400 text-sm">Potential Profit</p>
                  <p className="text-green-400 font-bold">${results.potentialProfit.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600 dark:text-slate-400 text-sm">Risk/Reward</p>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    1:{results.riskRewardRatio.toFixed(2)}
                  </Badge>
                </div>
              </div>
            )}

            {/* Formula Display */}
            {results.positionSize > 0 && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-slate-700/50 rounded-lg">
                <h3 className="text-black dark:text-white font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  Formula Used
                </h3>
                <div className="text-center space-y-2">
                  <p className="text-green-600 dark:text-green-400 font-mono text-sm">
                    POSITION SIZE = RISK ÷ (ENTRY - STOP LOSS)
                  </p>
                  <p className="text-gray-600 dark:text-slate-300 font-mono text-sm">
                    {results.positionSize.toFixed(4)} = {results.riskAmount.toFixed(2)} ÷ ({entryPrice} - {stopLoss})
                  </p>
                </div>
              </div>
            )}

            {/* Warning Message */}
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium">
                <Target className="w-4 h-4 inline mr-1" />
                This will NEVER let you lose more than {riskPercentage}% of your capital
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-500 dark:text-slate-500 text-xs pb-8">
          Always trade responsibly and never risk more than you can afford to lose
        </div>
      </div>
    </div>
  )
}