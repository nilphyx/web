import Link from 'next/link';
import { datasets as allDatasetsData } from '@/lib/data/datasets';
import { Dataset } from '@/lib/types';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { BuildingLibraryIcon, TagIcon, CloudArrowUpIcon, DocumentTextIcon, LinkIcon as ExternalLinkIcon } from '@/components/icons';
import Image from 'next/image';

export const metadata = {
  title: 'Data Center - Browse Datasets',
  description: 'Explore and access a wide variety of datasets for your AI and Machine Learning projects.',
};

export default async function DatasetListPage() {
  const datasets: Dataset[] = allDatasetsData;

  return (
    <div className="container mx-auto py-8 px-4 animate-fadeIn">
      <section className="text-center mb-12">
        <BuildingLibraryIcon className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-neutral-800 mb-3">Data Center</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Discover, access, and contribute datasets. Fuel your AI projects with high-quality data from our collaborative repository.
        </p>
        <div className="mt-6">
            <Button size="lg" variant="primary" asChild>
                <Link href="/datacenter/contribute">Contribute a Dataset</Link>
            </Button>
        </div>
      </section>

      {/* TODO: Add search and filter functionality here */}
      {/* <div className="mb-8 p-4 bg-white shadow rounded-lg">
        Search/Filter component placeholder for datasets
      </div> */}

      {datasets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {datasets.map((dataset) => (
            <Card key={dataset.id} className="flex flex-col transform hover:scale-105 transition-transform duration-300">
              {dataset.imageUrl && (
                // Using Next/Link for navigation, Card itself won't navigate by default
                // <Link href={`/datacenter/${dataset.id}`}>  // Link to detail page if it exists
                  <div className="relative w-full h-56">
                     <Image 
                        src={dataset.imageUrl} 
                        alt={dataset.name} 
                        fill
                        style={{objectFit: 'cover'}}
                        className="rounded-t-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                  </div>
                // </Link>
              )}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2 hover:text-primary transition-colors">
                  {/* <Link href={`/datacenter/${dataset.id}`}>{dataset.name}</Link> */}
                  {dataset.name} {/* No detail page for now */}
                </h3>
                <p className="text-sm text-neutral-600 mb-3 flex-grow">{dataset.description}</p>
                <div className="text-xs text-neutral-500 mb-1">
                  Contributor: {dataset.contributor}
                </div>
                <div className="text-xs text-neutral-500 mb-3">
                  Format: {dataset.format} &bull; Size: {dataset.size}
                </div>
                 <div className="mb-4 flex flex-wrap gap-1">
                  {dataset.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full flex items-center">
                      <TagIcon className="w-3 h-3 mr-1" /> {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto space-y-2">
                  {dataset.downloadUrl && dataset.downloadUrl !== '#' && (
                    <Button variant="primary" size="sm" fullWidth asChild>
                        <a href={dataset.downloadUrl} target="_blank" rel="noopener noreferrer" download>
                            <CloudArrowUpIcon className="w-4 h-4 mr-2"/> Download
                        </a>
                    </Button>
                  )}
                  {dataset.documentationUrl && dataset.documentationUrl !== '#' && (
                     <Button variant="outline" size="sm" fullWidth asChild>
                        <a href={dataset.documentationUrl} target="_blank" rel="noopener noreferrer">
                           <DocumentTextIcon className="w-4 h-4 mr-2"/> Documentation
                        </a>
                    </Button>
                  )}
                   {/* No dataset detail page for now, so this button is commented out or could link to docs */}
                  {/* <Button variant="ghost" size="sm" fullWidth asChild>
                    <Link href={`/datacenter/${dataset.id}`}>View Details</Link>
                  </Button> */}
                </div>
                {dataset.license && (
                    <p className="text-xs text-neutral-400 mt-3 text-center">License: {dataset.license}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BuildingLibraryIcon className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-neutral-700 mb-2">No Datasets Available</h2>
          <p className="text-neutral-500">Check back soon or contribute your own dataset!</p>
        </div>
      )}
    </div>
  );
}