
import React, { useState, useRef, useEffect } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { MicrophoneIcon } from './icons/MicrophoneIcon';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
    onSendMessage, 
    isLoading
}) => {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition();
  
  useEffect(() => {
    if (transcript) {
        setInputText(transcript);
    }
  }, [transcript]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
      if (isListening) {
        stopListening();
      }
    }
  };

  const handleMicClick = () => {
    if (isListening) {
        stopListening();
    } else {
        setInputText('');
        startListening();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }
  }, [inputText]);

  return (
    <div className="flex items-start space-x-2 sm:space-x-4">
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type or speak your request here..."
        className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition disabled:bg-gray-200 resize-none max-h-48 bg-white text-gray-900"
        rows={1}
        disabled={isLoading}
      />
      <div className="flex flex-col space-y-2">
        <button
          onClick={handleSend}
          disabled={isLoading || !inputText.trim()}
          className="bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base h-full"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
       {isSupported && (
          <button
            onClick={handleMicClick}
            disabled={isLoading}
            className={`p-3 rounded-lg transition-colors duration-200 self-start ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
          >
            <MicrophoneIcon />
          </button>
        )}
    </div>
  );
};
