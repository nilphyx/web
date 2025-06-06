'use client';

import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { CpuChipIcon, ServerStackIcon, ExternalLinkIcon } from '@/components/icons';
import { ComputeResource } from '@/lib/types';
import Link from 'next/link';

// Mock data for compute resources
const mockComputeResources: ComputeResource[] = [
  {
    id: 'gpu-a100-x1',
    name: 'NVIDIA A100 (Single GPU)',
    type: 'GPU',
    provider: 'Cloud Provider X',
    specs: '1x NVIDIA A100, 40GB HBM2, 8 vCPUs, 64GB RAM',
    availability: 'Available',
    accessLink: '#', // Placeholder - in real app, this would be a link to a provisioning service or docs
    hourlyRate: 1.50,
    region: 'us-east-1',
    description: 'High-performance GPU instance suitable for demanding deep learning training and inference tasks.'
  },
  {
    id: 'cpu-large-cluster',
    name: 'Large CPU Cluster',
    type: 'CPU',
    provider: 'On-Premise Cluster Y',
    specs: '64 Cores (Intel Xeon), 256GB RAM, Distributed Storage',
    availability: 'Limited',
    accessLink: '#',
    region: 'eu-west-1',
    description: 'Scalable CPU resources for data processing, traditional machine learning, and large-scale simulations.'
  },
  {
    id: 'tpu-v4-pod',
    name: 'Google TPU v4 Pod Slice',
    type: 'TPU',
    provider: 'Google Cloud',
    specs: 'TPU v4, High-Speed Interconnect',
    availability: 'Available',
    accessLink: '#',
    hourlyRate: 2.00, // Example rate
    region: 'us-central1',
    description: 'Access to Google\'s cutting-edge Tensor Processing Units, optimized for large-scale ML workloads on TensorFlow and JAX.'
  },
   {
    id: 'gpu-rtx4090-spot',
    name: 'NVIDIA RTX 4090 (Spot Instance)',
    type: 'GPU',
    provider: 'Cloud Provider Z',
    specs: '1x NVIDIA RTX 4090, 24GB GDDR6X, 6 vCPUs, 32GB RAM',
    availability: 'Available',
    accessLink: '#', 
    hourlyRate: 0.75,
    region: 'asia-south-1',
    description: 'Cost-effective spot instance with a powerful consumer GPU, good for experimentation and smaller training jobs.'
  },
];


export default function ComputePage() {
  const resources: ComputeResource[] = mockComputeResources;

  const getAvailabilityColor = (availability: ComputeResource['availability']) => {
    switch (availability) {
      case 'Available': return 'text-success bg-success/10';
      case 'Limited': return 'text-yellow-600 bg-yellow-500/10';
      case 'Unavailable': return 'text-danger bg-danger/10';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 animate-fadeIn">
      <section className="text-center mb-12">
        <ServerStackIcon className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-neutral-800 mb-3">Compute Resources</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Access and manage powerful computing infrastructure to accelerate your AI projects. Find the right resources for training, inference, and data processing.
        </p>
      </section>

      {/* TODO: Add filters for type, provider, region, availability */}
      {/* <div className="mb-8 p-4 bg-white shadow rounded-lg">
        Filter component placeholder
      </div> */}

      {resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <Card key={resource.id} className="flex flex-col transform hover:scale-105 transition-transform duration-300">
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                  <CpuChipIcon className={`w-10 h-10 mr-3 ${resource.type === 'GPU' ? 'text-green-500' : resource.type === 'TPU' ? 'text-blue-500' : 'text-orange-500'}`} />
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800">{resource.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getAvailabilityColor(resource.availability)}`}>
                      {resource.availability}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-neutral-600 mb-1"><span className="font-medium">Type:</span> {resource.type}</p>
                <p className="text-sm text-neutral-600 mb-1"><span className="font-medium">Provider:</span> {resource.provider}</p>
                <p className="text-sm text-neutral-600 mb-1"><span className="font-medium">Region:</span> {resource.region || 'N/A'}</p>
                <p className="text-sm text-neutral-600 mb-3"><span className="font-medium">Specs:</span> {resource.specs}</p>
                
                {resource.description && <p className="text-xs text-neutral-500 mb-4 flex-grow">{resource.description}</p>}

                {resource.hourlyRate !== undefined && (
                  <p className="text-lg font-semibold text-primary mb-4">${resource.hourlyRate.toFixed(2)}<span className="text-xs text-neutral-500">/hour (indicative)</span></p>
                )}
                
                <div className="mt-auto">
                  <Button 
                    variant="primary" 
                    fullWidth 
                    asChild={resource.accessLink !== '#'} // Use asChild if it's a real link
                    onClick={resource.accessLink === '#' ? () => alert('Access details coming soon!') : undefined}
                  >
                    {resource.accessLink !== '#' ? (
                      <a href={resource.accessLink} target="_blank" rel="noopener noreferrer">
                        Access Resource <ExternalLinkIcon className="w-4 h-4 ml-2 inline"/>
                      </a>
                    ) : (
                      "Access Resource"
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ServerStackIcon className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-neutral-700 mb-2">No Compute Resources Configured</h2>
          <p className="text-neutral-500">Please check back later or contact support for available compute options.</p>
        </div>
      )}

      <section className="mt-16 py-10 bg-neutral-50 rounded-lg text-center">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Need Custom Solutions?</h2>
        <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
          If you have specific requirements or need dedicated compute environments, please reach out to our support team.
        </p>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </section>
    </div>
  );
}