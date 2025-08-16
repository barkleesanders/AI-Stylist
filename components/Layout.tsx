
import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ApiKeyModal } from './ApiKeyModal';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isApiKeyMissing = !process.env.API_KEY;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isApiKeyMissing ? <ApiKeyModal /> : children}
      </main>
      <Footer />
    </div>
  );
};
