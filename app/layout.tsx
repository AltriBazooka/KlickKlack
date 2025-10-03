import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteFooter } from "@/components/ui/footer"
import { SiteHeader } from "@/components/ui/header"


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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <div className="flex min-h-screen"> {/* Flex container for main content and sidebars */}
            <div className="w-1/6 p-4"> {/* Left sidebar */}
              {/* <AdSquares className="h-[600px] w-[300px] mb-4" /> */} {/* Top left square */}
            </div>
            <main className="flex-1">
              {children}
            </main>
            <div className="w-1/6 p-4 flex flex-col items-end"> {/* Right sidebar */}
              {/* <AdSquares className="h-[250px] w-[300px] mb-4" /> */} {/* Top right square */}
              {/* <AdSquares className="h-[250px] w-[300px]" /> */} {/* Bottom right square */}
            </div>
          </div>
          <SiteFooter />
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4"> {/* Bottom center square */}
            {/* <AdSquares className="h-[90px] w-[728px]" /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
