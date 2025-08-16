import React, { useState } from 'react';

interface DomainSelectorProps {
    onDomainSet: (domain: string) => void;
}

export const DomainSelector: React.FC<DomainSelectorProps> = ({ onDomainSet }) => {
    const [domain, setDomain] = useState('everlane.com');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (domain.trim()) {
            onDomainSet(domain.trim().replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]);
        }
    };

    return (
        <div className="max-w-xl mx-auto my-12 text-center bg-white p-8 rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">First, choose a website.</h2>
            <p className="text-gray-600 mb-6">I'll use this brand's sitemap to find valid, shoppable links. I'll start by checking if the brand is sustainable.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="e.g., everlane.com"
                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-900"
                    aria-label="Website domain"
                />
                <button
                    type="submit"
                    className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400"
                    disabled={!domain.trim()}
                >
                    Start Styling
                </button>
            </form>
            <p className="text-xs text-gray-400 mt-4">Suggested sustainable brand: everlane.com</p>
        </div>
    );
};
