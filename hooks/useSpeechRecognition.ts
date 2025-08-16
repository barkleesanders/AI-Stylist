import { useState, useRef, useEffect, useCallback } from 'react';

// TypeScript interfaces for the Web Speech API to ensure type safety

// This is the interface for an instance of Speech Recognition.
interface SpeechRecognitionInstance {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    abort: () => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
}

// This is the interface for the constructor.
interface SpeechRecognitionStatic {
    new (): SpeechRecognitionInstance;
}

declare global {
    interface Window {
        SpeechRecognition: SpeechRecognitionStatic;
        webkitSpeechRecognition: SpeechRecognitionStatic;
    }
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognitionIsSupported = !!SpeechRecognition;

export const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

    useEffect(() => {
        if (!recognitionIsSupported) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            // Accumulate the transcript from all results to form a single, continuous paragraph
            const fullTranscript = Array.from(event.results)
                .map(result => result[0]) // Get the most likely transcription
                .map(result => result.transcript) // Get the text
                .join(''); // Join them together
            
            setTranscript(fullTranscript);
        };
        
        recognition.onend = () => {
            // The recognition service has stopped (e.g., due to silence or manual stop), so update our state.
            setIsListening(false);
        };
        
        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            recognitionRef.current?.abort();
        };
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            setTranscript('');
            recognitionRef.current.start();
            setIsListening(true);
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            // We can let the onend handler set isListening to false, 
            // but setting it here provides a more responsive UI when the user clicks the button.
            setIsListening(false);
        }
    }, [isListening]);

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        isSupported: recognitionIsSupported,
    };
};