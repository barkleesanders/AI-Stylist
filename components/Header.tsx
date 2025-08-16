
import React from 'react';
import { Link } from 'react-router-dom';
import { LeafIcon } from './icons/LeafIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-semibold text-gray-800 hover:text-emerald-600 transition-colors">
            <LeafIcon className="h-8 w-8 text-emerald-500" />
            <h1>AI Sustainable Stylist</h1>
          </Link>
          <nav>
            {/* Future navigation links can go here */}
          </nav>
        </div>
      </div>
    </header>
  );
};
