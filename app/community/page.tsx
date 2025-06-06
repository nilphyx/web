import Link from 'next/link';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { UsersIcon, ChatBubbleLeftRightIcon, CalendarDaysIcon, LightBulbIcon, ShareIcon } from '@/components/icons';
import Image from 'next/image';

export const metadata = {
  title: 'Community Hub - AI Platform',
  description: 'Connect with fellow AI enthusiasts, share knowledge, and collaborate on projects in our vibrant community.',
};

export default function CommunityPage() {
  const communityFeatures = [
    {
      icon: <ChatBubbleLeftRightIcon className="w-12 h-12 text-primary mb-4" />,
      title: 'Discussion Forums',
      description: 'Engage in conversations, ask questions, and share your insights on various AI topics with peers and experts.',
      link: '/forums', // Placeholder link
      linkText: 'Join Discussions (Coming Soon)',
    },
    {
      icon: <CalendarDaysIcon className="w-12 h-12 text-secondary mb-4" />,
      title: 'Events & Webinars',
      description: 'Participate in live workshops, webinars, and Q&A sessions hosted by industry leaders and our experienced instructors.',
      link: '/events', // Placeholder link
      linkText: 'View Upcoming Events (Coming Soon)',
    },
    {
      icon: <LightBulbIcon className="w-12 h-12 text-accent mb-4" />,
      title: 'Projects Showcase',
      description: 'Share your AI projects, get feedback, and discover inspiring work from other community members.',
      link: '/projects', // Placeholder link
      linkText: 'Explore Projects (Coming Soon)',
    },
    {
      icon: <ShareIcon className="w-12 h-12 text-red-500 mb-4" />,
      title: 'Contribute & Collaborate',
      description: 'Contribute datasets, share code snippets, or collaborate on open-source AI initiatives. Make an impact together.',
      link: '/contribute', // Placeholder link (could link to datacenter/contribute or a specific collab page)
      linkText: 'Learn How to Contribute',
    },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto text-center">
          <UsersIcon className="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Welcome to Our AI Community!
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 mb-10 max-w-3xl mx-auto">
            Connect, learn, and grow with a global network of AI learners, practitioners, and innovators.
            This is your space to share knowledge, collaborate on projects, and shape the future of AI together.
          </p>
          <Button size="lg" variant="primary" asChild>
            <Link href="/signup">Join the Community</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-neutral-800 text-center mb-12">
            What Our Community Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityFeatures.map((feature) => (
              <Card key={feature.title} className="text-center flex flex-col items-center transform hover:shadow-lg transition-shadow duration-300 p-6">
                {feature.icon}
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">{feature.title}</h3>
                <p className="text-neutral-600 text-sm mb-4 flex-grow">{feature.description}</p>
                <Button variant="ghost" asChild>
                  <Link href={feature.link}>{feature.linkText}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Community Guidelines Snippet */}
       <section className="py-16">
        <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-neutral-800 mb-6">Community Guidelines</h2>
            <Image src="https://picsum.photos/seed/communityrules/800/300" alt="Diverse group collaborating" width={800} height={300} className="rounded-lg shadow-md mx-auto mb-6 object-cover" />
            <p className="text-neutral-700 mb-4">
                Our community thrives on respect, collaboration, and constructive dialogue. We encourage members to:
            </p>
            <ul className="list-disc list-inside text-left mx-auto max-w-md text-neutral-600 space-y-1 mb-8">
                <li>Be respectful and considerate of others.</li>
                <li>Share knowledge generously and ask thoughtful questions.</li>
                <li>Provide constructive feedback.</li>
                <li>Stay on topic in relevant forums and discussions.</li>
                <li>Report any inappropriate behavior or content.</li>
            </ul>
            <Button variant="outline" asChild>
                <Link href="/community-guidelines">Read Full Guidelines (Coming Soon)</Link>
            </Button>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Ready to Make Your Mark?
          </h2>
          <p className="mb-8 max-w-xl mx-auto">
            Whether you're here to learn, share, or build, your contributions make our community stronger.
            Start exploring, engage in discussions, and let's innovate together!
          </p>
          <div className="space-x-4">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-neutral-100 border-white hover:border-neutral-100" asChild>
              <Link href="/forums">Explore Forums (Coming Soon)</Link>
            </Button>
             <Button size="lg" variant="secondary" asChild>
              <Link href="/events">Find an Event (Coming Soon)</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}