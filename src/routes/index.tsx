import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import {
  Hero,
  Problem,
  Insight,
  HowItWorks,
  TrustEscrow,
  WhatsAppGlobal,
  Corridor,
  Personas,
  TractionMoat,
  FAQ,
  LogoStrip,
  FinalCTA,
  Footer,
} from "@/components/landing/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Commodity AI — Verified Trade Infrastructure for Global Commodity Trade" },
      { name: "description", content: "The world's first verified blind-broker platform — AI-matched deals, masked identities, and escrow-secured payments for exporters and importers across global commodity corridors." },
      { property: "og:title", content: "Commodity AI — Verified Trade Infrastructure" },
      { property: "og:description", content: "AI-matched, escrow-secured commodity trade for exporters and importers worldwide." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      {/* 1. Hero (+ trusted-by ticker) */}
      <Hero />
      <LogoStrip />
      {/* 2. The Problem */}
      <Problem />
      {/* 3. Commodity AI Approach */}
      <Insight />
      {/* 4. How It Works / Deal Flow */}
      <HowItWorks />
      {/* 5. Trust, Verification & Escrow */}
      <TrustEscrow />
      {/* 6. Built for the Way You Trade — WhatsApp + Commodity + Global Corridors */}
      <WhatsAppGlobal />
      <Corridor />
      {/* 7. Who Is This For */}
      <Personas />
      {/* 8. Traction & Moat */}
      <TractionMoat />
      {/* 9. FAQ + Final CTA */}
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
