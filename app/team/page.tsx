import { Card } from '@/components/Card';
import { UserGroupIcon, LinkedinIcon, TwitterIcon, GithubIcon } from '@/components/icons';
import { TeamMember } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/Button'; // Added Button import
import Link from 'next/link'; // Added Link import

export const metadata = {
  title: 'Our Team - AI Platform',
  description: 'Meet the dedicated team behind the AI Learning Platform.',
};

// Mock data for team members
const mockTeamMembers: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Dr. Evelyn Reed',
    role: 'Founder & Lead AI Strategist',
    imageUrl: 'https://picsum.photos/seed/evelyn/300/300',
    bio: 'Evelyn is a visionary in AI with over 15 years of experience in research and application. She drives the educational and technological direction of the platform.',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: 'tm2',
    name: 'Marcus Chen',
    role: 'Head of Engineering',
    imageUrl: 'https://picsum.photos/seed/marcus/300/300',
    bio: 'Marcus leads our talented engineering team, ensuring the platform is robust, scalable, and user-friendly. He is passionate about open-source and collaborative development.',
    socials: { linkedin: '#', github: '#' }
  },
  {
    id: 'tm3',
    name: 'Aisha Khan',
    role: 'Lead Curriculum Developer',
    imageUrl: 'https://picsum.photos/seed/aisha/300/300',
    bio: 'Aisha designs and curates our cutting-edge AI courses. She is an experienced educator dedicated to making complex topics accessible and engaging.',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: 'tm4',
    name: 'Ben Carter',
    role: 'Community & Growth Manager',
    imageUrl: 'https://picsum.photos/seed/ben/300/300',
    bio: 'Ben is focused on building a vibrant and supportive community around the platform. He connects users, fosters collaboration, and gathers feedback for continuous improvement.',
    socials: { linkedin: '#', twitter: '#' }
  },
];

export default function TeamPage() {
  const teamMembers: TeamMember[] = mockTeamMembers;

  return (
    <div className="container mx-auto py-12 px-4 animate-fadeIn">
      <section className="text-center mb-16">
        <UserGroupIcon className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Meet Our Team</h1>
        <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto">
          We are a passionate group of educators, engineers, and AI enthusiasts committed to building the future of AI learning.
        </p>
      </section>

      {teamMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center transform hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-neutral-200 group-hover:border-primary transition-colors">
                <Image src={member.imageUrl} alt={member.name} layout="fill" objectFit="cover" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
              {member.bio && <p className="text-xs text-neutral-600 mb-4 px-2 leading-relaxed">{member.bio}</p>}
              
              {member.socials && (
                <div className="flex justify-center space-x-3 mt-auto pt-3 border-t border-neutral-100">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-primary transition-colors">
                      <LinkedinIcon className="w-5 h-5" /> <span className="sr-only">LinkedIn</span>
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-primary transition-colors">
                      <TwitterIcon className="w-5 h-5" /> <span className="sr-only">Twitter</span>
                    </a>
                  )}
                  {member.socials.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-primary transition-colors">
                      <GithubIcon className="w-5 h-5" /> <span className="sr-only">GitHub</span>
                    </a>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-500">Team information is currently unavailable.</p>
      )}
      
      <section className="mt-20 text-center bg-neutral-50 py-12 rounded-lg">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Interested in Joining Us?</h2>
        <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
          We are always looking for talented individuals passionate about AI and education. Check our careers page for open positions.
        </p>
        <Button variant="primary" asChild>
          <Link href="/careers">View Careers (Coming Soon)</Link>
        </Button>
      </section>
    </div>
  );
}