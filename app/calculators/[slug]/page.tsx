"use client";

import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const calculators: Record<string, React.ComponentType<any>> = {
  "age-calculator": dynamic(() => import("@/components/calculators/AgeCalculator"), { ssr: false }),
  "bill-split-calculator": dynamic(() => import("@/components/calculators/BillSplitCalculator"), { ssr: false }),
  "currency-converter": dynamic(() => import("@/components/calculators/CurrencyConverter"), { ssr: false }),
  "gpa-calculator": dynamic(() => import("@/components/calculators/GPACalculator"), { ssr: false }),
  "geometry-calculator": dynamic(() => import("@/components/calculators/GeometryCalculator").then(mod => mod.GeometryCalculator), { ssr: false }),
  "health-calculator": dynamic(() => import("@/components/calculators/HealthCalculator"), { ssr: false }),
  "rent-calculator": dynamic(() => import("@/components/calculators/RentCalculator").then(mod => mod.RentCalculator), { ssr: false }),
  "sleep-calculator": dynamic(() => import("@/components/calculators/SleepCalculator"), { ssr: false }),
  "standard-calculator": dynamic(() => import("@/components/calculators/StandardCalculator"), { ssr: false }),
  "student-loan-calculator": dynamic(() => import("@/components/calculators/StudentLoanCalculator"), { ssr: false }),
  "time-zone-converter": dynamic(() => import("@/components/calculators/TimeZoneConverter"), { ssr: false }),
  "unit-converter": dynamic(() => import("@/components/calculators/UnitConverter"), { ssr: false }),
  "typing-speed-calculator": dynamic(() => import("@/components/calculators/TypingSpeedCalculator"), { ssr: false }),
  "percentage-calculator": dynamic(() => import("@/components/calculators/PercentageCalculator"), { ssr: false }),
  "scientific-calculator": dynamic(() => import("@/components/calculators/ScientificCalculator"), { ssr: false }),
  "statistics-calculator": dynamic(() => import("@/components/calculators/StatisticsCalculator"), { ssr: false }),
  "pomodoro-calculator": dynamic(() => import("@/components/calculators/PomodoroCalculator"), { ssr: false }),
  "dice-roller": dynamic(() => import("@/components/calculators/DiceRoller"), { ssr: false }),
  "savings-goal-calculator": dynamic(() => import("@/components/calculators/SavingsGoalCalculator"), { ssr: false }),

};

export default function CalculatorPage() {
  const params = useParams();
  const slug = params.slug as string;

  const CalculatorComponent = calculators[slug];


  if (!CalculatorComponent) {
    notFound();
  }

  return (
    <div className="container flex flex-col items-center justify-between gap-4 py-8 md:py-12 bg-background min-h-[calc(10vh-theme(spacing.16))] ">
      <CalculatorComponent />
    </div>
  );
}