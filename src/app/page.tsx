"use client";

import { useStickerStore } from "@/store/useStickerStore";
import { ALBUM_GROUPS, TOTAL_STICKERS, AlbumGroup, AlbumTeam } from "@/lib/albumData";
import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export default function Home() {
  const { inventory, toggleSticker } = useStickerStore();
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    [ALBUM_GROUPS[0].id]: true
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter groups and teams based on search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) {
      return ALBUM_GROUPS;
    }

    const lowerQuery = searchQuery.toLowerCase();

    return ALBUM_GROUPS.map(group => {
      const groupNameMatch = group.name.toLowerCase().includes(lowerQuery);
      
      const matchingTeams = group.teams.filter(team => 
        team.name.toLowerCase().includes(lowerQuery) || 
        team.prefix.toLowerCase().includes(lowerQuery)
      );

      if (groupNameMatch || matchingTeams.length > 0) {
        return {
          ...group,
          teams: groupNameMatch ? group.teams : matchingTeams
        };
      }
      return null;
    }).filter(Boolean) as AlbumGroup[];
  }, [searchQuery]);

  // Automatically open groups that are part of the search results
  useEffect(() => {
    if (searchQuery.trim() && filteredGroups.length > 0) {
      const newOpenState: Record<string, boolean> = {};
      filteredGroups.forEach(g => {
        newOpenState[g.id] = true;
      });
      setOpenGroups(newOpenState);
    }
  }, [searchQuery, filteredGroups]);


  if (!isClient) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Search Bar */}
      <div className="relative bg-white rounded-xl shadow-sm border border-slate-200 p-2">
        <div className="flex items-center gap-2 px-2 text-slate-400">
          <Search size={20} />
          <input 
            type="text"
            placeholder="Buscar por equipo, nombre o clave (Ej. FWC, México)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none py-2 text-slate-700 placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      {/* Album Groups */}
      <section className="space-y-4 pb-8">
        {filteredGroups.length === 0 ? (
          <div className="text-center py-10 text-slate-500 bg-white rounded-xl shadow-sm border border-slate-200">
            No se encontraron resultados para "{searchQuery}"
          </div>
        ) : (
          filteredGroups.map((group) => {
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
          })
        )}
      </section>
    </div>
  );
}
