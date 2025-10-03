import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteFooter } from "@/components/ui/footer"
import { SiteHeader } from "@/components/ui/header"
import Script from "next/script"
import AdBanner from "@/components/ui/ad-banner"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KlickKlack",
  description: "Smart Calculations, Made Easy",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <div className="flex min-h-screen"> {/* Flex container for main content and sidebars */}
            <div className="w-1/6 p-4"> {/* Left sidebar */}
              <AdBanner dataAdSlot="YOUR_LEFT_SIDEBAR_AD_SLOT_ID" className="h-[600px] w-[300px] mb-4" /> {/* Top left square */}
            </div>
            <main className="flex-1">
              {children}
            </main>
            <div className="w-1/6 p-4 flex flex-col items-end"> {/* Right sidebar */}
              <AdBanner dataAdSlot="YOUR_TOP_RIGHT_AD_SLOT_ID" className="h-[250px] w-[300px] mb-4" /> {/* Top right square */}
              <AdBanner dataAdSlot="YOUR_BOTTOM_RIGHT_AD_SLOT_ID" className="h-[250px] w-[300px]" /> {/* Bottom right square */}
            </div>
          </div>
          <SiteFooter />
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 w-full"> {/* Bottom center square */}
            <div className="w-full text-center">
              {/* Bottom center ad banner */}
              <AdBanner dataAdSlot="YOUR_AD_SLOT_ID_4" className="mx-auto h-[90px] w-[728px]" />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
