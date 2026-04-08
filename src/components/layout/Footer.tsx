import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Heart, ArrowUpRight, Shield } from "lucide-react";
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
  { label: "Our Impact", href: "/impact" },
  { label: "Partners", href: "/partners" },
  { label: "Gallery", href: "/gallery" },
  { label: "News & Updates", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

const involvedLinks = [
  { label: "Donate", href: "/get-involved/donate" },
  { label: "Volunteer", href: "/get-involved/volunteer" },
  { label: "Partner With Us", href: "/get-involved/partner-with-us" },
];

const socialLinks = [
  { icon: FacebookIcon, href: SITE_CONFIG.social.facebook, label: "Facebook" },
  { icon: XTwitterIcon, href: SITE_CONFIG.social.twitter, label: "Twitter / X" },
  { icon: LinkedInIcon, href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
  { icon: InstagramIcon, href: SITE_CONFIG.social.instagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="section-gradient-dark text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.04] rounded-2xl p-8 border border-white/[0.06]">
            <div>
              <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                Ready to Make a Difference?
              </h3>
              <p className="text-white/60 text-sm">Join thousands of supporters transforming lives across Africa.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/get-involved/donate" className="btn-accent inline-flex items-center gap-2 !text-sm">
                <Heart size={14} /> Donate Now
              </Link>
              <Link href="/get-involved/volunteer" className="px-5 py-3 border border-white/20 text-white rounded-xl text-sm font-semibold hover:bg-white/10 transition-all">
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo_s.png"
                alt="Haleyouth Foundation"
                width={44}
                height={44}
                className="h-11 w-auto"
              />
              <div>
                <p className="font-bold text-lg text-white">{SITE_CONFIG.name}</p>
                <p className="text-[11px] text-white/40 tracking-wide">{SITE_CONFIG.tagline}</p>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering youth through mentorship, advancing STEM education, and fostering community development in Nigeria and across Africa.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 bg-white/[0.06] rounded-xl flex items-center justify-center hover:bg-primary/80 transition-all duration-300 text-white/50 hover:text-white"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">Programs</h4>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">Explore</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">Get Involved</h4>
            <ul className="space-y-3">
              {involvedLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-white transition-colors duration-300 inline-flex items-center gap-1">
                    {link.label} <ArrowUpRight size={11} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-white/40 text-xs hover:text-white/60 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-white/40 text-xs hover:text-white/60 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-primary mt-1 shrink-0" />
                <p className="text-white/50 text-sm leading-relaxed">{SITE_CONFIG.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-primary shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-white/50 text-sm hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 w-full justify-center">
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <Link
              href="/admin/login"
              className="text-white/15 hover:text-white/40 transition-colors"
              title="Admin Panel"
              aria-label="Admin Panel"
            >
              <Shield size={12} />
            </Link>
            <p className="text-white/30 text-xs">
              {SITE_CONFIG.registration}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
