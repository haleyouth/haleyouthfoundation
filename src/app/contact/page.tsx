import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach Haleyouth Foundation about programs, partnerships, donations, or volunteer opportunities. Registered Nigerian non-profit based in Kogi State.",
  alternates: { canonical: "https://haleyouthfoundation.org/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
