import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Book, Repeat } from "lucide-react";
import Link from "next/link";

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

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <Link href="/" className="flex flex-col items-center text-emerald-700">
            <Book size={24} />
            <span className="text-xs mt-1 font-medium">Álbum</span>
          </Link>
          <Link href="/swaps" className="flex flex-col items-center text-slate-400 hover:text-emerald-700 transition-colors">
            <Repeat size={24} />
            <span className="text-xs mt-1 font-medium">Intercambio</span>
          </Link>
        </nav>
      </body>
    </html>
  );
}