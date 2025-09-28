import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="container flex flex-col items-center justify-between gap-4 py-8 md:py-12 bg-background min-h-[calc(100vh-theme(spacing.16))] ">
      <Card className="w-full max-w-2xl border-none shadow-none p-8">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Get in touch with us.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Got feedback, ideas, or spotted a bug? We’d love to hear from you!
          </p>
          <p className="text-muted-foreground mt-4">
            Email: altritaveras@gmail.com
          </p>
          <p className="text-muted-foreground mt-4">
            Twitter: @AltriTaver96094
          </p>
          <p className="text-muted-foreground mt-4">
            Discord: altri_bazooka
          </p>
        </CardContent>
      </Card>
    </div>
  )
}