import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Panini 2026 Tracker",
  description: "Registro de estampas para el Mundial 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen pb-20`}>
        <header className="bg-emerald-700 text-white shadow-md sticky top-0 z-20">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              🏆 Panini 2026 Tracker
            </h1>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto p-4">
          {children}
        </main>

        <Navigation />
      </body>
    </html>
  );
}