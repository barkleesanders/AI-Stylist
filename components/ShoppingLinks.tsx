
import React from 'react';
import { SearchResult } from '../types';

interface ShoppingLinksProps {
    results: SearchResult[];
}

export const ShoppingLinks: React.FC<ShoppingLinksProps> = ({ results }) => {
    if (!results || results.length === 0) {
        return null;
    }

    return (
        <div>
            <h5 className="font-semibold text-gray-600 text-sm mt-4 mb-2">Sources & Shopping Links:</h5>
            <div className="flex flex-wrap gap-2">
                {results.map((result, i) => (
                    <a 
                        key={i} 
                        href={result.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded-full py-1 px-3 transition-colors duration-200 inline-block"
                    >
                        {result.web.title || new URL(result.web.uri).hostname}
                    </a>
                ))}
            </div>
        </div>
    );
};
