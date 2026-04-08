import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = { title: "News & Updates" };

const posts = [
  {
    slug: "unga-sdgs-roundtable-2025",
    title: "Dr. Ismaila Speaks at UNGA SDGs Roundtable in New York",
    excerpt: "Our Chairman was invited to share insights on youth-led initiatives that build peace and social cohesion at the United Nations General Assembly.",
    image: "/images/events/UNGA80_a.jpg",
    date: "September 2025",
    category: "Events",
  },
  {
    slug: "pad-a-girl-climate-action-completion",
    title: "Pad-a-Girl Climate Action Project Successfully Completed",
    excerpt: "We distributed 500+ reusable pad kits and reached 590+ girls through competitions and workshops, supported by the British Council.",
    image: "/images/events/Garki_IMG_0011.jpg",
    date: "December 2025",
    category: "Programs",
  },
  {
    slug: "back-to-school-2024",
    title: "Back-to-School Project Reaches 200+ Rural Students",
    excerpt: "Learning materials including textbooks were distributed to students in underserved rural communities across multiple states.",
    image: "/images/events/Back2School.jpg",
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

          <div className="text-center mt-12">
            <p className="text-text-secondary text-sm">More news and updates coming soon. Follow us on social media for real-time updates.</p>
          </div>
        </div>
      </section>
    </>
  );
}
