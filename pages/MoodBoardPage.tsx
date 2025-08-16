import React, { useState } from 'react';
import { generateVisualWithShoppingLinks } from '../services/geminiService';
import { ChatMessage } from '../types';
import { ChatContainer } from '../components/ChatContainer';
import { useChat } from '../hooks/useChat';
import { DomainSelector } from '../components/DomainSelector';


const initialMessage: ChatMessage = {
  id: 'init',
  role: 'model',
  text: `Welcome to the AI Visual Mood Board Creator! 
  
Describe the visual you want, and I'll generate a mood board and find shoppable links from your chosen brand.`
};

export const MoodBoardPage: React.FC = () => {
  const [domain, setDomain] = useState<string | null>(null);

  const { messages, isLoading, handleSendMessage } = useChat({
    initialMessages: [initialMessage],
    generationFn: (prompt: string) => {
        if (!domain) throw new Error("Domain not set");
        return generateVisualWithShoppingLinks(prompt, { domain });
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
      title="Visual Creator"
      subtitle={`Searching on: ${domain}`}
    />
  );
};
