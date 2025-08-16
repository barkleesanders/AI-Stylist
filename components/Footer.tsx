
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} AI Sustainable Stylist. All rights reserved.</p>
      </div>
    </footer>
  );
};
