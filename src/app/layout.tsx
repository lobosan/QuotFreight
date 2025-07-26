import type { Metadata } from "next";
import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";
import NextTopLoader from "nextjs-toploader";
import { Geist, Geist_Mono } from "next/font/google";
import { Box, Flex } from "@radix-ui/themes";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "next-themes";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import { DynamicBackground } from "./components/layout/dynamic-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js B2B starter kit",
  description: "Fully featured B2B app with Next.js, Radix UI, and WorkOS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DynamicBackground>
            <NextTopLoader showSpinner={false} />
            <Flex direction="column" minHeight="100vh">
              <Header />
              <Box flexGrow="1" asChild>
                <AuthKitProvider>{children}</AuthKitProvider>
              </Box>
              <Footer />
            </Flex>
          </DynamicBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
