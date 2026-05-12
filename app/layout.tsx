import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-fleet-control.vercel.app"),
  title: {
    default: "AI Fleet Control — AI-система управления автопарком",
    template: "%s | AI Fleet Control",
  },
  description:
    "Премиальная AI-платформа для управления автопарком: MAX-бот, AI parser, dashboard, уведомления о ТО, страховках и расходах без хаоса в таблицах.",
  keywords: [
    "AI Fleet Control",
    "управление автопарком",
    "AI для логистики",
    "контроль ТО",
    "fleet management",
    "MAX бот",
  ],
  authors: [{ name: "AI Fleet Control" }],
  creator: "AI Fleet Control",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://ai-fleet-control.vercel.app",
    siteName: "AI Fleet Control",
    title: "AI Fleet Control — интеллектуальная система управления автопарком",
    description:
      "Автоматизируйте сообщения сотрудников, ТО, страховки, расходы и статусы автомобилей в одном современном AI dashboard.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Fleet Control",
    description: "AI-система управления автопарком без хаоса, таблиц и потери контроля.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#070A12",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.variable} noise font-sans antialiased`}>{children}</body>
    </html>
  );
}
