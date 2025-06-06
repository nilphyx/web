"use client";
import React from "react";
import { Button } from "@radix-ui/themes";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-[800px] flex items-center justify-center text-center px-4">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.png"
          alt="Hero Background for Nilphyx"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-heroStrong/95 via-white/90 to-heroMild/90 z-0"></div>

      {/* Hero Content */}
      <div className="z-10 max-w-4xl px-4 sm:px-6">
        {/* Top Badge */}
        <div className="bg-background text-primary text-xs sm:text-sm md:text-base font-medium w-[80%] sm:w-[317px] h-[40px] sm:h-[48px] flex items-center justify-center rounded-[20px] mx-auto mb-4">
          Innovation for Africa
        </div>

        {/* Headline */}
        <h1
          className="font-extrabold leading-[100%] bg-gradient-to-r from-primary to-muted bg-clip-text text-transparent 
          text-[clamp(32px,5vw,64px)]"
        >
          Empowering Africa&apos;s Digital Future
        </h1>

        {/* "Welcome to Leximpact" */}
        <h2 className="font-bold text-secondary mt-4 text-[clamp(24px,4vw,48px)]">
          Welcome to Nilphyx
        </h2>

        {/* Subheading */}
        <div className="mt-4 text-secondary leading-[100%] text-[clamp(18px,3vw,36px)]">
          <p>Empowering Data, Computing, and AI Learning in One</p>
          <p className="mt-2 sm:mt-4">Unified Platform.</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.location.href = '/login'}
            className="bg-primary text-secondary w-[80%] sm:w-[265px] h-[50px] sm:h-[66px] px-6 sm:px-[39px] py-3 sm:py-[21px] text-base sm:text-lg font-semibold shadow-md hover:bg-secondary hover:text-primary transition"
          >
            Get Started →
          </Button>
          <Button
            onClick={() => window.location.href = "/about"}
            className="bg-background border-4 border-[#021488] w-[80%] sm:w-[265px] h-[50px] sm:h-[66px] text-primary px-6 py-3 text-base sm:text-lg font-semibold hover:bg-primary/50 hover:text-primary transition"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
