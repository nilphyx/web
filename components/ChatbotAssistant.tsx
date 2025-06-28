'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse, Part, Content } from '@google/genai';
import { Button } from './Button';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon, XMarkIcon, SparklesIcon, MinusIcon, ShieldCheckIcon } from '@/components/icons';
import type { ChatMessage, GroundingChunk } from '@/lib/types';
import Spinner from './Spinner';

const ChatbotAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY; // Fallback, NEXT_PUBLIC_ is for client exposure
    if (key) {
      setApiKey(key);
      try {
        const ai = new GoogleGenAI({ apiKey: key });
        const newChat = ai.chats.create({
          model: 'gemini-2.0-flash-lite', 
           config: {
            systemInstruction: "You are a helpful AI assistant for a learning platform, Nilphyx Africa. Be concise and friendly. If asked about current events or specific real-time data, mention that you can try to find information using Google Search if appropriate for the query, but results might not always be up-to-date.",
            // thinkingConfig: { thinkingBudget: 0 } // Example: disable thinking for lower latency
          },
        });
        setChat(newChat);
        setMessages([{ id: 'system-init', role: 'system', text: 'Hello! How can I help you today?', timestamp: Date.now() }]);
      } catch (e: any) {
        console.error("Failed to initialize Nilphyx chat:", e);
        setError(`Failed to initialize AI: ${e.message}. Ensure API key is configured.`);
        setMessages([{ id: 'error-init', role: 'error', text: `Error: ${e.message}`, timestamp: Date.now() }]);
      }
    } else {
      const errorMsg = "Not configured. Chatbot functionality is disabled.";
      setError(errorMsg);
      console.error(errorMsg);
      setMessages([{ id: 'error-config', role: 'error', text: errorMsg, timestamp: Date.now() }]);
    }
  }, []);


  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !chat || isLoading || !apiKey) return;

    const userInput: ChatMessage = { id: `user-${Date.now()}`, role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userInput]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Check if the query might benefit from search grounding
      const requiresSearch = /who won|latest news|current price|recent events/i.test(userInput.text);
      
      const stream = await chat.sendMessageStream({
        message: userInput.text,
        // Conditionally add tools for search grounding
        ...(requiresSearch && { config: { tools: [{ googleSearch: {} }] } })
      });

      let currentModelResponse: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: '',
        timestamp: Date.now(),
        sources: []
      };
      setMessages(prev => [...prev, currentModelResponse]);

      for await (const chunk of stream) { // chunk is GenerateContentResponse
        const chunkText = chunk.text;
        const chunkSources = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [];

        currentModelResponse.text += chunkText;
        if (chunkSources.length > 0) {
            currentModelResponse.sources = [...(currentModelResponse.sources || []), ...chunkSources];
        }

        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === currentModelResponse.id ? { ...currentModelResponse } : msg
          )
        );
      }
    } catch (err: any) {
      console.error('Gemini API error:', err);
      const errorMsg = `Sorry, I encountered an error: ${err.message || 'Please try again.'}`;
      setError(errorMsg);
      setMessages(prev => [...prev, { id: `error-${Date.now()}`, role: 'error', text: errorMsg, timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent event bubbling if inside other clickable elements
    setIsOpen(!isOpen);
    if (isOpen) setIsMinimized(true); // If closing, also minimize
    else setIsMinimized(false); // If opening, ensure it's not minimized
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) setIsOpen(true); // If un-minimizing, ensure it's open
  };


  if (!apiKey && !error) { // Still waiting for API key check or initial setup
      return (
        <button
            onClick={() => {setIsOpen(true); setIsMinimized(false);}}
            className="fixed bottom-5 right-5 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50"
            aria-label="Open Chatbot"
        >
            <ChatBubbleLeftRightIcon className="w-7 h-7" />
        </button>
      );
  }


  return (
    <div id="chatbot-assistant-container" className="fixed bottom-5 right-5 z-50 notranslate">
      {(!isOpen || isMinimized) && (
        <button
          onClick={isMinimized ? toggleMinimize : toggleOpen}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={isMinimized ? "Expand Chatbot" : "Open Chatbot"}
        >
          <ChatBubbleLeftRightIcon className="w-7 h-7" />
        </button>
      )}

      {isOpen && !isMinimized && (
        <div className="w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col border border-neutral-300 animate-slideInUp">
          {/* Header */}
          <div className="bg-primary text-white p-3 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center">
              <img src="/logo.png" alt="Nylphics Logo" className="w-6 h-6 mr-2" />
              <h3 className="font-semibold text-lg">Nilphyx Bot</h3>
            </div>
            <div>
              <button onClick={toggleMinimize} className="text-white hover:bg-primary-dark/50 p-1 rounded-full mr-1" aria-label="Minimize chat">
                <MinusIcon className="w-5 h-5" />
              </button>
              <button onClick={toggleOpen} className="text-white hover:bg-primary-dark/50 p-1 rounded-full" aria-label="Close chat">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto bg-neutral-50 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-xl shadow ${
                    msg.role === 'user' ? 'bg-primary text-white rounded-br-none' :
                    msg.role === 'model' ? 'bg-neutral-200 text-neutral-800 rounded-bl-none' :
                    msg.role === 'system' ? 'bg-secondary/20 text-neutral-700 text-sm italic text-center w-full' :
                    'bg-danger/20 text-danger text-sm italic text-center w-full'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words text-sm">{msg.text}</p>
                  {msg.role === 'model' && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-neutral-300">
                      <p className="text-xs font-semibold text-neutral-600 mb-1">Sources:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {msg.sources.map((source, index) => (
                          <li key={index} className="text-xs">
                            {source.web && <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block">{source.web.title || source.web.uri}</a>}
                            {source.retrievedContext && <span className="text-neutral-500 truncate block">{source.retrievedContext.title || source.retrievedContext.uri}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length -1]?.role !== 'model' && ( // Show spinner if last message isn't an empty model bubble
                <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg shadow bg-neutral-200 text-neutral-800 rounded-bl-none">
                        <Spinner size="sm" color="text-primary" />
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {error && !apiKey && (
             <div className="p-3 text-center text-sm text-danger bg-danger/10">
                {error} AI features are limited. Please contact support.
             </div>
          )}


          {/* Input Area */}
          {apiKey && (
            <form onSubmit={handleSubmit} className="p-3 border-t border-neutral-200 bg-white rounded-b-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-grow p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                  disabled={isLoading || !chat}
                  onKeyPress={(e) => { if(e.key === 'Enter' && !e.shiftKey) handleSubmit(); }}
                />
                <Button type="submit" variant="primary" size="md" disabled={isLoading || !input.trim() || !chat} aria-label="Send message">
                  {isLoading ? <Spinner size="sm" color="text-white"/> : <PaperAirplaneIcon className="w-5 h-5" />}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatbotAssistant;
