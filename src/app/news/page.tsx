import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/Link";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = { title: "News & Updates" };

const posts = [
  {
    slug: "cil-academy-digital-skills-partnership",
    title: "New Partnership: Digital Skills Training with CIL Academy",
    excerpt: "Haleyouth Foundation is partnering with Cecure Intelligence Limited to bring the CIL Academy training and certification pathway to youth in our communities, with internship and employment pathways for graduates.",
    image: "/images/events/Garki_IMG_0015.webp",
    date: "June 2026",
    category: "Partnerships",
  },
  {
    slug: "voices-of-the-middle-belt-ebira-corpus",
    title: "Voices of the Middle Belt: Building an Open Ebira Language Corpus",
    excerpt: "Under our Language and Culture programme, we are developing the first openly licensed speech and text corpus for the Ebira language, preserving heritage and widening access to digital tools for millions of speakers.",
    image: "/images/events/UNGA80_d.webp",
    date: "March 2026",
    category: "Programs",
  },
  {
    slug: "unga-sdgs-roundtable-2025",
    title: "Haleyouth Foundation at UNGA SDGs Roundtable in New York",
    excerpt: "Our Chairman was invited to share insights on youth-led initiatives that build peace and social cohesion at the United Nations General Assembly.",
    image: "/images/events/UNGA80_a.webp",
    date: "September 2025",
    category: "Events",
  },
  {
    slug: "pad-a-girl-climate-action-completion",
    title: "Pad-a-Girl Climate Action Project Successfully Completed",
    excerpt: "We distributed 500+ reusable pad kits and reached 590+ girls through competitions and workshops, supported by the British Council.",
    image: "/images/events/Garki_IMG_0011.webp",
    date: "December 2025",
    category: "Programs",
  },
  {
    slug: "back-to-school-2024",
    title: "Back-to-School Project Reaches 200+ Rural Students",
    excerpt: "Learning materials including textbooks were distributed to students in underserved rural communities across multiple states.",
    image: "/images/events/Back2School.webp",
    date: "2024",
    category: "Programs",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHeader title="News & Updates" subtitle="Stay up to date with the latest from Haleyouth Foundation." badge="Latest" />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover group">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-primary rounded-full">{post.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-text-secondary text-xs mb-3">
                    <Calendar size={12} /> {post.date}
                  </div>
                  <h2 className="font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-3">Be part of the next story</h2>
            <p className="text-text-secondary mb-6">
              Every programme we run is powered by people who care. Support our work or join us as a volunteer, and follow us on social media for real-time updates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/get-involved/donate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-[#BF360C] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Donate Now <ArrowRight size={16} />
              </Link>
              <Link
                href="/get-involved/volunteer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-all"
              >
                Volunteer With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
