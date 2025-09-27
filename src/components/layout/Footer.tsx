import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2">Holy Quran App</h3>
            <p className="text-blue-100">Read, Learn, and Reflect on the Divine Words</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>Complete Quran</li>
                <li>Multiple Translations</li>
                <li>Progress Tracking</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Languages</h4>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>Arabic</li>
                <li>Urdu</li>
                <li>English</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Support</h4>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>Mobile Responsive</li>
                <li>Cross Platform</li>
                <li>Free to Use</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-400 pt-4">
            <p className="text-blue-100 text-sm">
              © 2024 Holy Quran App. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;