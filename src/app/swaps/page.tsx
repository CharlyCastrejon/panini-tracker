"use client";

import { useStickerStore } from "@/store/useStickerStore";
import { getAllStickerIds, formatStickers } from "@/lib/albumData";
import { useMemo, useState, useEffect } from "react";
import { Copy, Check, Share2 } from "lucide-react";

export default function Swaps() {
  const { inventory } = useStickerStore();
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lists = useMemo(() => {
    const missing: string[] = [];
    const duplicates: { id: string, count: number }[] = [];
    const duplicateIdsForFormat: string[] = [];

    const allIds = getAllStickerIds();

    allIds.forEach(id => {
      const count = inventory[id] || 0;
      if (count === 0) {
        missing.push(id);
      } else if (count > 1) {
        duplicates.push({ id, count: count - 1 });
        // Add the duplicate ID as many times as it is duplicated? 
        // Typically people just want to know WHICH ones are duplicated to trade.
        // We'll just list the unique IDs that we have duplicates of for the format string.
        duplicateIdsForFormat.push(id);
      }
    });

    return { missing, duplicates, duplicateIdsForFormat };
  }, [inventory]);

  const generateShareText = () => {
    let text = "🏆 Mis Estampas Panini 2026 🏆\n\n";
    
    if (lists.duplicateIdsForFormat.length > 0) {
      text += "✅ TENGO REPETIDAS:\n";
      text += formatStickers(lists.duplicateIdsForFormat) + "\n\n";
    }

    if (lists.missing.length > 0) {
      text += "❌ ME FALTAN:\n";
      text += formatStickers(lists.missing) + "\n";
    }

    return text;
  };

  const copyToClipboard = async () => {
    const text = generateShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const shareNative = async () => {
    const text = generateShareText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mis estampas",
          text: text,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      copyToClipboard();
    }
  };

  if (!isClient) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800">Intercambio</h2>
          <div className="flex gap-2">
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              {copied ? "¡Copiado!" : "Copiar"}
            </button>
            <button 
              onClick={shareNative}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg text-sm font-medium transition-colors sm:hidden"
            >
              <Share2 size={16} />
              Compartir
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-6">
          Genera tu lista para compartirla por WhatsApp o redes sociales con tus amigos.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 font-bold text-blue-700 mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Mis Repetidas ({lists.duplicates.reduce((acc, curr) => acc + curr.count, 0)})
            </h3>
            {lists.duplicateIdsForFormat.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No tienes repetidas aún.</p>
            ) : (
              <div className="bg-blue-50 p-4 rounded-xl text-blue-900 font-medium leading-relaxed whitespace-pre-wrap">
                {formatStickers(lists.duplicateIdsForFormat)}
              </div>
            )}
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-bold text-slate-700 mb-3">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Me Faltan ({lists.missing.length})
            </h3>
            {lists.missing.length === 0 ? (
              <p className="text-sm text-emerald-600 font-medium italic">¡Felicidades! Has completado el álbum.</p>
            ) : (
              <div className="bg-slate-50 p-4 rounded-xl text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                {formatStickers(lists.missing)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
