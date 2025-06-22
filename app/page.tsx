"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import {
  SparklesIcon,
  BookOpenIcon,
  CpuChipIcon,
  UsersIcon,
  BuildingLibraryIcon,
} from "@/components/icons";
import Image from "next/image";
import CommunityVoicesSection from "@/components/CommunityVoicesSection";
import Footer from "@/components/Footer";
import GetStartedSection from "@/components/GetStartedSection";
import Hero from "@/components/hero";
import PlatformSection from "@/components/PlatformSection";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, AuthState } from "@/lib/hooks/useAuth";

export default function HomePage() {
  const router = useRouter();
  const { user, authState } = useAuth();

  return (
    <>
      <Hero />
      <PlatformSection />
      <CommunityVoicesSection />

      {/* Call to Action Section */}
      <section className="py-16 bg-background ">
        <div className="container mx-auto text-center">
        {/* <div className="w-full text-center"> */}
          <Image
            src="https://picsum.photos/seed/cta/1200/400"
            alt="AI illustration"
            width={1200}
            height={400}
            className="rounded-lg shadow-xl mx-auto mb-8 object-cover"
          />

          <h2 className="text-3xl font-semibold text-neutral-800 mb-6">
            Ready to Dive In?
          </h2>
          <p className="text-neutral-700 mb-8 max-w-xl mx-auto">
            Join thousands of learners and innovators shaping the future of AI.
            Create your account today and start your journey.
          </p>
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              if (authState === AuthState.AUTHENTICATED && user) {
                // Show popup for logged in users
                alert(
                  "You are already signed in! You can access the academy directly."
                );
                router.push("/academy");
              } else {
                // Redirect to signup for non-logged in users
                router.push("/signup");
              }
            }}
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      <GetStartedSection />
    </>
  );
}
