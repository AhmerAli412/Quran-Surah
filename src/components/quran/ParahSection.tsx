import React, { useState } from 'react';
import { Parah } from '@/types/parah';
import { Surah } from '@/types/quran';
import { getSurahsInParah } from '@/constants/parah';
import SurahCard from './SurahCard';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ParahSectionProps {
  parah: Parah;
  surahs: Surah[];
  userProgress?: Record<string, any>;
  userId?: string;
  className?: string;
}

const ParahSection: React.FC<ParahSectionProps> = ({
  parah,
  surahs,
  userProgress = {},
  userId,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get surahs that belong to this Parah
  const parahSurahs = surahs.filter(surah => {
    const surahNumbers = getSurahsInParah(parah.number);
    return surahNumbers.includes(surah.number);
  });

  // Calculate progress for this Parah
  const parahProgress = parahSurahs.reduce((total, surah) => {
    const progressKey = `quran_progress_${userId}_${surah.number}_quran-uthmani`;
    const progress = userProgress[progressKey];
    if (progress) {
      return total + (progress.currentPage / progress.totalPages);
    }
    return total;
  }, 0);

  const progressPercentage = parahSurahs.length > 0 
    ? Math.round((parahProgress / parahSurahs.length) * 100) 
    : 0;

  const hasProgress = progressPercentage > 0;

  return (
    <Card className={`mb-6 ${className}`}>
      <div className="p-6">
        {/* Parah Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {parah.number}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Parah {parah.number}: {parah.englishName}
              </h3>
              <p className="text-sm text-gray-600 font-arabic-elegant">
                {parah.name}
              </p>
              <p className="text-sm text-gray-500">
                {parah.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {hasProgress && (
              <div className="text-right">
                <div className="text-sm text-gray-600">Progress</div>
                <div className="text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {progressPercentage}%
                </div>
              </div>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isExpanded ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Hide
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  View Surahs
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {hasProgress && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Surahs Grid */}
        {isExpanded && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Surahs in this Parah ({parahSurahs.length})
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {parahSurahs.map((surah) => {
                const progressKey = `quran_progress_${userId}_${surah.number}_quran-uthmani`;
                const progress = userProgress[progressKey];
                
                return (
                  <div
                    key={surah.number}
                    className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-blue-600">
                        {surah.number}. {surah.englishName}
                      </span>
                      {progress && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{surah.englishNameTranslation}</p>
                    <p className="text-xs text-gray-500 font-arabic-elegant mb-2">{surah.name}</p>
                    <p className="text-xs text-gray-500">{surah.numberOfAyahs} verses</p>
                    {progress && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-1 rounded-full"
                            style={{ width: `${Math.round((progress.currentPage / progress.totalPages) * 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round((progress.currentPage / progress.totalPages) * 100)}% complete
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Parah Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {parahSurahs.length} Surah{parahSurahs.length !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {parah.totalAyahs} Verses
              </span>
            </div>
            <span className="text-blue-600 font-medium">
              Surah {parah.startSurah} - {parah.endSurah}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ParahSection;
