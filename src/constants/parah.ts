// Parah (Juz) data structure
export interface Parah {
  number: number;
  name: string;
  englishName: string;
  startSurah: number;
  endSurah: number;
  startAyah: number;
  endAyah: number;
  totalAyahs: number;
  description: string;
}

// All 30 Parahs (Juz) of the Quran
export const PARAH_DATA: Parah[] = [
  {
    number: 1,
    name: 'آلم',
    englishName: 'Alif Lam Meem',
    startSurah: 1,
    endSurah: 2,
    startAyah: 1,
    endAyah: 141,
    totalAyahs: 141,
    description: 'The Opening and The Cow (beginning)'
  },
  {
    number: 2,
    name: 'سَيَقُولُ',
    englishName: 'Sayaqool',
    startSurah: 2,
    endSurah: 2,
    startAyah: 142,
    endAyah: 252,
    totalAyahs: 111,
    description: 'The Cow (continuation)'
  },
  {
    number: 3,
    name: 'تِلْكَ الرُّسُلُ',
    englishName: 'Tilka Ar-Rusul',
    startSurah: 2,
    endSurah: 3,
    startAyah: 253,
    endAyah: 92,
    totalAyahs: 126,
    description: 'The Cow (end) and The Family of Imran'
  },
  {
    number: 4,
    name: 'لَنْ تَنَالُوا',
    englishName: 'Lan Tanaaloo',
    startSurah: 3,
    endSurah: 4,
    startAyah: 93,
    endAyah: 23,
    totalAyahs: 131,
    description: 'The Family of Imran (end) and Women'
  },
  {
    number: 5,
    name: 'وَالْمُحْصَنَاتُ',
    englishName: 'Wal Muhsanat',
    startSurah: 4,
    endSurah: 4,
    startAyah: 24,
    endAyah: 147,
    totalAyahs: 124,
    description: 'Women (continuation)'
  },
  {
    number: 6,
    name: 'لَا يُحِبُّ اللَّهُ',
    englishName: 'La Yuhibbullah',
    startSurah: 4,
    endSurah: 5,
    startAyah: 148,
    endAyah: 81,
    totalAyahs: 110,
    description: 'Women (end) and The Table Spread'
  },
  {
    number: 7,
    name: 'وَإِذَا سَمِعُوا',
    englishName: 'Wa Iza Samiu',
    startSurah: 5,
    endSurah: 6,
    startAyah: 82,
    endAyah: 110,
    totalAyahs: 149,
    description: 'The Table Spread (end) and Cattle'
  },
  {
    number: 8,
    name: 'وَلَوْ أَنَّنَا',
    englishName: 'Wa Law Annana',
    startSurah: 6,
    endSurah: 7,
    startAyah: 111,
    endAyah: 87,
    totalAyahs: 127,
    description: 'Cattle (end) and The Heights'
  },
  {
    number: 9,
    name: 'قَالَ الْمَلَأُ',
    englishName: 'Qalal Malao',
    startSurah: 7,
    endSurah: 8,
    startAyah: 88,
    endAyah: 40,
    totalAyahs: 132,
    description: 'The Heights (end) and The Spoils of War'
  },
  {
    number: 10,
    name: 'وَاعْلَمُوا',
    englishName: 'Wa A\'lamoo',
    startSurah: 8,
    endSurah: 9,
    startAyah: 41,
    endAyah: 92,
    totalAyahs: 152,
    description: 'The Spoils of War (end) and Repentance'
  },
  {
    number: 11,
    name: 'يَعْتَذِرُونَ',
    englishName: 'Ya\'taziroon',
    startSurah: 9,
    endSurah: 11,
    startAyah: 93,
    endAyah: 5,
    totalAyahs: 149,
    description: 'Repentance (end), Jonah, and Hud'
  },
  {
    number: 12,
    name: 'وَمَا مِنْ دَابَّةٍ',
    englishName: 'Wa Ma Min Dabbah',
    startSurah: 11,
    endSurah: 12,
    startAyah: 6,
    endAyah: 52,
    totalAyahs: 111,
    description: 'Hud (end) and Joseph'
  },
  {
    number: 13,
    name: 'وَمَا أُبَرِّئُ',
    englishName: 'Wa Ma Ubrioo',
    startSurah: 12,
    endSurah: 14,
    startAyah: 53,
    endAyah: 52,
    totalAyahs: 100,
    description: 'Joseph (end), Thunder, and Abraham'
  },
  {
    number: 14,
    name: 'رُبَمَا',
    englishName: 'Rubama',
    startSurah: 15,
    endSurah: 16,
    startAyah: 1,
    endAyah: 128,
    totalAyahs: 128,
    description: 'The Rocky Tract and The Bee'
  },
  {
    number: 15,
    name: 'سُبْحَانَ الَّذِي',
    englishName: 'Subhanalladhi',
    startSurah: 17,
    endSurah: 18,
    startAyah: 1,
    endAyah: 74,
    totalAyahs: 174,
    description: 'The Night Journey and The Cave'
  },
  {
    number: 16,
    name: 'قَالَ أَلَمْ',
    englishName: 'Qala Alam',
    startSurah: 18,
    endSurah: 20,
    startAyah: 75,
    endAyah: 135,
    totalAyahs: 161,
    description: 'The Cave (end), Mary, and Ta-Ha'
  },
  {
    number: 17,
    name: 'اقْتَرَبَ لِلنَّاسِ',
    englishName: 'Iqtaraba Linnas',
    startSurah: 21,
    endSurah: 22,
    startAyah: 1,
    endAyah: 78,
    totalAyahs: 178,
    description: 'The Prophets and The Pilgrimage'
  },
  {
    number: 18,
    name: 'قَدْ أَفْلَحَ',
    englishName: 'Qad Aflaha',
    startSurah: 23,
    endSurah: 25,
    startAyah: 1,
    endAyah: 20,
    totalAyahs: 120,
    description: 'The Believers, Light, and The Criterion'
  },
  {
    number: 19,
    name: 'وَقَالَ الَّذِينَ',
    englishName: 'Wa Qalalladheena',
    startSurah: 25,
    endSurah: 27,
    startAyah: 21,
    endAyah: 55,
    totalAyahs: 135,
    description: 'The Criterion (end), The Poets, and The Ant'
  },
  {
    number: 20,
    name: 'أَمَّنْ خَلَقَ',
    englishName: 'Amman Khalaq',
    startSurah: 27,
    endSurah: 29,
    startAyah: 56,
    endAyah: 45,
    totalAyahs: 140,
    description: 'The Ant (end), The Story, and The Spider'
  },
  {
    number: 21,
    name: 'أُتْلُ مَا أُوحِيَ',
    englishName: 'Utlu Ma Oohiya',
    startSurah: 29,
    endSurah: 33,
    startAyah: 46,
    endAyah: 30,
    totalAyahs: 135,
    description: 'The Spider (end), The Romans, Luqman, Prostration, and The Clans'
  },
  {
    number: 22,
    name: 'وَمَنْ يَقْنُتْ',
    englishName: 'Wa Man Yaqnut',
    startSurah: 33,
    endSurah: 36,
    startAyah: 31,
    endAyah: 27,
    totalAyahs: 127,
    description: 'The Clans (end), Sheba, The Originator, and Ya-Sin'
  },
  {
    number: 23,
    name: 'وَمَا لِيَ',
    englishName: 'Wa Mali',
    startSurah: 36,
    endSurah: 39,
    startAyah: 28,
    endAyah: 31,
    totalAyahs: 154,
    description: 'Ya-Sin (end), Those Ranged in Rows, and The Throngs'
  },
  {
    number: 24,
    name: 'فَمَنْ أَظْلَمُ',
    englishName: 'Fa Man Azlam',
    startSurah: 39,
    endSurah: 41,
    startAyah: 32,
    endAyah: 46,
    totalAyahs: 115,
    description: 'The Throngs (end), The Believer, and Distinguished'
  },
  {
    number: 25,
    name: 'إِلَيْهِ يُرَدُّ',
    englishName: 'Ilayhi Yuraddu',
    startSurah: 41,
    endSurah: 45,
    startAyah: 47,
    endAyah: 37,
    totalAyahs: 141,
    description: 'Distinguished (end), Consultation, Ornaments of Gold, and Crouching'
  },
  {
    number: 26,
    name: 'حم',
    englishName: 'Ha Meem',
    startSurah: 46,
    endSurah: 51,
    startAyah: 1,
    endAyah: 30,
    totalAyahs: 130,
    description: 'The Wind-Curved Sandhills, Muhammad, Victory, The Chambers, and The Winnowing Winds'
  },
  {
    number: 27,
    name: 'قَالَ فَمَا خَطْبُكُمْ',
    englishName: 'Qala Fama Khatbukum',
    startSurah: 51,
    endSurah: 57,
    startAyah: 31,
    endAyah: 29,
    totalAyahs: 129,
    description: 'The Winnowing Winds (end), Mount Sinai, The Star, The Moon, The Beneficent, and Iron'
  },
  {
    number: 28,
    name: 'قَدْ سَمِعَ اللَّهُ',
    englishName: 'Qad Sami\'allahu',
    startSurah: 58,
    endSurah: 66,
    startAyah: 1,
    endAyah: 12,
    totalAyahs: 112,
    description: 'The Disputation, The Gathering, The Ranks, The Congregation, and The Prohibition'
  },
  {
    number: 29,
    name: 'تَبَارَكَ الَّذِي',
    englishName: 'Tabarakalladhi',
    startSurah: 67,
    endSurah: 77,
    startAyah: 1,
    endAyah: 50,
    totalAyahs: 150,
    description: 'The Sovereignty, The Pen, The Inevitable, The Scatterers, The Mount, and The Emissaries'
  },
  {
    number: 30,
    name: 'عَمَّ يَتَسَاءَلُونَ',
    englishName: 'Amma Yatasaa\'aloon',
    startSurah: 78,
    endSurah: 114,
    startAyah: 1,
    endAyah: 6,
    totalAyahs: 37,
    description: 'The Tidings, The Frowning, The Overthrowing, The Sundering, The Defrauders, The Splitting, The Constellations, The Night-Comer, The Most High, The Enveloper, The Wrapped, The Shrouded, The Resurrection, The City, The Sun, The Night, The Forenoon, The Expanding, The Fig, The Clot, The Night of Decree, The Clear Proof, The Earthquake, The Runners, The Striking, The Chargers, The Calamity, The Rivalry, The Afternoon, The Slanderer, The Elephant, Quraysh, The Abundance, The Disbelievers, The Succour, The Palm Fibre, Sincerity, The Daybreak, and The People'
  }
];

// Helper functions for Parah operations
export const getParahByNumber = (parahNumber: number): Parah | undefined => {
  return PARAH_DATA.find(parah => parah.number === parahNumber);
};

export const getSurahsInParah = (parahNumber: number): number[] => {
  const parah = getParahByNumber(parahNumber);
  if (!parah) return [];
  
  const surahs: number[] = [];
  for (let surah = parah.startSurah; surah <= parah.endSurah; surah++) {
    surahs.push(surah);
  }
  return surahs;
};

export const getParahBySurah = (surahNumber: number): Parah | undefined => {
  return PARAH_DATA.find(parah => 
    surahNumber >= parah.startSurah && surahNumber <= parah.endSurah
  );
};

export const getParahRange = (startParah: number, endParah: number): Parah[] => {
  return PARAH_DATA.filter(parah => 
    parah.number >= startParah && parah.number <= endParah
  );
};
