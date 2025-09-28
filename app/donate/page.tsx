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
            This is the donate page. You can add information about how to donate here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}