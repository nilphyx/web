'use client';

import React, { useState, FormEvent } from 'react';
import ProtectedRouteClient from '@/components/ProtectedRouteClient';
import { Button } from '@/components/Button';
import { CloudArrowUpIcon, DocumentTextIcon, TagIcon } from '@/components/icons';
// import { useAuth } from '@/lib/hooks/useAuth'; // If needed for user info

export default function DatasetContributePage() {
  // const { user } = useAuth(); // Get user info if contribution is tied to user
  const [datasetName, setDatasetName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [documentationUrl, setDocumentationUrl] = useState('');
  const [license, setLicense] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Mock submission logic
    console.log('Submitting dataset:', {
      datasetName,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      file: file ? file.name : 'No file selected',
      documentationUrl,
      license,
      // contributor: user?.email // Example
    });

    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    // Example response
    const success = Math.random() > 0.2; // Simulate 80% success rate
    if (success) {
      setSubmissionStatus({ message: 'Dataset submitted successfully for review!', type: 'success' });
      // Reset form
      setDatasetName('');
      setDescription('');
      setTags('');
      setFile(null);
      setDocumentationUrl('');
      setLicense('');
      // Clear file input visually
      const fileInput = document.getElementById('dataset-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } else {
      setSubmissionStatus({ message: 'Failed to submit dataset. Please try again.', type: 'error' });
    }

    setIsSubmitting(false);
  };

  return (
    <ProtectedRouteClient>
      <div className="container mx-auto py-8 px-4 animate-fadeIn">
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 shadow-xl rounded-lg">
          <div className="text-center mb-8">
            <CloudArrowUpIcon className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Contribute a Dataset</h1>
            <p className="text-neutral-600">
              Share your data with the community and help advance AI research and development.
            </p>
          </div>

          {submissionStatus && (
            <div className={`p-4 mb-6 rounded-md text-sm ${submissionStatus.type === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
              {submissionStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="dataset-name" className="block text-sm font-medium text-neutral-700 mb-1">
                Dataset Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="dataset-name"
                id="dataset-name"
                required
                value={datasetName}
                onChange={(e) => setDatasetName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="e.g., Cat vs. Dog Images"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Provide a detailed description of the dataset, its contents, and potential uses."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 mb-1">
                Tags (comma-separated)
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TagIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="block w-full pl-10 px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="e.g., images, classification, animals"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dataset-file" className="block text-sm font-medium text-neutral-700 mb-1">
                Dataset File (or link to storage)
              </label>
              <input
                type="file"
                name="dataset-file"
                id="dataset-file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="mt-1 block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
              <p className="mt-1 text-xs text-neutral-500">Alternatively, provide a link in the documentation URL field if the dataset is large or hosted externally.</p>
            </div>
            
            <div>
              <label htmlFor="documentation-url" className="block text-sm font-medium text-neutral-700 mb-1">
                Documentation URL (Optional)
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DocumentTextIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                </div>
                <input
                    type="url"
                    name="documentation-url"
                    id="documentation-url"
                    value={documentationUrl}
                    onChange={(e) => setDocumentationUrl(e.target.value)}
                    className="block w-full pl-10 px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="https://example.com/dataset-docs"
                />
              </div>
            </div>

            <div>
              <label htmlFor="license" className="block text-sm font-medium text-neutral-700 mb-1">
                License (Optional)
              </label>
              <input
                type="text"
                name="license"
                id="license"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="e.g., CC BY-SA 4.0, MIT, Apache 2.0"
              />
            </div>


            <div className="pt-2">
              <Button type="submit" fullWidth variant="primary" size="lg" isLoading={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </Button>
            </div>
             <p className="text-xs text-neutral-500 text-center">
                By submitting, you confirm that you have the right to share this data and that it complies with our platform guidelines.
            </p>
          </form>
        </div>
      </div>
    </ProtectedRouteClient>
  );
}