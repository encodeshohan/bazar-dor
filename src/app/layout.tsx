import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import PriceTicker from "@/components/layout/PriceTicker";
import "./globals.css";
import Footer from "@/components/layout/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের দাম",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজার দর এক নজরে।",
  icons: {
    icon: "/assets/logo-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${hindSiliguri.className} h-full antialiased scroll-smooth`}>
      <body className="flex min-h-full flex-col bg-[#f4f6f8]">
        <Header />
        <Suspense
          fallback={<div className="h-9 animate-pulse border-b border-gray-200 bg-gray-100" />}
        >
          <PriceTicker />
        </Suspense>
        <main className="mx-auto w-full max-w-7xl flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}