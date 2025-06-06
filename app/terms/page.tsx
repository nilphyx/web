import { DocumentTextIcon } from '@/components/icons';

export const metadata = {
  title: 'Terms of Service - AI Platform',
  description: 'Read the Terms of Service for using the AI Learning Platform.',
};

export default function TermsPage() {
  return (
    <section className="container mx-auto py-12 px-4 animate-fadeIn">
      <section className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-xl rounded-lg">
        <section className="text-center mb-10">
          <DocumentTextIcon className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Terms of Service</h1>
          <p className="text-neutral-600 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
        </section>

        <section className="prose max-w-none text-neutral-700">
          <p>Welcome to the AI Learning Platform ("Platform", "we", "us", "our"). By accessing or using our Platform, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By creating an account, accessing courses, using datasets, or any other services provided by the Platform, you signify your agreement to these Terms. If you do not agree to these Terms, you may not use the Platform.</p>

          <h2>2. User Accounts</h2>
          <p>You may need to register for an account to access certain features. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>

          <h2>3. Use of the Platform</h2>
          <ul>
            <li>You agree to use the Platform only for lawful purposes and in accordance with these Terms.</li>
            <li>You will not use the Platform in any way that could damage, disable, overburden, or impair it.</li>
            <li>You are responsible for any content you submit or share on the Platform.</li>
            <li>Harassment, abuse, or any form of harmful conduct towards other users or staff is strictly prohibited.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>The Platform and its original content (excluding user-generated content), features, and functionality are and will remain the exclusive property of the AI Learning Platform and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the AI Learning Platform.</p>
        </section>
      </section>
    </section>
  );
}