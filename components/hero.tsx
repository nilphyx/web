"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@radix-ui/themes";
import Image from "next/image";

const Hero = () => {
  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  
  // Trigger animations after component mounts
  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => setAnimateItems(true), 30);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative w-full h-[800px] flex items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Image with subtle zoom effect */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.png"
          alt="Hero Background for Nilphyx"
          fill
          className={`object-cover w-full h-full transform transition-transform duration-[10000ms] ${isLoaded ? 'scale-105' : 'scale-100'}`}
          priority
        />
      </div>
      {/* Gradient Overlay with fade-in effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-heroStrong/95 via-white/90 to-heroMild/90 z-0 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-80'
        }`}
      ></div>

      {/* Hero Content with staggered animations */}
      <div className="z-10 max-w-4xl px-4 sm:px-6">
        {/* Top Badge with slide-down and fade-in */}
        <div 
          className={`bg-background text-primary text-xs sm:text-sm md:text-base font-medium 
          w-[80%] sm:w-[317px] h-[40px] sm:h-[48px] flex items-center justify-center 
          rounded-[20px] mx-auto mb-4 transform transition-all duration-700 ease-out 
          ${animateItems ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
        >
          Innovation for Africa
        </div>

        {/* Headline with fade-in and slide-up */}
        <h1
          className={`font-extrabold leading-[100%] bg-gradient-to-r from-primary to-muted bg-clip-text text-transparent 
          text-[clamp(32px,5vw,64px)] transform transition-all duration-700 delay-100 ease-out
          ${animateItems ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          Empowering Africa&apos;s Digital Future
        </h1>

        {/* "Welcome to Nilphyx" with gradient animation */}
        <h2 
          className={`font-bold text-secondary mt-4 text-[clamp(24px,4vw,48px)]
          relative transform transition-all duration-700 delay-300 ease-out
          ${animateItems ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
        >
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
            Welcome to Nilphyx
          </span>
        </h2>

        {/* Subheading with staggered fade-in */}
        <div className="mt-4 text-secondary leading-[100%] text-[clamp(18px,3vw,36px)]">
           <p 
            className={`transform transition-all duration-700 delay-500 ease-out
            ${animateItems ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            Learning, Building and Deploying AI solutions in One
          </p> 
          <p 
            className={`mt-2 sm:mt-4 transform transition-all duration-700 delay-700 ease-out
            ${animateItems ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            Unified Platform.
          </p> 
        </div> 

        {/* Buttons with staggered fade-in and scale */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <div
            className={`transform transition-all duration-700 delay-900 ease-out
            ${animateItems ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}
          >
            <Button
              onClick={() => window.location.href = '/login'}
              className="bg-primary text-secondary w-[80%] sm:w-[265px] h-[50px] sm:h-[66px] px-6 sm:px-[39px] py-3 sm:py-[21px] text-base sm:text-lg font-semibold shadow-md hover:bg-secondary hover:text-primary transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                Get Started 
                <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-secondary transition-all duration-300 group-hover:h-full -z-0"></span>
            </Button>
          </div>
          
          <div
            className={`transform transition-all duration-700 delay-1100 ease-out
            ${animateItems ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}
          >
            <Button
              onClick={() => window.location.href = "/about"}
              className="bg-background border-4 border-[#021488] w-[80%] sm:w-[265px] h-[50px] sm:h-[66px] text-primary px-6 py-3 text-base sm:text-lg font-semibold hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Learn More</span>
              <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 group-hover:w-full"></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add animation styles directly in component
const animationStyles = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  animation: gradientShift 6s ease infinite;
}
`;

// Inject the animation styles into the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(animationStyles));
  document.head.appendChild(style);
}

export default Hero;
