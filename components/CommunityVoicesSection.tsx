import React from "react";
import TestimonialCard from "@/components/TestimonialCard";

const testimonials = [
  {
    text: "The platform has transformed how we approach AI education and cloud computing. It’s exactly what African’s tech ecosystem needed.",
    name: "Jabu Bheki",
    role: "Tech Lead, Innovation Hub",
  },
  {
    text: "Ever since I became a member of Leximpact, it has been up-scaling all the way. I never knew that learning can be this fun.",
    name: "Zola Nandi",
    role: "Student, University of South Africa",
  },
  {
    text: "Lack of African’s datasets has always been a problem for me, only to find out that I can now access datasets with only a single button.",
    name: "Chiemezie Okeke",
    role: "Researcher and Consultant",
  },
  {
    text: "This platform is the definite example of practice while you learn. The competitive spirit between the learners can never be over emphasized.",
    name: "Timi Oladepe",
    role: "Educator, Learners Foundation",
  },
];
export default function CommunityVoicesSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-heroStrong  to-accent">
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-semibold font-montserrat text-primary">
          Community Voices
        </h2>
        <p className="text-[24px] font-normal font-montserrat text-[#6B7280] mt-2">
          Hear from our growing community of developers and organizations
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            text={testimonial.text}
            name={testimonial.name}
            role={testimonial.role}
          />
        ))}
      </div>
    </section>
  );
}
