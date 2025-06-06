import { ShieldCheckIcon } from '@/components/icons';

export const metadata = {
  title: 'Privacy Policy - AI Platform',
  description: 'Understand how the AI Learning Platform collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4 animate-fadeIn">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-xl rounded-lg">
        <div className="text-center mb-10">
          <ShieldCheckIcon className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Privacy Policy</h1>
          <p className="text-neutral-600 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose max-w-none text-neutral-700">
          <p>Welcome to the AI Learning Platform ("Platform", "we", "us", "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

          <h2>1. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Platform includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and demographic information, that you voluntarily give to us when you register with the Platform or when you choose to participate in various activities related to the Platform, such as online chat and message boards.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Platform, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Platform.</li>
            <li><strong>Usage Data:</strong> Information about your interactions with the Platform, such as courses enrolled, lessons completed, quiz submissions, and contributions to the Data Center.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Platform to help customize the Platform and improve your experience.</li>
          </ul>

          <h2>2. Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Platform to:</p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Provide and improve our services, including courses, datasets, and compute resources.</li>
            <li>Personalize your experience on the Platform.</li>
            <li>Communicate with you about your account or our services.</li>
            <li>Monitor and analyze usage and trends to improve the Platform.</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          <ul>
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance. (Note: for Gemini API, Google's privacy policy applies to data processed by their models).</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
          </ul>
          
          <h2>4. Security of Your Information</h2>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

          <h2>5. Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. You may also have the right to opt-out of certain uses or disclosures of your information.</p>
          <ul>
            <li><strong>Account Information:</strong> You may at any time review or change the information in your account or terminate your account by logging into your account settings or contacting us.</li>
            <li><strong>Emails and Communications:</strong> If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by using the unsubscribe link in such communications or by contacting us.</li>
          </ul>
          
          <h2>6. Policy for Children</h2>
          <p>We do not knowingly solicit information from or market to children under the age of 13 (or other age as required by local law). If we learn that we have collected personal information from a child under such age without verification of parental consent, we will delete that information as quickly as possible. If you believe we might have any information from or about a child under the relevant age, please contact us.</p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h2>8. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <p>[Your Contact Email Address or Link to Contact Page, e.g., <a href="/contact" className="text-primary hover:underline">Contact Support</a>]</p>
          <p>[Your Organization Name and Address, if applicable]</p>
        </div>
      </div>
    </div>
  );
}