
import React from 'react';
import { FeatureCard } from '../components/FeatureCard';
import { MoneyIcon } from '../components/icons/MoneyIcon';
import { ArticleIcon } from '../components/icons/ArticleIcon';
import { StyleIcon } from '../components/icons/StyleIcon';
import { MoodBoardIcon } from '../components/icons/MoodBoardIcon';

const features = [
  {
    icon: <MoneyIcon />,
    title: 'Monetization Strategy',
    description: 'Generate potential monetization models for your sustainable styling business.',
    linkTo: '/monetization',
  },
  {
    icon: <ArticleIcon />,
    title: 'Educational Content',
    description: 'Create engaging articles about sustainable fashion and its impact.',
    linkTo: '/content-creator',
  },
  {
    icon: <StyleIcon />,
    title: 'Automated "Style Out"',
    description: 'Instantly generate a curated, sustainable "Modern Classic" look for clients.',
    linkTo: '/style-out',
  },
  {
    icon: <MoodBoardIcon />,
    title: 'Visual Mood Board',
    description: 'Create beautiful, high-quality visual mood boards for client presentations.',
    linkTo: '/mood-board',
  },
];

export const HomePage: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">Your AI-Powered Sustainable Stylist</h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">Tools to build a stylish, sustainable, and timeless wardrobe while educating and inspiring others.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
};
