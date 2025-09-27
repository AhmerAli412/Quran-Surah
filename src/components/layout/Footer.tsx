import React from 'react';
import { SEO_CONFIG } from '@/constants';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <div className={`mt-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden ${className}`}>
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
  );
};

export default Footer;
