import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container flex flex-col items-center justify-between gap-4 py-8 md:py-12 bg-background min-h-[calc(100vh-theme(spacing.16))] ">
      <Card className="w-full max-w-2xl border-none shadow-none p-8">
        <CardHeader>
          <CardTitle>About Us</CardTitle>
          <CardDescription>Learn more about our mission.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            KlickKlack is the free, all-in-one toolkit for everyday calculations, conversions, and problem-solving. Fast, simple, and smart—everything you need to get answers, all in one place.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}