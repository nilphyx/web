import React from "react";
import PlatformCard from "@/components/PlatformCard";
import { BrainCircuit, Cloud, Server } from "lucide-react"; // Optional: icons
import { Button } from "@/components/Button";

export default function PlatformSection() {
  return (
    <section className="pt-12 bg-background">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold font-montserrat text-foreground">
          Our Platform
        </h2>
        <p className="text-muted-foreground text-lg mt-2">
          Three powerful solutions working together to drive innovation and
          growth
        </p>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-6  bg-heroMild px-10 py-14">
        <PlatformCard
          title="AI Academy"
          description="Artificial intelligence training with hands-on labs and certifications."
          imageSrc="/ai-academy.jpg"
          iconSlot={<BrainCircuit className="text-white w-6 h-6" />}
          hasOverlay={true}
          buttonlink="/academy"
          
        />
        <PlatformCard
          title="Data Center"
          description="Secure, scalable infrastructure for your data needs."
          imageSrc="/data-centre.jpg"
          iconSlot={<Server className="text-white w-6 h-6" />}
          buttonlink="/datacenter"
        />
        <PlatformCard
          title="Cloud Computing"
          description="Run computations and train models with scalable resources."
          imageSrc="/cloud-compute.png"
          iconSlot={<Cloud className="text-white w-6 h-6" />}
          buttonlink="/compute"
        />
      </div>
    </section>
  );
}
