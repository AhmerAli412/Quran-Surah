'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// TypeScript interfaces for API response
interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Beautiful Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Arabic Calligraphy */}
            <div className="mb-6">
              <p className="text-4xl md:text-5xl font-arabic-elegant text-white/90 mb-2">
                القرآن الكريم
              </p>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Holy Quran
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Read, Learn, and Reflect on the Divine Words
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Complete Quran</h3>
                <p className="text-blue-100 text-sm">All 114 Surahs with authentic text</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Multiple Languages</h3>
                <p className="text-blue-100 text-sm">Arabic, Urdu, and English translations</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
                <p className="text-blue-100 text-sm">Continue where you left off</p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <span className="text-white font-medium">Start Your Journey Today</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-sm">Scroll down to explore</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* Section Separator */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-blue-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600 font-medium ml-2">Explore the Surahs</span>
          </div>
        </div>
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {surahs.map((surah) => {
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
        
        {/* Beautiful Footer Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Begin Your Spiritual Journey
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Experience the beauty of the Quran with our modern, user-friendly interface. 
                Read at your own pace and track your progress as you explore the divine words.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">114</div>
                  <div className="text-blue-100 text-sm">Surahs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">6,236</div>
                  <div className="text-blue-100 text-sm">Verses</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-blue-100 text-sm">Languages</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 border border-white/30">
                  <span className="text-white font-semibold text-lg">Ready to Start?</span>
                </div>
                <div className="text-blue-100 text-sm">
                  Choose any Surah above to begin reading
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
