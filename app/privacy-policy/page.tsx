import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container flex flex-col items-center justify-between gap-4 py-8 md:py-12 bg-background min-h-[calc(100vh-theme(spacing.16))] ">
      <Card className="w-full max-w-2xl border-none shadow-none p-8">
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>Our commitment to your privacy.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is the privacy policy page. You can add your privacy policy content here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}