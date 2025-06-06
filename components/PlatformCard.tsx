import React from "react";
import Image from "next/image";
import { Button } from "@/components/Button"

interface PlatformCardProps {
  title: string;
  description: string;
  imageSrc: string;
  iconSlot?: React.ReactNode;
  buttonlink: string;
  hasOverlay?: boolean;
}

export default function PlatformCard({
  title,
  description,
  imageSrc,
  iconSlot,
  buttonlink,
  hasOverlay = false,
}: PlatformCardProps) {
  return (
    <div className="w-96 [427px] max-h-96 bg-heroMild rounded-[8px] shadow-[2px_2px_5px_1px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col">
      <div className="relative h-[386px] w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover rounded-md"
        />
        {hasOverlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/30 via-transparent to-transparent z-10 rounded-t-[8px]" />
        )}
        {iconSlot && (
          <div className="absolute bottom-4 left-4 bg-primary p-2 rounded-md z-20">
            {iconSlot}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center items-center p-4 text-center gap-2">
        <h3 className="text-[24px] font-semibold leading-[1] text-[#1A1A1A] font-poppins">
          {title}
        </h3>
        <p className="text-[16px] font-normal leading-[1] text-[#666666] font-poppins max-w-[356px] mb-4">
          {description}
        </p>
        <div>
          <Button 
            size="lg" 
            variant="primary" 
            onClick={() => window.location.href = buttonlink}
          >
            Get Started for Free
          </Button>
        </div>
      </div>
    </div>
  );
}
