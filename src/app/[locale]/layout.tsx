import type { Metadata } from "next";


import { ReactNode } from 'react';

import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';



import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from '@/context/ThemeContext';
import Sidebar from "@/components/sidebar/Sidebar";
import ThemeToggle from '@/components/theme/ThemeToggle';

import {routing} from '@/i18n/routing';


import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduStream",
  description: "EduStream - Your Learning Companion",
};


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <html lang={locale} className="light">
      <body>
        <NextIntlClientProvider>
          <ThemeProvider>
            <div className="flex h-screen">
              <Sidebar />
              <main className="flex-1 overflow-auto p-8 pt-0 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ">
                {children}
              </main>
              <div className="fixed bottom-8 right-8">
                <ThemeToggle />
              </div>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}