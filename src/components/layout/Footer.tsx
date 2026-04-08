import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Heart } from "lucide-react";
import { FacebookIcon, XTwitterIcon, LinkedInIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { SITE_CONFIG } from "@/lib/constants";

const programLinks = [
  { label: "Pad-a-Girl", href: "/programs/pad-a-girl" },
  { label: "Back to School", href: "/programs/back-to-school" },
  { label: "Scholars of Change", href: "/programs/scholars-of-change" },
  { label: "STEM Camp", href: "/programs/stem-camp" },
  { label: "Digital Skills", href: "/programs/digital-skills" },
  { label: "Career Advisory", href: "/programs/career-advisory" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Programs", href: "/programs" },
  { label: "Impact & Stories", href: "/impact" },
  { label: "Partners", href: "/partners" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const involvedLinks = [
  { label: "Donate", href: "/get-involved/donate" },
  { label: "Volunteer", href: "/get-involved/volunteer" },
  { label: "Partner With Us", href: "/get-involved/partner-with-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

const socialLinks = [
  { icon: FacebookIcon, href: SITE_CONFIG.social.facebook, label: "Facebook" },
  { icon: XTwitterIcon, href: SITE_CONFIG.social.twitter, label: "Twitter" },
  { icon: LinkedInIcon, href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
  { icon: InstagramIcon, href: SITE_CONFIG.social.instagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo_s.png"
                alt="Haleyouth Foundation"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div>
                <p className="font-bold text-lg">{SITE_CONFIG.name}</p>
                <p className="text-xs text-gray-400">{SITE_CONFIG.tagline}</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Dedicated to transforming communities through youth leadership,
              education, and skills development. Join us in building a better
              tomorrow for all.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-base font-semibold mb-5">Our Programs</h4>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold mb-5">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>{SITE_CONFIG.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            {/* Get Involved */}
            <div className="mt-8">
              <h4 className="text-base font-semibold mb-4">Get Involved</h4>
              <div className="flex flex-wrap gap-2">
                {involvedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-full"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved. | {SITE_CONFIG.registration}
          </p>
          <p className="text-gray-500 text-xs flex items-center gap-1">
            Built with <Heart size={12} className="text-accent" /> for
            community impact
          </p>
        </div>
      </div>
    </footer>
  );
}
