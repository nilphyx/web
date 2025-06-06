'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatbotAssistant from './ChatbotAssistant';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <ChatbotAssistant />
    </>
  );
};

export { ClientLayout };
