import React from "react";
import { Instagram, Linkedin, Youtube, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Partners", href: "/partners" },
    { label: "FAQ", href: "/faqs" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  const communityLinks = [
    { label: "Discord", href: "#" },
    { label: "Slack", href: "#" },
  ];

  const serviceLinks = [
    { label: "AI Academy", href: "/academy" },
    { label: "Cloud Computing", href: "/compute" },
    { label: "Data Center", href: "/datacenter" },
    { label: "Certificate Verification", href: "/verify-certificate" },
  ];

  return (
    <footer className="bg-primary text-secondary px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-4 md:grid-cols-4">
          <div className="mb-4">
            <img
              src="/white-logo.png"
              alt="Nyphics Logo"
              className="w-full h-auto"
            />
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
          <div>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="hover:text-muted hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Column 2 */}

        <div>
          <h4 className="font-semibold mb-4">Communities</h4>
          <ul className="space-y-2 text-sm">
            {communityLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="hover:text-muted hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}

        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            {serviceLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="hover:text-muted hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> contact@nilphyx.tech
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Nigeria
            </li>
          </ul>

          <div className="flex gap-4 mt-6">
            <a
              href="https://instagram.com/nilphyx/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 hover:text-gray-300" />
            </a>
            <a
              href="https://linkedin.com/company/nilphyx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 hover:text-gray-300" />
            </a>
            <a
              href="https://youtube.com/@nilphyx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="w-5 h-5 hover:text-gray-300" />
            </a>
            <a
              href="https://x.com/nilphyx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-white w-6 h-6 bg-secondary rounded flex items-center justify-center text-sm font-bold border border-white hover:bg-white hover:text-[#021488]">
                X
              </div>
            </a>
          </div>
        </div>
        </div> 
      </div>

      <hr className="my-10 border-white/20" />

      <p className="text-center text-xs text-white/70">
        © 2025 Nyphics. All rights reserved.
      </p>
    </footer>
  );
}
