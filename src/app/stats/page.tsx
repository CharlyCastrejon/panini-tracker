"use client";

import { useStickerStore } from "@/store/useStickerStore";
import { TOTAL_STICKERS } from "@/lib/albumData";
import { useMemo, useState, useEffect } from "react";

function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = Math.round((current / total) * 100) || 0;
  return (
    <div className="w-full bg-slate-200 rounded-full h-3 mb-1 overflow-hidden">
      <div 
        className="bg-emerald-500 h-3 rounded-full transition-all duration-500 ease-out" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default function Stats() {
  const { inventory } = useStickerStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const stats = useMemo(() => {
    let collected = 0;
    let duplicates = 0;

    Object.values(inventory).forEach(count => {
      if (count > 0) {
        collected++;
      }
      if (count > 1) {
        duplicates += (count - 1);
      }
    });

    const missing = TOTAL_STICKERS - collected;

    return { collected, missing, duplicates };
  }, [inventory]);

  if (!isClient) return null;

  const percentage = Math.round((stats.collected / TOTAL_STICKERS) * 100) || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Estadísticas</h2>
        
        <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
          <span>{stats.collected} / {TOTAL_STICKERS} estampas</span>
          <span>{percentage}%</span>
        </div>
        <ProgressBar current={stats.collected} total={TOTAL_STICKERS} />
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="block text-3xl font-bold text-slate-800">{TOTAL_STICKERS}</span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Estampas</span>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="block text-3xl font-bold text-slate-700">{stats.missing}</span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Me Faltan</span>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <span className="block text-3xl font-bold text-emerald-700">{stats.collected}</span>
            <span className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Tengo</span>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
            <span className="block text-3xl font-bold text-blue-700">{stats.duplicates}</span>
            <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">Repetidas</span>
          </div>
        </div>
      </section>
    </div>
  );
}
