import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { DocumentTextIcon, LightBulbIcon, BookOpenIcon, LinkIcon as ExternalLinkIcon, QuestionMarkCircleIcon } from '@/components/icons'; // Renamed LinkIcon to avoid conflict

export const metadata = {
  title: 'Resources - AI Platform',
  description: 'Find helpful resources, documentation, tutorials, and tools to support your AI journey on our platform.',
};

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'Documentation' | 'Tutorial' | 'Tool' | 'Whitepaper' | 'FAQ';
  icon: React.ReactNode;
  link: string;
  isExternal?: boolean;
}

const mockResources: ResourceItem[] = [
  {
    id: 'doc-getting-started',
    title: 'Getting Started Guide',
    description: 'A comprehensive guide to help you navigate the AI Platform, set up your account, and start your first project.',
    category: 'Documentation',
    icon: <BookOpenIcon className="w-10 h-10 text-primary" />,
    link: '/docs/getting-started', // Placeholder for internal link
  },
  {
    id: 'tut-image-classification',
    title: 'Tutorial: Image Classification with Python',
    description: 'Learn how to build and train an image classification model using popular Python libraries and datasets from our platform.',
    category: 'Tutorial',
    icon: <LightBulbIcon className="w-10 h-10 text-secondary" />,
    link: '/tutorials/image-classification', // Placeholder
  },
  {
    id: 'tool-api-sdk',
    title: 'Platform API & SDKs',
    description: 'Access our platform programmatically. Explore API documentation and download SDKs for Python, JavaScript, and more.',
    category: 'Tool',
    icon: <DocumentTextIcon className="w-10 h-10 text-accent" />,
    link: '/docs/api', // Placeholder
  },
  {
    id: 'paper-future-of-ai',
    title: 'Whitepaper: The Future of AI in Education',
    description: 'Read our insights on how AI is transforming learning and development, and the role our platform plays in this evolution.',
    category: 'Whitepaper',
    icon: <BookOpenIcon className="w-10 h-10 text-indigo-500" />,
    link: '/whitepapers/future-of-ai.pdf', // Placeholder, could be external
    isExternal: true,
  },
  {
    id: 'res-faqs',
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about our platform, courses, data policies, and technical support.',
    category: 'FAQ',
    icon: <QuestionMarkCircleIcon className="w-10 h-10 text-red-500" />,
    link: '/faqs',
  },
  {
    id: 'tool-data-explorer',
    title: 'Data Explorer Tool (Beta)',
    description: 'An interactive tool to visualize and explore datasets available in our Data Center before downloading.',
    category: 'Tool',
    icon: <LightBulbIcon className="w-10 h-10 text-teal-500" />,
    link: '/tools/data-explorer', // Placeholder
  },
];


export default function ResourcesPage() {
  const resources: ResourceItem[] = mockResources;

  return (
    <div className="container mx-auto py-12 px-4 animate-fadeIn">
      <section className="text-center mb-16">
        <BookOpenIcon className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Resources Hub</h1>
        <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto">
          Your central place for documentation, tutorials, tools, and helpful guides to make the most of our AI Platform.
        </p>
      </section>

      {/* TODO: Add search and filter by category */}
      {/* <div className="mb-10 p-4 bg-white shadow rounded-lg">
        Resource Search/Filter component placeholder
      </div> */}

      {resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <Card key={resource.id} className="flex flex-col text-center items-center transform hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="mb-4">{resource.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">{resource.title}</h3>
                <p className="text-sm text-neutral-600 mb-4 flex-grow">{resource.description}</p>
                 <span className="inline-block bg-neutral-100 text-neutral-600 text-xs font-medium px-2.5 py-0.5 rounded-full mb-4">
                    {resource.category}
                  </span>
              </div>
              <div className="p-6 pt-0 mt-auto w-full">
                <Button variant="primary" fullWidth asChild>
                  <Link href={resource.link} target={resource.isExternal ? '_blank' : '_self'} rel={resource.isExternal ? 'noopener noreferrer' : ''}>
                    Access Resource {resource.isExternal && <ExternalLinkIcon className="w-4 h-4 ml-1.5 inline" />}
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-500">No resources available at this time.</p>
      )}

      <section className="mt-20 text-center bg-neutral-50 py-12 rounded-lg">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Can't Find What You're Looking For?</h2>
        <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
          Our support team and community forums are great places to seek help or suggest new resources.
        </p>
        <div className="space-x-0 md:space-x-4 space-y-3 md:space-y-0">
            <Button variant="outline" asChild>
            <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="secondary" asChild>
            <Link href="/community">Visit Community Forums</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}