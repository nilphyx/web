import React from "react";
export default function GetStartedSection() {
  return (
    <section className="bg-secondary py-16 text-center font-montserrat">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to Get Started?
      </h2>
      <p className="text-white font-semibold mb-8">
        Join our community and be part of Africa’s digital transformation.
      </p>
      <button className="bg-white text-primary border border-[#1E3A8A] hover:bg-[#f0f4ff] transition px-6 py-3 rounded-md font-medium inline-flex items-center gap-2">
        Join the Community
        <span>→</span>
      </button>
    </section>
  );
}
