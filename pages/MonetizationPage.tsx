import React from 'react';
import { generateMonetizationStrategy } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MONETIZATION_PROMPT } from '../constants';
import { ChatContainer } from '../components/ChatContainer';
import { useChat } from '../hooks/useChat';

const initialMessage: ChatMessage = {
  id: 'init',
  role: 'model',
  text: `Welcome! Tell me about your business idea, and I'll generate monetization strategies.`
};

export const MonetizationPage: React.FC = () => {
  const {
    messages,
    isLoading,
    handleSendMessage,
  } = useChat({
    initialMessages: [initialMessage],
    generationFn: (userRequest: string) => {
        const fullPrompt = MONETIZATION_PROMPT + `\n\n**Business Context:**\n${userRequest}`;
        return generateMonetizationStrategy(fullPrompt);
    },
  });

  return (
    <ChatContainer
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
      title="Monetization Strategy"
      subtitle="Develop and refine monetization models."
    />
  );
};
