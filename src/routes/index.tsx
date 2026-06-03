import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import {
  Hero,
  Problem,
  Insight,
  HowItWorks,
  Market,
  BusinessModel,
  Moat,
  Traction,
  Corridor,
  LogoStrip,
  FinalCTA,
  Footer,
} from "@/components/landing/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Commodity AI — Verified Trade Infrastructure for India & the Gulf" },
      { name: "description", content: "The world's first verified blind-broker platform connecting Indian exporters with Gulf importers — AI-matched deals, protected identities, escrow-secured payments." },
      { property: "og:title", content: "Commodity AI — Verified Trade Infrastructure" },
      { property: "og:description", content: "AI-matched, escrow-secured commodity trade for Indian exporters and Gulf importers." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <LogoStrip />
      <Problem />
      <Insight />
      <HowItWorks />
      <Market />
      <BusinessModel />
      <Moat />
      <Traction />
      <Corridor />
      <FinalCTA />
      <Footer />
    </main>
  );
}
