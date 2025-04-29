import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Zap } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSS to Tailwind Converter",
  description: "A tool for converting CSS to Tailwind CSS classes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relatative container mx-auto">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-x-2">
                <Zap className="w-6 h-6 text-emerald-500" />
                <h1 className="text-2xl font-bold">CSS2Tail</h1>
              </div>
              <ThemeToggle />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
