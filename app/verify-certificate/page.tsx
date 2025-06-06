'use client';

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Certificate } from '@/lib/types';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { IdentificationIcon, CheckCircleIcon, XCircleIcon, ShieldCheckIcon } from '@/components/icons'; // Assuming you have these
import Spinner from '@/components/Spinner';

export default function CertificateVerificationPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedCertificate, setVerifiedCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { verifyCertificateCode } = useAuth(); // Assuming this function exists in useAuth

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      setError('Please enter a verification code.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setVerifiedCertificate(null);

    // Simulate API call or direct lookup from useAuth
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    const certificate = verifyCertificateCode(verificationCode.trim());

    if (certificate) {
      setVerifiedCertificate(certificate);
    } else {
      setError('Invalid or expired verification code. Please check the code and try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-12 px-4 animate-fadeIn">
      <section className="text-center mb-12">
        <IdentificationIcon className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-neutral-800 mb-3">Verify Certificate</h1>
        <p className="text-lg text-neutral-600 max-w-xl mx-auto">
          Enter the unique verification code found on the certificate to confirm its authenticity.
        </p>
      </section>

      <div className="max-w-lg mx-auto bg-white p-8 shadow-xl rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="verification-code" className="block text-sm font-medium text-neutral-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              name="verification-code"
              id="verification-code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-lg"
              placeholder="Enter code (e.g., VERIFY-AI-USER-XYZ123)"
            />
          </div>
          <div>
            <Button type="submit" fullWidth variant="primary" size="lg" isLoading={isLoading} disabled={isLoading}>
              {isLoading ? 'Verifying...' : <>Verify Authenticity <ShieldCheckIcon className="w-5 h-5 ml-2 inline"/></>}
            </Button>
          </div>
        </form>
      </div>

      {error && (
        <div className="mt-8 max-w-lg mx-auto p-4 bg-danger/10 text-danger rounded-md text-center flex items-center justify-center">
          <XCircleIcon className="w-6 h-6 mr-2 flex-shrink-0" /> {error}
        </div>
      )}

      {verifiedCertificate && !error && (
        <div className="mt-10 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-neutral-800 text-center mb-6">Verification Successful!</h2>
            <Card className="bg-gradient-to-br from-green-50 via-white to-white shadow-2xl border border-green-200">
                <div className="p-6 md:p-8 text-center">
                    <CheckCircleIcon className="w-16 h-16 text-success mx-auto mb-5"/>
                    <h3 className="text-xl font-bold text-neutral-800 mb-1">{verifiedCertificate.userName}</h3>
                    <p className="text-neutral-600 mb-3">has successfully completed the course:</p>
                    <p className="text-2xl font-semibold text-primary mb-3">{verifiedCertificate.courseTitle}</p>
                    <div className="text-sm text-neutral-500 space-y-1">
                        <p><strong>Issued On:</strong> {new Date(verifiedCertificate.issueDate).toLocaleDateString()}</p>
                        <p><strong>Certificate ID:</strong> {verifiedCertificate.id}</p>
                        <p><strong>Verification Code:</strong> <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded">{verifiedCertificate.verificationCode}</span></p>
                    </div>
                     <div className="mt-6 border-t border-neutral-200 pt-4">
                        <p className="text-xs text-neutral-500">This certificate is authentic and was issued by the AI Learning Platform.</p>
                    </div>
                </div>
            </Card>
        </div>
      )}
    </div>
  );
}