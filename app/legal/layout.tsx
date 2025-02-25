import { Metadata } from "next";
import { Heading } from "@/components/ui/heading";

export const metadata: Metadata = {
  title: "Legal Information | Tony Tech Insights",
  description: "Legal information, policies, and terms for Tony Tech Insights.",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0021a7]/20 pt-24">
      {children}
    </div>
  );
} 