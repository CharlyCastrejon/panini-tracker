export interface AlbumTeam {
  id: string;
  name: string;
  prefix: string;
  count: number;
  customIds?: string[];
}

export interface AlbumGroup {
  id: string;
  name: string;
  teams: AlbumTeam[];
}

export const ALBUM_GROUPS: AlbumGroup[] = [
  {
    id: 'specials',
    name: 'Secciones Especiales',
    teams: [
      { id: 'fwc_especiales', name: '🏆 FWC Especiales', prefix: 'FWC', count: 5, customIds: ['FWC 00', 'FWC 1', 'FWC 2', 'FWC 3', 'FWC 4'] },
      { id: 'fwc_balon', name: '⚽ FWC Balón y Países', prefix: 'FWC', count: 4, customIds: ['FWC 5', 'FWC 6', 'FWC 7', 'FWC 8'] },
      { id: 'fwc_historia', name: '📜 FWC: Historia', prefix: 'FWC', count: 11, customIds: ['FWC 9', 'FWC 10', 'FWC 11', 'FWC 12', 'FWC 13', 'FWC 14', 'FWC 15', 'FWC 16', 'FWC 17', 'FWC 18', 'FWC 19'] },
      { id: 'coca_cola', name: '🥤 Coca Cola', prefix: 'CC', count: 14 },
    ]
  },
  {
    id: 'group_A',
    name: 'Grupo A',
    teams: [
      { id: 'mex', name: '🇲🇽 México', prefix: 'MEX', count: 20 },
      { id: 'rsa', name: '🇿🇦 Sudáfrica', prefix: 'RSA', count: 20 },
      { id: 'kor', name: '🇰🇷 Corea del Sur', prefix: 'KOR', count: 20 },
      { id: 'cze', name: '🇨🇿 República Checa', prefix: 'CZE', count: 20 },
    ]
  },
  {
    id: 'group_B',
    name: 'Grupo B',
    teams: [
      { id: 'can', name: '🇨🇦 Canadá', prefix: 'CAN', count: 20 },
      { id: 'bih', name: '🇧🇦 Bosnia y Herzegovina', prefix: 'BIH', count: 20 },
      { id: 'qat', name: '🇶🇦 Catar', prefix: 'QAT', count: 20 },
      { id: 'sui', name: '🇨🇭 Suiza', prefix: 'SUI', count: 20 },
    ]
  },
  {
    id: 'group_C',
    name: 'Grupo C',
    teams: [
      { id: 'bra', name: '🇧🇷 Brasil', prefix: 'BRA', count: 20 },
      { id: 'mar', name: '🇲🇦 Marruecos', prefix: 'MAR', count: 20 },
      { id: 'hai', name: '🇭🇹 Haití', prefix: 'HAI', count: 20 },
      { id: 'sco', name: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia', prefix: 'SCO', count: 20 },
    ]
  },
  {
    id: 'group_D',
    name: 'Grupo D',
    teams: [
      { id: 'usa', name: '🇺🇸 Estados Unidos', prefix: 'USA', count: 20 },
      { id: 'par', name: '🇵🇾 Paraguay', prefix: 'PAR', count: 20 },
      { id: 'aus', name: '🇦🇺 Australia', prefix: 'AUS', count: 20 },
      { id: 'tur', name: '🇹🇷 Turquía', prefix: 'TUR', count: 20 },
    ]
  },
  {
    id: 'group_E',
    name: 'Grupo E',
    teams: [
      { id: 'ger', name: '🇩🇪 Alemania', prefix: 'GER', count: 20 },
      { id: 'cuw', name: '🇨🇼 Curazao', prefix: 'CUW', count: 20 },
      { id: 'civ', name: '🇨🇮 Costa de Marfil', prefix: 'CIV', count: 20 },
      { id: 'ecu', name: '🇪🇨 Ecuador', prefix: 'ECU', count: 20 },
    ]
  },
  {
    id: 'group_F',
    name: 'Grupo F',
    teams: [
      { id: 'ned', name: '🇳🇱 Países Bajos', prefix: 'NED', count: 20 },
      { id: 'jpn', name: '🇯🇵 Japón', prefix: 'JPN', count: 20 },
      { id: 'swe', name: '🇸🇪 Suecia', prefix: 'SWE', count: 20 },
      { id: 'tun', name: '🇹🇳 Túnez', prefix: 'TUN', count: 20 },
    ]
  },
  {
    id: 'group_G',
    name: 'Grupo G',
    teams: [
      { id: 'bel', name: '🇧🇪 Bélgica', prefix: 'BEL', count: 20 },
      { id: 'egy', name: '🇪🇬 Egipto', prefix: 'EGY', count: 20 },
      { id: 'irn', name: '🇮🇷 Irán', prefix: 'IRN', count: 20 },
      { id: 'nzl', name: '🇳🇿 Nueva Zelanda', prefix: 'NZL', count: 20 },
    ]
  },
  {
    id: 'group_H',
    name: 'Grupo H',
    teams: [
      { id: 'esp', name: '🇪🇸 España', prefix: 'ESP', count: 20 },
      { id: 'cpv', name: '🇨🇻 Cabo Verde', prefix: 'CPV', count: 20 },
      { id: 'ksa', name: '🇸🇦 Arabia Saudita', prefix: 'KSA', count: 20 },
      { id: 'uru', name: '🇺🇾 Uruguay', prefix: 'URU', count: 20 },
    ]
  },
  {
    id: 'group_I',
    name: 'Grupo I',
    teams: [
      { id: 'fra', name: '🇫🇷 Francia', prefix: 'FRA', count: 20 },
      { id: 'sen', name: '🇸🇳 Senegal', prefix: 'SEN', count: 20 },
      { id: 'irq', name: '🇮🇶 Irak', prefix: 'IRQ', count: 20 },
      { id: 'nor', name: '🇳🇴 Noruega', prefix: 'NOR', count: 20 },
    ]
  },
  {
    id: 'group_J',
    name: 'Grupo J',
    teams: [
      { id: 'arg', name: '🇦🇷 Argentina', prefix: 'ARG', count: 20 },
      { id: 'alg', name: '🇩🇿 Argelia', prefix: 'ALG', count: 20 },
      { id: 'aut', name: '🇦🇹 Austria', prefix: 'AUT', count: 20 },
      { id: 'jor', name: '🇯🇴 Jordania', prefix: 'JOR', count: 20 },
    ]
  },
  {
    id: 'group_K',
    name: 'Grupo K',
    teams: [
      { id: 'por', name: '🇵🇹 Portugal', prefix: 'POR', count: 20 },
      { id: 'cod', name: '🇨🇩 RD Congo', prefix: 'COD', count: 20 },
      { id: 'uzb', name: '🇺🇿 Uzbekistán', prefix: 'UZB', count: 20 },
      { id: 'col', name: '🇨🇴 Colombia', prefix: 'COL', count: 20 },
    ]
  },
  {
    id: 'group_L',
    name: 'Grupo L',
    teams: [
      { id: 'eng', name: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', prefix: 'ENG', count: 20 },
      { id: 'cro', name: '🇭🇷 Croacia', prefix: 'CRO', count: 20 },
      { id: 'gha', name: '🇬🇭 Ghana', prefix: 'GHA', count: 20 },
      { id: 'pan', name: '🇵🇦 Panamá', prefix: 'PAN', count: 20 },
    ]
  }
];

export const getAllStickerIds = (): string[] => {
  const ids: string[] = [];
  ALBUM_GROUPS.forEach(group => {
    group.teams.forEach(team => {
      if (team.customIds) {
        ids.push(...team.customIds);
      } else {
        for (let i = 1; i <= team.count; i++) {
          ids.push(`${team.prefix} ${i}`);
        }
      }
    });
  });
  return ids;
};

export const getTeamForSticker = (id: string): AlbumTeam | undefined => {
  for (const group of ALBUM_GROUPS) {
    for (const team of group.teams) {
      if (team.customIds && team.customIds.includes(id)) {
        return team;
      }
      if (!team.customIds && id.startsWith(team.prefix + ' ')) {
        const numStr = id.split(' ')[1];
        if (!isNaN(Number(numStr))) {
          return team;
        }
      }
    }
  }
  return undefined;
};

export const formatStickers = (stickerIds: string[]): string => {
  const grouped: Record<string, { emoji: string, prefix: string, numbers: string[] }> = {};
  
  stickerIds.forEach(id => {
    const team = getTeamForSticker(id);
    const prefix = team ? team.prefix : id.split(' ')[0] || '❓';
    let emoji = team ? team.name.split(' ')[0] : '❓';
    
    // Group all FWC sections under a single emoji
    if (prefix === 'FWC') {
      emoji = '🏆';
    }

    const number = id.includes(' ') ? id.substring(id.indexOf(' ') + 1) : id;
    
    if (!grouped[prefix]) {
      grouped[prefix] = { emoji, prefix, numbers: [] };
    }
    grouped[prefix].numbers.push(number);
  });

  return Object.values(grouped)
    .map(g => {
      // Sort numbers numerically (handling '00' as 0)
      const sortedNumbers = g.numbers.sort((a, b) => {
        const numA = a === '00' ? 0 : Number(a);
        const numB = b === '00' ? 0 : Number(b);
        if (isNaN(numA) || isNaN(numB)) return a.localeCompare(b);
        return numA - numB;
      });
      return `${g.emoji} ${g.prefix}: ${sortedNumbers.join(', ')}`;
    })
    .join('\n');
};

export const TOTAL_STICKERS = getAllStickerIds().length;
