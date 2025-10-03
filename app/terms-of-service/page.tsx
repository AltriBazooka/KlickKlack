import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const TermsOfServicePage = () => {
  return (
    <div className="container flex flex-col items-center justify-between gap-4 py-8 md:py-12 bg-background min-h-[calc(100vh-theme(spacing.16))] ">
      <Card className="w-full max-w-2xl border-none shadow-none p-8">
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
          <CardDescription>Our terms and conditions for using our service.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Effective Date: September 28, 2025
            <br /><br />
            Welcome to KlickKlack! By using this website, you agree to the following terms:
            <br /><br />
            1. Use of the Site
            <br /><br />
            This website is provided free of charge for personal, non-commercial use.
            <br /><br />
            You agree not to misuse or interfere with the site (e.g., hacking, scraping, automated abuse).
            <br /><br />
            2. Accuracy of Information
            <br /><br />
            The calculators and tools are provided “as is” for informational purposes only.
            <br /><br />
            We make no guarantees about accuracy, completeness, or suitability for financial, legal, or professional decisions. Use at your own risk.
            <br /><br />
            3. Donations
            <br /><br />
            Donations are completely voluntary and non-refundable.
            <br /><br />
            Donating does not create any contract, partnership, or entitlement to special services.
            <br /><br />
            4. Limitation of Liability
            <br /><br />
            We are not liable for any direct, indirect, or incidental damages resulting from use of the site.
            <br /><br />
            By using the site, you accept full responsibility for how you use the information provided.
            <br /><br />
            5. Changes to the Terms
            <br /><br />
            We may update these Terms at any time.
            <br /><br />
            Continued use of the site after changes means you accept the updated Terms.
            <br /><br />
            6. Contact
            <br /><br />
            If you have questions, reach me at: altritaveras@gmail.com
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;