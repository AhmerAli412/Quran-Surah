import React from 'react';
import { Language, LanguageOption } from '@/types';
import { LANGUAGE_OPTIONS } from '@/constants';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  className = ''
}) => {
  return (
    <div className={`bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl shadow-xl p-6 border border-blue-200 ${className}`}>
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
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="w-full max-w-xs px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-gray-800 font-medium shadow-lg hover:shadow-xl"
          >
            {LANGUAGE_OPTIONS.map((option: LanguageOption) => (
              <option key={option.value} value={option.value}>
                {option.flag} {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
