"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Repeat, BarChart2 } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `flex flex-col items-center transition-colors ${
      isActive ? "text-emerald-700" : "text-slate-400 hover:text-emerald-700"
    }`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <Link href="/" className={getLinkClasses("/")}>
        <Book size={24} />
        <span className="text-xs mt-1 font-medium">Álbum</span>
      </Link>
      <Link href="/stats" className={getLinkClasses("/stats")}>
        <BarChart2 size={24} />
        <span className="text-xs mt-1 font-medium">Estadísticas</span>
      </Link>
      <Link href="/swaps" className={getLinkClasses("/swaps")}>
        <Repeat size={24} />
        <span className="text-xs mt-1 font-medium">Intercambio</span>
      </Link>
    </nav>
  );
}
