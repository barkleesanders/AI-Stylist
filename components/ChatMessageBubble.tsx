import React from 'react';
import { ChatMessage } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { GeneratedContent } from './GeneratedContent';
import { ShoppingLinks } from './ShoppingLinks';

const ModelContent: React.FC<{ message: ChatMessage; }> = ({ message }) => {
    if (message.isLoading && !message.imageUrl) {
        return <LoadingSpinner />;
    }
    if (message.error) {
        return <p className="text-red-500">{message.error}</p>;
    }
    
    let isStructured = false;
    if (message.text) {
        try {
            const parsed = JSON.parse(message.text);
            if ((parsed.sustainableItems && Array.isArray(parsed.sustainableItems)) || (parsed.otherItems && Array.isArray(parsed.otherItems))) {
                isStructured = true;
            }
        } catch(e) { /* Not a JSON object, ignore */ }
    }


    return (
        <div className={!isStructured ? 'prose prose-lg prose-emerald font-serif max-w-none break-words' : 'max-w-none break-words'}>
            {message.imageUrl && (
                 <div className="bg-gray-100 p-2 rounded-lg shadow-inner not-prose mb-4">
                    <img src={`data:image/jpeg;base64,${message.imageUrl}`} alt="AI-generated visual" className="w-full h-auto rounded-md" />
                 </div>
            )}
            
            {message.isLoading && message.imageUrl && (
                 <div className="flex items-center justify-center text-gray-500 mt-4 not-prose">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600 mr-2"></div>
                    {message.text || "AI is thinking..."}
                </div>
            )}

            {message.text && !message.isLoading && <GeneratedContent content={message.text} lite />}

            {message.searchResults && message.searchResults.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200 not-prose">
                    <ShoppingLinks results={message.searchResults} />
                </div>
            )}
        </div>
    );
}

export const ChatMessageBubble: React.FC<{ message: ChatMessage; onFindProducts?: (messageId: string, itemIndex: number) => void; }> = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex-shrink-0 ${isUser ? 'bg-emerald-500' : 'bg-gray-700'} flex items-center justify-center text-white font-bold`}>
                {isUser ? 'U' : 'AI'}
            </div>
            <div className={`p-4 rounded-lg max-w-2xl ${isUser ? 'bg-emerald-100' : 'bg-white shadow-sm'}`}>
                {isUser ? (
                    <p className="text-gray-800 break-words whitespace-pre-wrap">{message.text}</p>
                ) : (
                    <ModelContent message={message} />
                )}
            </div>
        </div>
    );
};
