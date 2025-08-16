import React from 'react';
import { generateEducationalContent } from '../services/geminiService';
import { ChatMessage } from '../types';
import { EDUCATIONAL_CONTENT_PROMPT } from '../constants';
import { ChatContainer } from '../components/ChatContainer';
import { useChat } from '../hooks/useChat';

const initialMessage: ChatMessage = {
  id: 'init',
  role: 'model',
  text: `Welcome! What topic would you like to write about? Tell me your idea, and I'll generate a full article.`
};

export const ContentCreatorPage: React.FC = () => {
    const {
    messages,
    isLoading,
    handleSendMessage,
  } = useChat({
    initialMessages: [initialMessage],
    generationFn: (userRequest: string) => {
        const fullPrompt = EDUCATIONAL_CONTENT_PROMPT + `\n\n**Article Focus:**\n${userRequest}`;
        return generateEducationalContent(fullPrompt);
    }
  });

  return (
    <ChatContainer
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
      title="Content Creator"
      subtitle="Generate and refine articles on sustainable fashion."
    />
  );
};
