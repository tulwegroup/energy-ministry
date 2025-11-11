import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NECID - National Energy Command & Insights Dashboard",
  description: "Advanced energy sector intelligence and management system for the Republic of Ghana Ministry of Energy",
  keywords: ["Energy Dashboard", "Ghana Energy", "Ministry of Energy", "Energy Management", "AI Analytics", "Real-time Monitoring"],
  authors: [{ name: "Ministry of Energy, Ghana" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "NECID - National Energy Command & Insights Dashboard",
    description: "Advanced energy sector intelligence and management system",
    url: "https://energy.gov.gh",
    siteName: "NECID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NECID - National Energy Command & Insights Dashboard",
    description: "Advanced energy sector intelligence and management system for Ghana",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
