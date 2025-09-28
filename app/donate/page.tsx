import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DonatePage() {
  return (
    <div className="container flex flex-col items-center justify-between gap-4 py-8 md:py-12 bg-background min-h-[calc(100vh-theme(spacing.16))] ">
      <Card className="w-full max-w-2xl border-none shadow-none p-8">
        <CardHeader>
          <CardTitle>Donate</CardTitle>
          <CardDescription>Support our work.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            KlickKlack is free to use, but keeping it online takes time and resources. If you find the calculators helpful, consider donating to help us improve and add more features.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}