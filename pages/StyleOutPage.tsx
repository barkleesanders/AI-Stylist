import React, { useState } from 'react';
import { generateStyleOut } from '../services/geminiService';
import { ChatMessage } from '../types';
import { STYLE_OUT_PROMPT } from '../constants';
import { ChatContainer } from '../components/ChatContainer';
import { useChat } from '../hooks/useChat';
import { DomainSelector } from '../components/DomainSelector';

const initialMessage: ChatMessage = {
  id: 'init',
  role: 'model',
  text: `Welcome to the Automated "Style Out" Generator! Who are we styling today?
  
For example: "a business casual capsule wardrobe" or "a client who needs a wardrobe for a trip to Italy".`
};

export const StyleOutPage: React.FC = () => {
    const [domain, setDomain] = useState<string | null>(null);

    const { messages, isLoading, handleSendMessage } = useChat({
        initialMessages: [initialMessage],
        generationFn: (request: string) => {
            if (!domain) throw new Error("Domain not set");
            const prompt = STYLE_OUT_PROMPT(domain, request);
            return generateStyleOut(prompt);
        },
    });

    if (!domain) {
        return <DomainSelector onDomainSet={setDomain} />;
    }

    return (
        <ChatContainer
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            title="Style Out"
            subtitle={`Searching on: ${domain}`}
        />
    );
};
