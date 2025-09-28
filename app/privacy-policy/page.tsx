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
            KlickKlack doesn’t collect personal data for calculators to work. If we use cookies, it’s only to improve your browsing experience (like saving settings or themes).
          </p>
          <p className="text-muted-foreground mt-4">
            We will never sell or share your personal information with third parties.
          </p>
          <p className="text-muted-foreground mt-4">
            If you have questions about privacy, reach out via our Contact page.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}