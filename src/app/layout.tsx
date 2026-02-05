import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";
import Header from "@/components/Header";
import ScrollReset from "@/components/ScrollReset";
import { APP_NAME } from "@/constants";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_NAME,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <ReactLenis root>
        <body>
          <ScrollReset />
          <Header />
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </ReactLenis>
    </html>
  );
}

