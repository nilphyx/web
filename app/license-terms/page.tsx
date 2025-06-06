import { ClipboardDocumentCheckIcon } from '@/components/icons';

export const metadata = {
  title: 'License Terms - AI Platform',
  description: 'Understand the licensing terms for using the AI Learning Platform, its content, data, and software.',
};

export default function LicenseTermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 animate-fadeIn">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-xl rounded-lg">
        <div className="text-center mb-10">
          <ClipboardDocumentCheckIcon className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">License Terms</h1>
          <p className="text-neutral-600 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose max-w-none text-neutral-700">
          <p>This document outlines the various licenses that govern your use of the AI Learning Platform ("Platform"), its content, any data provided or contributed, and any software or tools made available through the Platform.</p>

          <h2>1. Platform Usage License</h2>
          <p>Subject to your compliance with our Terms of Service and these License Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Platform for your personal, non-commercial educational purposes. For enterprise or commercial use, specific agreements may apply.</p>
          <p><strong>Restrictions:</strong> You may not (i) copy, modify, or create derivative works based on the Platform; (ii) distribute, transfer, sublicense, lease, lend, or rent the Platform to any third party; (iii) reverse engineer, decompile, or disassemble the Platform; or (iv) make the functionality of the Platform available to multiple users through any means except as expressly permitted.</p>

          <h2>2. Content License (Courses, Articles, etc.)</h2>
          <p>Educational content provided on the Platform, including course materials, articles, videos, and presentations ("Educational Content"), is typically provided for your personal educational use only.</p>
          <ul>
            <li>Unless otherwise specified (e.g., content marked with a Creative Commons license), you may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the Educational Content without our prior written consent or the consent of the respective rights holder.</li>
            <li>Some content may be offered under specific open licenses (e.g., Creative Commons). The terms of such licenses will be clearly indicated and will take precedence for that specific content.</li>
          </ul>

          <h2>3. Data License (Datasets in Data Center)</h2>
          <p>Datasets available in our Data Center are provided under various licenses, as specified for each individual dataset. It is your responsibility to review and comply with the license terms associated with any dataset you access, download, or use.</p>
          <ul>
            <li>Common licenses may include Creative Commons licenses (e.g., CC0, CC BY, CC BY-SA), Open Data Commons licenses (e.g., PDDL, ODbL), or custom licenses provided by the data contributor.</li>
            <li>When contributing data, you will be asked to specify a license under which your data will be shared. You must have the right to apply the chosen license to the data you contribute.</li>
            <li>The Platform itself does not claim ownership of user-contributed datasets but requires contributors to grant the Platform necessary rights to host and distribute the data according to the chosen license.</li>
          </ul>

          <h2>4. Software and Tools License</h2>
          <p>Any software, code snippets, libraries, or tools provided by the Platform ("Platform Software") are licensed to you, not sold. Unless accompanied by a separate license agreement, Platform Software is provided under a permissive open-source license (e.g., MIT, Apache 2.0) or a specific end-user license agreement (EULA).</p>
          <ul>
            <li>Details of the applicable license will be provided with the software or tool.</li>
            <li>You agree to comply with all terms and conditions of such licenses.</li>
          </ul>
          
          <h2>5. User-Generated Content License</h2>
          <p>By submitting, posting, or displaying content (e.g., forum posts, project submissions, comments) on or through the Platform ("User-Generated Content"), you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such User-Generated Content in any and all media or distribution methods now known or later developed for the purposes of operating, developing, providing, and improving the Platform and researching and developing new ones.</p>
          <p>You represent and warrant that you have, or have obtained, all rights, licenses, consents, permissions, power and/or authority necessary to grant the rights granted herein for any User-Generated Content that you submit.</p>

          <h2>6. Third-Party Materials</h2>
          <p>The Platform may contain links to third-party websites or resources, or incorporate third-party materials (including open-source software). Such third-party materials are subject to their own license terms. We are not responsible or liable for the availability or accuracy of such third-party resources, or the content, products, or services on or available from them.</p>
          
          <h2>7. Disclaimer</h2>
          <p>THE PLATFORM, EDUCATIONAL CONTENT, DATASETS, AND PLATFORM SOFTWARE ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE MAKE NO WARRANTY THAT THE PLATFORM OR ITS CONTENT WILL MEET YOUR REQUIREMENTS OR BE AVAILABLE ON AN UNINTERRUPTED, SECURE, OR ERROR-FREE BASIS.</p>

          <h2>8. Changes to License Terms</h2>
          <p>We reserve the right to modify these License Terms at any time. We will provide notice of any significant changes. Your continued use of the Platform after such changes constitutes your acceptance of the new License Terms.</p>

          <h2>9. Contact Information</h2>
          <p>If you have any questions about these License Terms, please <a href="/contact" className="text-primary hover:underline">contact us</a>.</p>
        </div>
      </div>
    </div>
  );
}