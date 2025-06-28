'use client';

import React, { useState } from 'react';
import { QuestionMarkCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@/components/icons';
import { FaqItem } from '@/lib/types';
import { Button } from '@/components/Button';
import Link from 'next/link';

const mockFaqs: FaqItem[] = [
  {
    id: 'faq1',
    question: 'What is the AI Learning Platform?',
    answer: 'The AI Learning Platform is a comprehensive ecosystem designed to provide education, resources, and tools for individuals and organizations interested in Artificial Intelligence. It includes an AI Academy for courses, a Data Center for datasets, and access to Compute Resources for model training.'
  },
  {
    id: 'faq2',
    question: 'Who can use this platform?',
    answer: 'Our platform is designed for a wide range of users, including students, developers, researchers, data scientists, and AI enthusiasts of all skill levels, from beginners to advanced practitioners.'
  },
  {
    id: 'faq3',
    question: 'How do I enroll in a course?',
    answer: 'To enroll in a course, simply navigate to the AI Academy, browse the available courses, and click the "Enroll Now" button on the course details page. You may need to create an account or log in first.'
  },
  {
    id: 'faq4',
    question: 'Are there any prerequisites for the courses?',
    answer: 'Some advanced courses may have prerequisites, which will be clearly listed on the course description page. Many introductory courses have no prerequisites and are suitable for beginners.'
  },
  {
    id: 'faq5',
    question: 'Can I contribute datasets to the Data Center?',
    answer: 'Yes! We encourage community contributions. You can submit your datasets through the "Contribute Data" section in the Data Center. All submissions are subject to review to ensure quality and relevance.'
  },
  {
    id: 'faq6',
    question: 'How do I access compute resources?',
    answer: 'Information about available compute resources and how to access them can be found in the "Compute" section. This may involve linking to cloud provider services or internal cluster access, depending on the resource.'
  },
  {
    id: 'faq7',
    question: 'Is there a fee to use the platform?',
    answer: 'Basic account creation and access to some resources may be free. Specific courses, datasets, or compute resources might have associated costs or subscription plans. Please check individual item details for pricing information.'
  }
];


interface AccordionItemProps {
  faq: FaqItem;
  isOpen: boolean;
  toggleOpen: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ faq, isOpen, toggleOpen }) => {
  return (
    <div className="bg-background border-b border-neutral-200 last:border-b-0">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 px-2 text-left font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75 transition-colors"
          onClick={toggleOpen}
          aria-expanded={isOpen}
          aria-controls={`faq-content-${faq.id}`}
        >
          <span className="text-lg">{faq.question}</span>
          {isOpen ? <ChevronUpIcon className="w-6 h-6 text-primary" /> : <ChevronDownIcon className="w-6 h-6 text-neutral-500" />}
        </button>
      </h2>
      {isOpen && (
        <div
          id={`faq-content-${faq.id}`}
          className="py-5 px-3 text-neutral-600 leading-relaxed bg-white" // Changed from bg-neutral-50/50
        >
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};


export default function FaqsPage() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const faqs: FaqItem[] = mockFaqs;

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };
  
  // Client components cannot export metadata directly. It should be in layout or page server components.
  // For a client page like this, if you need dynamic titles, use `document.title` in useEffect.

  return (
    <div className="container mx-auto py-12 px-4 animate-fadeIn">
      <section className="text-center mb-16">
        <QuestionMarkCircleIcon className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto">
          Have questions? We've got answers! If you don't find what you're looking for, feel free to contact us.
        </p>
      </section>

      {faqs.length > 0 ? (
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openFaqId === faq.id}
              toggleOpen={() => toggleFaq(faq.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-500">No FAQs available at this time.</p>
      )}

      <section className="mt-20 text-center">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Still Have Questions?</h2>
        <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
          Our support team is ready to assist you. Get in touch with us for any further inquiries.
        </p>
        <Button variant="primary" size="lg" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </section>
    </div>
  );
}