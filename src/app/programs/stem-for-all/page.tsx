import type { Metadata } from "next";
import StemForAllClient from "./StemForAllClient";

export const metadata: Metadata = {
  title: "STEM for All",
  description:
    "Free premium access to Brilliant for young learners, through Haleyouth Foundation's partnership with Brilliant. Learn maths, science, computer science, and AI interactively. Sign up and commit to the programme.",
  alternates: { canonical: "/programs/stem-for-all/" },
  openGraph: {
    title: "STEM for All | Haleyouth Foundation",
    description:
      "Free premium Brilliant access for committed learners. Build real problem-solving skills in maths, science, computer science, and AI. Sign up now.",
  },
};

export default function StemForAllPage() {
  return <StemForAllClient />;
}
