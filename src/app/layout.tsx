import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adsidol.com"),
  title: "AdsIdol Intelligence — Enterprise DMP Platform",
  description: "Enterprise Data Management Platform & Programmatic Media Buying Engine powered by AI cohort models.",
  openGraph: {
    title: "AdsIdol Intelligence — Enterprise DMP Platform",
    description: "Enterprise Data Management Platform & Programmatic Media Buying Engine powered by AI cohort models.",
    type: "website",
    url: "https://adsidol.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdsIdol Intelligence — Enterprise DMP Platform",
    description: "Enterprise Data Management Platform & Programmatic Media Buying Engine powered by AI cohort models.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${jetbrainsMono.variable} h-full antialiased font-sans`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
