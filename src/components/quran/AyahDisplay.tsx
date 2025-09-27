import React from 'react';
import { Ayah } from '@/types';

interface AyahDisplayProps {
  ayah: Ayah;
  showNumber?: boolean;
  className?: string;
}

const AyahDisplay: React.FC<AyahDisplayProps> = ({
  ayah,
  showNumber = true,
  className = ''
}) => {
  return (
    <div className={`p-8 hover:bg-gray-50 transition-colors duration-200 ${className}`}>
      <div className="flex items-start gap-6">
        {showNumber && (
          <div className="flex-shrink-0 w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-lg">
            {ayah.numberInSurah}
          </div>
        )}
        
        <div className="flex-1 space-y-6">
          {/* Arabic Text */}
          <div className="text-right">
            <p className="arabic-text-large text-gray-900 shadow-sm">
              {ayah.text}
            </p>
          </div>
          
          {/* Translation */}
          <div className="text-left">
            <p className="text-xl text-gray-700 leading-relaxed">
              {ayah.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AyahDisplay;
