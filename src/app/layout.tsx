import type { Metadata } from "next";
import Header from "@/components/Header";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import PriceTicker from "@/components/PriceTicker";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের দাম",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজার দর এক নজরে।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${hindSiliguri.className} h-full antialiased scroll-smooth`}>
      <body className="min-h-full bg-[#f4f6f8]">
        <Header />
        <Suspense
          fallback={<div className="h-9 animate-pulse border-b border-gray-200 bg-gray-100" />}
        >
          <PriceTicker />
        </Suspense>
        <main className="max-w-7xl mx-auto">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}