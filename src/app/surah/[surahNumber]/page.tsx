'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Ayah {
  numberInSurah: number;
  text: string;
}

interface SurahData {
  englishName: string;
  name: string;
  edition: {
    englishName: string;
    language: string;
  };
  ayahs: Ayah[];
}

export default function SurahPage({ params }: { params: { surahNumber: string } }) {
  const { surahNumber } = params;
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ur.jalandhry');
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  const [arabicData, setArabicData] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [versesPerPage] = useState<number>(10);
  const [readingProgress, setReadingProgress] = useState<{[key: string]: any}>({});

  const languageOptions = [
    { value: 'quran-uthmani', label: 'Arabic' },
    { value: 'ur.jalandhry', label: 'Urdu' },
    { value: 'en.asad', label: 'English' },
  ];

  const getSurahTranslations = async (surahNumber: string, language: string): Promise<SurahData> => {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${language}`);
    const data = await res.json();
    return data.data;
  };

  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);
    setCurrentPage(1);
    setLoading(true);
    try {
      const data = await getSurahTranslations(surahNumber, language);
      setSurahData(data);
    } catch (error) {
      console.error('Error fetching surah data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = surahData ? Math.ceil(surahData.ayahs.length / versesPerPage) : 0;
  const startIndex = (currentPage - 1) * versesPerPage;
  const endIndex = startIndex + versesPerPage;
  const currentVerses = surahData ? surahData.ayahs.slice(startIndex, endIndex) : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    saveProgress(surahNumber, page, selectedLanguage);
    const versesContainer = document.getElementById('verses-container');
    if (versesContainer) {
      versesContainer.scrollTop = 0;
    }
  };

  const saveProgress = (surahNum: string, page: number, language: string) => {
    const progressKey = `quran_progress_${surahNum}_${language}`;
    const progressData = {
      surahNumber: surahNum,
      currentPage: page,
      language: language,
      lastRead: new Date().toISOString(),
      totalPages: surahData ? Math.ceil(surahData.ayahs.length / versesPerPage) : 0,
      totalVerses: surahData ? surahData.ayahs.length : 0,
      surahName: surahData ? surahData.englishName : '',
      surahArabicName: surahData ? surahData.name : ''
    };
    
    localStorage.setItem(progressKey, JSON.stringify(progressData));
    setReadingProgress(prev => ({
      ...prev,
      [progressKey]: progressData
    }));
  };

  const loadProgress = (surahNum: string, language: string) => {
    const progressKey = `quran_progress_${surahNum}_${language}`;
    const savedProgress = localStorage.getItem(progressKey);
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      setCurrentPage(progressData.currentPage || 1);
      setReadingProgress(prev => ({
        ...prev,
        [progressKey]: progressData
      }));
      return progressData;
    }
    return null;
  };

  const getProgressPercentage = (surahNum: string, language: string) => {
    const progressKey = `quran_progress_${surahNum}_${language}`;
    const progress = readingProgress[progressKey];
    if (progress && progress.totalPages > 0) {
      return Math.round((progress.currentPage / progress.totalPages) * 100);
    }
    return 0;
  };

  useEffect(() => {
    const loadSurahData = async () => {
      setLoading(true);
      try {
        const [arabicResult, translationResult] = await Promise.all([
          getSurahTranslations(surahNumber, 'quran-uthmani'),
          getSurahTranslations(surahNumber, selectedLanguage)
        ]);
        setArabicData(arabicResult);
        setSurahData(translationResult);
        
        const savedProgress = loadProgress(surahNumber, selectedLanguage);
        if (savedProgress) {
          console.log('Resumed from page:', savedProgress.currentPage);
        }
      } catch (error) {
        console.error('Error fetching surah data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurahData();
  }, [surahNumber, selectedLanguage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-blue-600 border border-blue-200 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Surahs
          </button>
          
          {surahData && (
            <div className="text-right">
              <div className="text-sm text-gray-500">Surah {surahNumber}</div>
              <div className="text-lg font-semibold text-gray-800">{surahData.ayahs.length} verses</div>
            </div>
          )}
        </div>

        {/* Progress Tracking Card */}
        {surahData && (
          <div className="mb-6 bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl shadow-xl border border-blue-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Reading Progress</h3>
                  <p className="text-sm text-gray-600">
                    {getProgressPercentage(surahNumber, selectedLanguage)}% Complete
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Last Read</div>
                <div className="text-sm font-medium text-gray-700">
                  {readingProgress[`quran_progress_${surahNumber}_${selectedLanguage}`]?.lastRead 
                    ? new Date(readingProgress[`quran_progress_${surahNumber}_${selectedLanguage}`].lastRead).toLocaleDateString()
                    : 'Not started'
                  }
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${getProgressPercentage(surahNumber, selectedLanguage)}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Page {currentPage} of {totalPages}</span>
              <span>Verses {startIndex + 1}-{Math.min(endIndex, surahData.ayahs.length)} of {surahData.ayahs.length}</span>
            </div>
          </div>
        )}

        {/* Language Selection Card */}
        <div className="mb-8 bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl shadow-xl p-6 border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="language-select" className="block text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Select Translation Language
              </label>
              <select
                id="language-select"
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full max-w-xs px-4 py-3 pr-10 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-gray-800 font-medium shadow-lg hover:shadow-xl appearance-none bg-no-repeat bg-right bg-[length:20px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgNy41TDEwIDEyLjVMMTUgNy41IiBzdHJva2U9IiM2MzY2RjEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=')]"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Surah Content */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
              </div>
              <div className="text-xl font-semibold text-gray-700">Loading Surah...</div>
              <div className="text-sm text-gray-500">Please wait while we fetch the content</div>
            </div>
          </div>
        ) : surahData ? (
          <div className="space-y-8">
            {/* Surah Header */}
            <div className="text-center bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl shadow-xl p-8 border border-blue-200">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {surahData.englishName}
              </h1>
              <h2 className="text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold mb-4 font-arabic-elegant">
                {surahData.name}
              </h2>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-medium shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {surahData.edition.englishName} ({surahData.edition.language})
              </div>
            </div>

            {/* Ayahs Container */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-xl border border-blue-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">Verses</h3>
                  {surahData && (
                    <div className="text-white text-sm">
                      Page {currentPage} of {totalPages} • Verses {startIndex + 1}-{Math.min(endIndex, surahData.ayahs.length)} of {surahData.ayahs.length}
                    </div>
                  )}
                </div>
              </div>
              <div id="verses-container" className="max-h-screen overflow-y-auto">
                <div className="divide-y divide-gray-100">
                  {currentVerses.map((ayah, index) => (
                    <div key={ayah.numberInSurah} className="p-5 md:p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start gap-3 md:gap-4 lg:gap-6">
                        {/* Verse Number */}
                        <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-base md:text-lg lg:text-xl">
                          {ayah.numberInSurah}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 space-y-4">
                          {/* Arabic Text - Large Font */}
                          {arabicData && (
                            <div className="text-right">
                              <p className="text-2xl md:text-3xl lg:text-4xl font-arabic-elegant text-gray-900 leading-relaxed">
                                {arabicData.ayahs.find(a => a.numberInSurah === ayah.numberInSurah)?.text}
                              </p>
                            </div>
                          )}
                          
                          {/* Translation - Smaller Font */}
                          <div className="text-left">
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                              {ayah.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination Controls */}
            {surahData && totalPages > 1 && (
              <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl shadow-xl border border-blue-200 p-6">
                {/* Main Pagination Row */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  {/* Page Numbers - Responsive */}
                  <div className="flex items-center gap-1 flex-wrap justify-center max-w-full">
                    {totalPages <= 10 ? (
                      Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110'
                              : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-100 hover:to-indigo-100 hover:shadow-md'
                          }`}
                        >
                          {page}
                        </button>
                      ))
                    ) : (
                      <>
                        {/* First page */}
                        <button
                          onClick={() => handlePageChange(1)}
                          className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                            currentPage === 1
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110'
                              : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-100 hover:to-indigo-100 hover:shadow-md'
                          }`}
                        >
                          1
                        </button>
                        
                        {/* Ellipsis if current page is far from start */}
                        {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
                        
                        {/* Pages around current page */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const startPage = Math.max(2, currentPage - 2);
                          const page = startPage + i;
                          if (page >= totalPages) return null;
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                                currentPage === page
                                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110'
                                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-100 hover:to-indigo-100 hover:shadow-md'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                        
                        {/* Ellipsis if current page is far from end */}
                        {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                        
                        {/* Last page */}
                        {totalPages > 1 && (
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                              currentPage === totalPages
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110'
                                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-100 hover:to-indigo-100 hover:shadow-md'
                            }`}
                          >
                            {totalPages}
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Quick Navigation */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Go to page:</span>
                  <select
                    value={currentPage}
                    onChange={(e) => handlePageChange(Number(e.target.value))}
                    className="px-4 py-2 pr-8 border-2 border-blue-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-lg hover:shadow-xl transition-all duration-200 appearance-none bg-no-repeat bg-right bg-[length:16px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iIzYzNjZGMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')]"
                  >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <option key={page} value={page}>
                        Page {page}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="text-xl font-semibold text-gray-700">Failed to Load</div>
              <div className="text-sm text-gray-500">Unable to load surah data. Please try again.</div>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
