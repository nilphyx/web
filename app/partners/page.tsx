import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { BriefcaseIcon, AcademicCapIcon, UsersIcon, ExternalLinkIcon } from '@/components/icons';
import { Partner } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Our Partners - AI Platform',
  description: 'Collaborating with leading organizations to advance AI education and innovation.',
};

const mockPartners: Partner[] = [
  {
    id: 'p1',
    name: 'Would you be the first univesity?',
    logoUrl: 'https://picsum.photos/seed/techu/200/100?grayscale', // Grayscale for a more uniform look
    websiteUrl: '#',
    type: 'Academic',
    description: 'A leading university in STEM research, collaborating on advanced AI curriculum and joint research projects.'
  },
  {
    id: 'p2',
    name: 'Nyphix First company partner? ',
    logoUrl: 'https://picsum.photos/seed/innovatecorp/200/100?grayscale',
    websiteUrl: '#',
    type: 'Industry',
    description: 'An industry pioneer in AI solutions, providing real-world case studies, datasets, and internship opportunities.'
  },
  {
    id: 'p3',
    name: 'We Support diverse communities. ',
    logoUrl: 'https://picsum.photos/seed/aicommunity/200/100?grayscale',
    websiteUrl: '#',
    type: 'Community',
    description: 'A global network of AI enthusiasts and practitioners, co-hosting workshops, hackathons, and knowledge-sharing events.'
  },
];

export default function PartnersPage() {
  const partnersByType = mockPartners.reduce((acc, partner) => {
    if (!acc[partner.type]) {
      acc[partner.type] = [];
    }
    acc[partner.type].push(partner);
    return acc;
  }, {} as Record<Partner['type'], Partner[]>);

  const typeIcons: Record<Partner['type'], React.ReactNode> = {
    Academic: <AcademicCapIcon className="w-8 h-8 text-primary mr-3" />,
    Industry: <BriefcaseIcon className="w-8 h-8 text-secondary mr-3" />,
    Community: <UsersIcon className="w-8 h-8 text-accent mr-3" />,
  };

  return (
    <div className="container mx-auto py-12 px-4 animate-fadeIn">
      <section className="text-center mb-16">
        <BriefcaseIcon className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Our Valued Partners</h1>
        <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto">
          We collaborate with a diverse range of organizations to enrich our platform and foster a thriving AI ecosystem.
        </p>
      </section>

      {(Object.keys(partnersByType) as Partner['type'][]).map((type) => (
        <section key={type} className="mb-16">
          <div className="flex items-center mb-8">
            {typeIcons[type]}
            <h2 className="text-3xl font-semibold text-neutral-800">{type} Partners</h2>
          </div>
          {partnersByType[type] && partnersByType[type].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnersByType[type].map((partner) => (
                <Card key={partner.id} className="flex flex-col transform hover:shadow-xl transition-shadow duration-300">
                  <div className="relative w-full h-32 mb-6 flex items-center justify-center bg-neutral-50 p-4 rounded-t-lg">
                    <Image src={partner.logoUrl} alt={`${partner.name} logo`} width={150} height={75} style={{objectFit: 'contain'}}/>
                  </div>
                  <div className="p-5 pt-0 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">{partner.name}</h3>
                    {partner.description && <p className="text-sm text-neutral-600 mb-4 flex-grow">{partner.description}</p>}
                    <div className="mt-auto">
                      <Button variant="outline" size="sm" fullWidth asChild>
                        <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLinkIcon className="w-4 h-4 ml-2 inline"/>
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">No {type.toLowerCase()} partners listed at this time.</p>
          )}
        </section>
      ))}

      <section className="mt-20 text-center bg-primary/10 py-12 rounded-lg">
        <h2 className="text-2xl font-semibold text-primary mb-4">Become a Partner</h2>
        <p className="text-neutral-700 mb-6 max-w-lg mx-auto">
          Interested in collaborating with us to shape the future of AI? We'd love to hear from you.
        </p>
        <Button variant="primary" size="lg" asChild>
          <Link href="/contact?subject=PartnershipInquiry">Partner With Us</Link>
        </Button>
      </section>
    </div>
  );
}