
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkTo: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, linkTo }) => {
  return (
    <Link to={linkTo} className="block group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center h-full">
        <div className="bg-emerald-100 text-emerald-600 rounded-full p-4 mb-4 group-hover:bg-emerald-200 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
        <span className="mt-4 text-emerald-600 font-semibold group-hover:underline">
          Try Now &rarr;
        </span>
      </div>
    </Link>
  );
};
