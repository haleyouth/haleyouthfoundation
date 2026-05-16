import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from Haleyouth Foundation's programs across Nigeria — Pad-a-Girl distributions, Back-to-School outreach, food drives, workshops, and the UN General Assembly SDGs Roundtable.",
  alternates: { canonical: "https://haleyouthfoundation.org/gallery" },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
