import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            href="https://x.com/AltriTaver96094"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            altri
          </Link>
          .
        </p>
        <div className="flex gap-4">
          <Link href="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline">
            Contact
          </Link>
          <Link href="/donate" className="text-sm font-medium hover:underline">
            Donate
          </Link>
          <Link href="/privacy-policy" className="text-sm font-medium hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}