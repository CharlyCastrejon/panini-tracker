"use client";

import { useStickerStore } from "@/store/useStickerStore";
import { ALBUM_GROUPS, TOTAL_STICKERS } from "@/lib/albumData";
import { useState, useMemo, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

export default function Home() {
  const { inventory, toggleSticker } = useStickerStore();
  const [isClient, setIsClient] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    [ALBUM_GROUPS[0].id]: true
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Dashboard */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h2 className="text-lg font-bold mb-4">Progreso General</h2>
        
        <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
          <span>{stats.collected} estampas</span>
          <span>{Math.round((stats.collected / TOTAL_STICKERS) * 100)}%</span>
        </div>
        <ProgressBar current={stats.collected} total={TOTAL_STICKERS} />
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-emerald-50 rounded-xl">
            <span className="block text-2xl font-bold text-emerald-700">{stats.collected}</span>
            <span className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Tengo</span>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <span className="block text-2xl font-bold text-slate-700">{stats.missing}</span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Faltan</span>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-xl">
            <span className="block text-2xl font-bold text-blue-700">{stats.duplicates}</span>
            <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">Repes</span>
          </div>
        </div>
      </section>

      {/* Album Groups */}
      <section className="space-y-4 pb-8">
        {ALBUM_GROUPS.map((group) => {
          const isGroupOpen = openGroups[group.id];
          
          let groupCollected = 0;
          let groupTotal = 0;
          
          group.teams.forEach(team => {
            if (team.customIds) {
              team.customIds.forEach(id => {
                groupTotal++;
                if (inventory[id] > 0) groupCollected++;
              });
            } else {
              for (let i = 1; i <= team.count; i++) {
                groupTotal++;
                if (inventory[`${team.prefix} ${i}`] > 0) groupCollected++;
              }
            }
          });
          
          return (
            <div key={group.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <button 
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-200"
              >
                <div className="flex flex-col items-start">
                  <h3 className="font-bold text-slate-800 text-lg">{group.name}</h3>
                  <span className="text-xs text-slate-500 mt-1 font-medium">
                    {groupCollected} / {groupTotal} completado
                  </span>
                </div>
                {isGroupOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
              </button>
              
              {isGroupOpen && (
                <div className="p-4 space-y-6 bg-white">
                  {group.teams.map(team => {
                    const ids: string[] = team.customIds ? [...team.customIds] : [];
                    if (!team.customIds) {
                      for (let i = 1; i <= team.count; i++) {
                        ids.push(`${team.prefix} ${i}`);
                      }
                    }

                    let teamCollected = 0;
                    ids.forEach(id => {
                      if (inventory[id] > 0) teamCollected++;
                    });

                    return (
                      <div key={team.id} className="space-y-3">
                        <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                          <h4 className="font-bold text-slate-700">{team.name}</h4>
                          <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-md">
                            {teamCollected} / {ids.length}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                          {ids.map(id => {
                            const count = inventory[id] || 0;
                            let btnClass = "border-slate-200 bg-white text-slate-500 hover:border-slate-300";
                            if (count === 1) {
                              btnClass = "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm";
                            } else if (count > 1) {
                              btnClass = "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-sm relative";
                            }

                            const parts = id.split(' ');
                            
                            return (
                              <button
                                key={id}
                                onClick={() => toggleSticker(id)}
                                className={`
                                  aspect-[4/3] rounded-lg border-2 flex flex-col items-center justify-center transition-all active:scale-95
                                  ${btnClass}
                                `}
                              >
                                <span className="text-[10px] sm:text-xs font-semibold opacity-70 leading-none">{parts[0]}</span>
                                <span className="text-sm sm:text-base font-bold leading-tight">{parts[1]}</span>
                                {count > 1 && (
                                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                                    +{count - 1}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
