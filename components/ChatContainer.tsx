import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChatMessage } from '../types';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatInput } from './ChatInput';
import { HomeIcon } from './icons/HomeIcon';

interface ChatContainerProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  title: string;
  subtitle: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ 
    messages, 
    onSendMessage, 
    isLoading, 
    title,
    subtitle
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden" style={{height: 'calc(100vh - 12rem)'}}>
            <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
                <Link to="/" className="p-2 rounded-full hover:bg-gray-200 transition-colors" aria-label="Back to Home">
                    <HomeIcon className="w-6 h-6 text-gray-600" />
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                {messages.map((msg) => (
                    <ChatMessageBubble key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white border-t border-gray-200">
                <ChatInput 
                    onSendMessage={onSendMessage} 
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};
