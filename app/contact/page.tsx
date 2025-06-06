'use client';

import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/Button';
import { EnvelopeIcon, MapPinIcon, PhoneIcon, PaperAirplaneIcon } from '@/components/icons';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  // Pre-fill subject if provided in query params (e.g., from Partner With Us button)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const subjectParam = queryParams.get('subject');
      if (subjectParam) {
        setSubject(subjectParam);
      }
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Mock submission logic
    console.log('Contact form submitted:', { name, email, subject, message });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const success = Math.random() > 0.1; // Simulate 90% success
    if (success) {
      setSubmissionStatus({ message: 'Your message has been sent successfully! We will get back to you soon.', type: 'success' });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else {
      setSubmissionStatus({ message: 'There was an error sending your message. Please try again later.', type: 'error' });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto py-12 px-4 animate-fadeIn">
      <section className="text-center mb-16">
        <EnvelopeIcon className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Get In Touch</h1>
        <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or a partnership inquiry, please don't hesitate to reach out.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-white p-8 shadow-xl rounded-lg">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Send Us a Message</h2>
          {submissionStatus && (
            <div className={`p-3 mb-4 rounded-md text-sm ${submissionStatus.type === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
              {submissionStatus.message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
              <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2.5 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2.5 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
              <input type="text" name="subject" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required className="mt-1 block w-full px-3 py-2.5 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
              <textarea name="message" id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required className="mt-1 block w-full px-3 py-2.5 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
            </div>
            <div>
              <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : <>Send Message <PaperAirplaneIcon className="w-5 h-5 ml-2 inline" /></>}
              </Button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-neutral-50 p-8 shadow-xl rounded-lg">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-8">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <EnvelopeIcon className="w-7 h-7 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium text-neutral-700">Email Us</h3>
                <p className="text-neutral-600">For general inquiries, support, or feedback:</p>
                <a href="mailto:contact@aiplatform.example.com" className="text-primary hover:underline">contact@leximpact.lexrunit.com</a>
                <p className="text-neutral-600 mt-1">For partnership inquiries:</p>
                <a href="mailto:partners@aiplatform.example.com" className="text-primary hover:underline">partners@leximpact.lexrunit.com</a>
              </div>
            </div>
            <div className="flex items-start">
              <PhoneIcon className="w-7 h-7 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium text-neutral-700">WhatsApp Message Us (Mon-Fri, 9am-5pm)</h3>
                <p className="text-neutral-600">+234 (0) 806-386-2295 (Support)</p>
                <p className="text-neutral-600">+234 (0) 807-7264-4273 (Sales/Partnerships)</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPinIcon className="w-7 h-7 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium text-neutral-700">Our Office</h3>
                <p className="text-neutral-600">C7, Lion Science Park</p>
                <p className="text-neutral-600">University of Nigeria</p>
                <p className="text-neutral-600">Nsukka, Enugu State, Nigeria</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 border-t border-neutral-200 pt-6">
            <h3 className="text-lg font-medium text-neutral-700 mb-3">Connect on Social Media</h3>
             <p className="text-sm text-neutral-600 mb-3">Follow us for updates, news, and community highlights (Links are placeholders).</p>
            <div className="flex space-x-4">
              {/* Add social media icons/links here if needed */}
              <a href="#" className="text-neutral-500 hover:text-primary">Twitter</a>
              <a href="https://linkedin.com/showcase/leximpactafrica" className="text-neutral-500 hover:text-primary">LinkedIn</a>
              <a href="#" className="text-neutral-500 hover:text-primary">Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}