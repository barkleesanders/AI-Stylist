import { useState } from 'react';
import { ChatMessage } from '../types';

interface ChatParams {
    initialMessages: ChatMessage[];
    generationFn: (prompt: string) => Promise<{ text: string; searchResults?: any[]; imageUrl?: string; }>;
}

export const useChat = ({ initialMessages, generationFn }: ChatParams) => {
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSendMessage = async (text: string) => {
        setIsLoading(true);
        const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text };
        
        // When generating a visual, we need a placeholder for the image and the text.
        const generationResult = generationFn(text);
        
        // Optimistically add image loading state if we expect an image
        const loadingMessage: ChatMessage = { 
            id: (Date.now() + 1).toString(), 
            role: 'model', 
            text: 'Generating visual...', 
            isLoading: true,
        };

        setMessages(prev => [...prev, userMessage, loadingMessage]);

        try {
            const { text: responseText, searchResults, imageUrl } = await generationResult;

            // If we have an image, update the message with the text loading state.
            if (imageUrl) {
                 const imageLoadedMessage: ChatMessage = { 
                    ...loadingMessage, 
                    imageUrl,
                    text: 'Finding products in the image...',
                };
                 setMessages(prev => prev.map(msg => msg.id === loadingMessage.id ? imageLoadedMessage : msg));
            }

            const finalResponseMessage: ChatMessage = { 
                id: loadingMessage.id, 
                role: 'model', 
                text: responseText, 
                searchResults, 
                imageUrl, 
                isLoading: false 
            };
            setMessages(prev => prev.map(msg => msg.id === loadingMessage.id ? finalResponseMessage : msg));

        } catch (e: any) {
             const errorMessage: ChatMessage = { id: loadingMessage.id, role: 'model', text: '', error: e.message || "An unknown error occurred." };
             setMessages(prev => prev.map(msg => msg.id === loadingMessage.id ? errorMessage : msg));
        }
        setIsLoading(false);
    };

    return {
        messages,
        isLoading,
        handleSendMessage,
    };
};
