import type { Metadata } from "next";
import TechSkillTrainingClient from "./TechSkillTrainingClient";

export const metadata: Metadata = {
  title: "Tech Skill Training",
  description:
    "Free digital-skills training and certification pathways for young people in our communities, in partnership with CIL Academy. The AI Foundational Training programme is open for registration now.",
  alternates: { canonical: "/programs/tech-skill-training/" },
  openGraph: {
    title: "Tech Skill Training | Haleyouth Foundation",
    description:
      "Free digital-skills training with CIL Academy. Register your interest in the AI Foundational Training programme, open now.",
  },
};

export default function TechSkillTrainingPage() {
  return <TechSkillTrainingClient />;
}
