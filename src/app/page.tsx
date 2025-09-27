'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSurahList } from '@/hooks/useQuran';
import { PARAH_DATA, getSurahsInParah } from '@/constants/parah';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// TypeScript interfaces for API response
interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

interface ApiResponse {
  data: {
    surahs: {
      references: Surah[];
    };
  };
}

// Al Quran Cloud API سے تمام سورتوں کی فہرست حاصل کرنے کے لیے ایک فنکشن
async function getSurahList(): Promise<Surah[]> {
  const res = await fetch('https://api.alquran.cloud/v1/meta');
  const data: ApiResponse = await res.json();
  return data.data.surahs.references;
}

export default function HomePage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [progressData, setProgressData] = useState<{[key: string]: any}>({});

  useEffect(() => {
    getSurahList().then(setSurahs);
    loadAllProgress();
  }, []);

  const loadAllProgress = () => {
    const allProgress: {[key: string]: any} = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('quran_progress_')) {
        const progress = JSON.parse(localStorage.getItem(key) || '{}');
        allProgress[key] = progress;
      }
    }
    setProgressData(allProgress);
  };

  const getSurahProgress = (surahNumber: number) => {
    const urduProgress = progressData[`quran_progress_${surahNumber}_ur.jalandhry`];
    const englishProgress = progressData[`quran_progress_${surahNumber}_en.asad`];
    const arabicProgress = progressData[`quran_progress_${surahNumber}_quran-uthmani`];
    
    return urduProgress || englishProgress || arabicProgress || null;
  };

  const getProgressPercentage = (surahNumber: number) => {
    const progress = getSurahProgress(surahNumber);
    if (progress && progress.totalPages > 0) {
      return Math.round((progress.currentPage / progress.totalPages) * 100);
    }
    return 0;
  };

  // Get Parah for a specific Surah
  const getParahForSurah = (surahNumber: number) => {
    return PARAH_DATA.find(parah => 
      surahNumber >= parah.startSurah && surahNumber <= parah.endSurah
    );
  };

  // Group Surahs by Parah
  const groupSurahsByParah = () => {
    const grouped: {[key: number]: {parah: any, surahs: Surah[]}} = {};
    
    surahs.forEach(surah => {
      const parah = getParahForSurah(surah.number);
      if (parah) {
        if (!grouped[parah.number]) {
          grouped[parah.number] = { parah, surahs: [] };
        }
        grouped[parah.number].surahs.push(surah);
      }
    });
    
    return Object.values(grouped).sort((a, b) => a.parah.number - b.parah.number);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Header />

      <div className="container mx-auto p-4">
        
        {/* Progress Summary */}
        {Object.keys(progressData).length > 0 && (
          <div className="mb-8 bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl shadow-xl border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Your Reading Progress</h2>
                <p className="text-sm text-gray-600">Continue where you left off</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {surahs.filter(surah => getSurahProgress(surah.number)).map((surah) => {
                const progress = getSurahProgress(surah.number);
                const percentage = getProgressPercentage(surah.number);
                return (
                  <div key={surah.number} className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-4 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Surah {surah.number}</span>
                      <span className="text-sm font-semibold text-gray-600">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600">
                      Page {progress.currentPage} of {progress.totalPages} • Last read: {new Date(progress.lastRead).toLocaleDateString()}
                    </div>
                    <Link href={`/surah/${surah.number}`} className="inline-block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 text-sm font-medium">
                      Continue Reading →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Surahs organized by Parah */}
        <div className="space-y-8">
          {groupSurahsByParah().map(({ parah, surahs: parahSurahs }) => (
            <div key={parah.number} className="space-y-4">
              {/* Parah Heading */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 font-arabic-elegant">
                      {parah.name}
                    </h2>
                    <p className="text-blue-100 text-lg mb-2">
                      Parah {parah.number}: {parah.englishName}
                    </p>
                    <p className="text-blue-100 text-sm">{parah.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{parahSurahs.length}</div>
                    <div className="text-blue-100 text-sm">Surahs</div>
                  </div>
                </div>
              </div>

              {/* Surahs in this Parah */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {parahSurahs.map((surah) => {
                  const progress = getSurahProgress(surah.number);
                  const percentage = getProgressPercentage(surah.number);
                  const hasProgress = progress !== null;
                  
                  return (
                    <div key={surah.number} className={`p-6 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      hasProgress 
                        ? 'border-green-200 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50' 
                        : 'border-gray-100 bg-gradient-to-br from-white via-blue-50 to-indigo-50'
                    }`}>
                      <Link href={`/surah/${surah.number}`}>
                        <div className="cursor-pointer">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700">
                              {surah.number}. {surah.englishName}
                            </span>
                            {hasProgress && (
                              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{surah.englishNameTranslation} - {surah.numberOfAyahs} verses</p>
                          <p className="text-sm text-gray-500 mb-3 font-arabic-elegant">{surah.name}</p>
                          
                          {hasProgress && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-600">Progress</span>
                                <span className="text-xs font-medium bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{percentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-500 shadow-sm"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Page {progress.currentPage} of {progress.totalPages}
                              </p>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
