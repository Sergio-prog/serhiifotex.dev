import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";
import { Analytics } from "@vercel/analytics/next";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic", "latin-ext", "cyrillic-ext"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portolio website",
  description: "",
  authors: [{ name: "Serhii Nesterov" }],
  category: "Personal website",
  creator: "Serhii Nestserov",
  twitter: {
    creator: "@0xFotex",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="antialiased">
        {children}
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  );
}
