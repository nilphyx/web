import { SparklesIcon, UsersIcon, LightBulbIcon, AcademicCapIcon } from '@/components/icons'; // Added AcademicCapIcon
import Image from 'next/image';

export const metadata = {
  title: 'About Us - LexImpact Africa',
  description: "Learn more about our mission, vision, and the team behind LexImpact Africa(Let's Impact Africa).",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 animate-fadeIn">
      <section className="text-center mb-16">
        <Image 
          src="/favicon.png"
          alt="LexImpact Africa (Let's Impact Africa)"
          width={100}
          height={100}
          className="mx-auto mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">About LetImpact Africa</h1>
        <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto">
          We are dedicated to democratizing access to AI education, fostering collaboration, and empowering innovators in Africa.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Our Mission</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
            To empower every African to learn, experiment, and innovate with Artificial Intelligence. We aim to make AI skills accessible and transformative for students, enthusiasts, researchers, and professionals across the continent.
            </p>
            <p className="text-neutral-600 leading-relaxed">
            Our platform combines high-quality educational resources, vast African datasets, and powerful cloud computing to create a seamless and inclusive AI development journey.
            </p>
          </div>
          <div className="relative h-80 w-full rounded-lg shadow-xl overflow-hidden">
            <Image src="/learning.jpg" alt="Team working on AI" layout="fill" objectFit="cover" />
          </div>
        </div>
      </section>

      <section className="mb-16 bg-neutral-50 py-12 rounded-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-neutral-800 text-center mb-10">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <LightBulbIcon className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-neutral-800 mb-2">Innovation</h3>
              <p className="text-neutral-600 text-sm">Continuously exploring and integrating the latest AI advancements to keep our platform cutting-edge.</p>
            </div>
            <div className="p-6">
              <UsersIcon className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-neutral-800 mb-2">Collaboration</h3>
              <p className="text-neutral-600 text-sm">Fostering a vibrant community where users can connect, share, and learn from each other.</p>
            </div>
            <div className="p-6">
              <AcademicCapIcon className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-neutral-800 mb-2">Accessibility</h3>
              <p className="text-neutral-600 text-sm">Making AI tools and knowledge available to a diverse global audience, regardless of background.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* You can add sections like "Our Story", "Meet the Team (link)", "Our Impact" etc. */}
      
    </div>
  );
}