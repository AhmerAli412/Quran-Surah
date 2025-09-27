import React, { useState } from 'react';
import { Parah } from '@/types/parah';
import { PARAH_DATA } from '@/constants/parah';
import Button from '../ui/Button';

interface ParahNavigationProps {
  onParahSelect: (parahNumber: number) => void;
  selectedParah?: number;
  className?: string;
}

const ParahNavigation: React.FC<ParahNavigationProps> = ({
  onParahSelect,
  selectedParah,
  className = ''
}) => {
  const [showAll, setShowAll] = useState(false);
  
  const visibleParahs = showAll ? PARAH_DATA : PARAH_DATA.slice(0, 12);

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Browse by Parah (Juz)
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2"
        >
          {showAll ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Show Less
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Show All 30
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {visibleParahs.map((parah) => (
          <button
            key={parah.number}
            onClick={() => onParahSelect(parah.number)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200 text-center
              ${selectedParah === parah.number
                ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
              }
            `}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2 shadow-lg">
              {parah.number}
            </div>
            <div className="text-xs font-semibold text-gray-700 mb-1">
              {parah.englishName}
            </div>
            <div className="text-xs text-gray-500 font-arabic-elegant">
              {parah.name}
            </div>
          </button>
        ))}
      </div>

      {!showAll && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Showing first 12 Parahs. Click "Show All 30" to see all Parahs.
          </p>
        </div>
      )}
    </div>
  );
};

export default ParahNavigation;
