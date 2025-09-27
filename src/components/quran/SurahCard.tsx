import React from 'react';
import Link from 'next/link';
import { Surah, UserProgress } from '@/types';
import { formatSurahName } from '@/utils';
import { userService } from '@/services';
import ProgressBar from '../ui/ProgressBar';
import Card from '../ui/Card';

interface SurahCardProps {
  surah: Surah;
  progress?: UserProgress | null;
  userId?: string;
  className?: string;
}

const SurahCard: React.FC<SurahCardProps> = ({
  surah,
  progress,
  userId,
  className = ''
}) => {
  const hasProgress = progress !== null;
  const progressPercentage = progress ? userService.calculateProgressPercentage(progress.currentPage, progress.totalPages) : 0;

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-xl hover:scale-105 ${
        hasProgress 
          ? 'border-green-200 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50' 
          : 'border-gray-100 bg-gradient-to-br from-white via-blue-50 to-indigo-50'
      } ${className}`}
    >
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
          
          <p className="text-gray-600 mb-3">
            {surah.englishNameTranslation} - {surah.numberOfAyahs} verses
          </p>
          
          <p className="text-sm text-gray-500 mb-3 font-arabic-elegant">
            {surah.name}
          </p>
          
          {hasProgress && progress && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">Progress</span>
                <span className="text-xs font-medium bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {progressPercentage}%
                </span>
              </div>
              <ProgressBar
                current={progress.currentPage}
                total={progress.totalPages}
                showPercentage={false}
                showNumbers={false}
                className="h-1.5"
              />
              <p className="text-xs text-gray-500 mt-1">
                Page {progress.currentPage} of {progress.totalPages}
              </p>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
};

export default SurahCard;
