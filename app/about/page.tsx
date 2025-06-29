import { SparklesIcon, UsersIcon, LightBulbIcon, AcademicCapIcon } from '@/components/icons'; // Added AcademicCapIcon
import Image from 'next/image';

export const metadata = {
  title: 'About Us - Nilphyx',
  description: "Learn more about our mission, vision, and the team behind Nilphyx",
};

export default function AboutPage() {
  return (
    <div className="bg-background container mx-auto py-12 px-4 animate-fadeIn">
      <section className="text-center mb-16">
        <Image 
          src="/logo.png"
          alt="Nilphyx Logo"
          width={100}
          height={100}
          className="mx-auto mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">About Nilphyx</h1>
        <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto">
          We are dedicated to providing cloud services and access to AI education, fostering collaboration, and empowering innovators in Africa.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl border-4 border-primary bg-white/80 p-8 shadow-lg flex flex-col h-80 justify-center">
        <h2 className="text-3xl text-primary font-semibold mb-4">Our Mission</h2>
        <p className="text-neutral-600 leading-relaxed mb-4">
          To empower every African to learn, experiment, and innovate with Artificial Intelligence. We aim to make AI skills accessible and transformative for students, enthusiasts, researchers, and professionals across the continent.
        </p>
          </div>
          <div className="flex items-center justify-center h-80 w-full rounded-2xl border-4 border-primary bg-white/80 shadow-lg">
        <SparklesIcon className="w-48 h-48 text-primary animate-bounce drop-shadow-lg" />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex items-center justify-center h-80 w-full rounded-2xl border-4 border-primary bg-white/80 shadow-lg">
        {/* Animated "Vision" icon: an eye with a glowing effect */}
        <svg
          className="w-48 h-48 text-accent animate-pulse drop-shadow-lg"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Vision Icon"
        >
          <ellipse
            cx="64"
            cy="64"
            rx="54"
            ry="32"
            fill="currentColor"
            opacity="0.15"
          />
          <ellipse
            cx="64"
            cy="64"
            rx="44"
            ry="24"
            fill="currentColor"
            opacity="0.3"
          />
          <ellipse
            cx="64"
            cy="64"
            rx="34"
            ry="18"
            fill="currentColor"
            opacity="0.5"
          />
          <circle
            cx="64"
            cy="64"
            r="16"
            fill="white"
            className="animate-[pulse_2s_infinite]"
          />
          <circle
            cx="64"
            cy="64"
            r="10"
            fill="currentColor"
          />
          <circle
            cx="68"
            cy="60"
            r="3"
            fill="white"
            opacity="0.8"
          />
        </svg>
          </div>
          <div className="rounded-2xl border-4 border-primary bg-white/80 p-8 shadow-lg flex flex-col h-80 justify-center">
        <h2 className="text-3xl text-primary font-semibold mb-4">Our Vision</h2>
        <p className="text-neutral-600 leading-relaxed mb-4">
          We envision a generation where Africa can fully rely on her infrastructure and data to build a future that really solves African problems in African ways. We believe this freedom from external dependence would create a new awakening.
        </p>
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