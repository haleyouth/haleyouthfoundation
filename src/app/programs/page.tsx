import type { Metadata } from "next";
import ProgramsClient from "./ProgramsClient";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Twelve focused programs serving rural and underserved communities across Nigeria, from menstrual health and girls' education to STEM training, scholarships, and humanitarian response.",
  alternates: { canonical: "https://haleyouthfoundation.org/programs" },
};

export default function ProgramsPage() {
  return <ProgramsClient />;
}
