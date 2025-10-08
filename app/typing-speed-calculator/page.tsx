import TypingSpeedCalculator from "@/components/calculators/TypingSpeedCalculator";

export default function TypingSpeedCalculatorPage() {
  return (
    <div className="container flex flex-col items-center justify-between gap-4 py-8 md:py-12 bg-background min-h-[calc(10vh-theme(spacing.16))] ">
      <TypingSpeedCalculator />
    </div>
  );
}