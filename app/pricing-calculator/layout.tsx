import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Calculator",
  description: "Calculate suggested prices for your projects.",
};

export default function PricingCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}