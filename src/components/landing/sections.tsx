import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence, type MotionValue } from "framer-motion";
import React, { useRef, useState } from "react";
import { FadeUp } from "./FadeUp";
import { CountUp } from "./CountUp";
import {
  EyeOff,
  ShieldCheck,
  Lock,
  MessageSquareLock,
  Check,
  X,
  ArrowRight,
  ArrowUp,
  Paperclip,
  Plus,
  FileText,
  Search,
  MessagesSquare,
  FileSignature,
  Banknote,
  Ship,
  CheckCircle2,
} from "lucide-react";
import { ExpandingCards, type CardItem } from "@/components/ui/expanding-cards";

import sellerImg from "@/assets/seller-card.jpg";
import buyerImg from "@/assets/buyer-card.jpg";
import { RadialGlowBackground } from "@/components/ui/radial-glow-background";
import { WorldMapBackground } from "./WorldMapBackground";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs tracking-[0.22em] uppercase text-accent font-medium mb-6">
    {children}
  </div>
);

/* ---------- HERO ---------- */
export function Hero() {
  const titleWords = "Commodity Trade Has a Trust Problem. We Fixed It.".split(" ");




  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="group/hero relative min-h-screen flex items-center px-6 pt-32 pb-24 overflow-hidden [--mx:50%] [--my:0px]"
    >
      {/* Half radial gold glow from the top */}
      <RadialGlowBackground
        position="top"
        intensity={1}
        glowColor="rgba(200, 169, 110, 0.45)"
      />

      {/* Dotted world map + cursor spotlight (replaces the old continuous grid) */}
      <WorldMapBackground />



      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        {/* LEFT — Text */}
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow>The Infrastructure for Global Commodity Trade</Eyebrow>
          </motion.div>

          <h1 className="font-serif text-[40px] leading-[1.05] sm:text-6xl lg:text-[68px] text-foreground tracking-tight">
            {titleWords.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: "easeOut" }}
                className="inline-block mr-[0.25em]"
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-8 text-lg sm:text-xl text-subtext max-w-[540px] leading-relaxed"
          >
            Commodity AI is the world's first verified blind-broker platform —
            connecting exporters and importers across every major trade corridor
            through AI-matched deals, protected identities, and escrow-secured
            payments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-medium hover:bg-accent-hover hover:scale-[1.02] transition-all"
            >
              Request Early Access
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how"
              className="rounded-full border border-border text-foreground px-6 py-3 text-sm hover:border-accent hover:text-accent transition-all text-center"
            >
              See How It Works
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-6 text-sm text-subtext max-w-[480px]"
          >
            Trusted by exporters and importers moving $500K+ in rice, sugar,
            spices and agri-commodities across global trade corridors.
          </motion.p>
        </div>

        {/* RIGHT — Single floating, breathing, flip-on-hover card */}
        <FloatingFlipCard />
      </div>
    </section>
  );
}

/* ---------- FLOATING FLIP CARD ---------- */
function FloatingFlipCard() {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="relative h-[520px] sm:h-[600px] lg:h-[640px] w-full flex items-center justify-center"
      style={{ perspective: 1600 }}
    >
      {/* Gold floor shadow */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 bottom-[8%] -translate-x-1/2 rounded-[50%] blur-2xl pointer-events-none"
        style={{
          width: "62%",
          height: 60,
          background:
            "radial-gradient(ellipse at center, rgba(200,169,110,0.55), rgba(200,169,110,0.15) 55%, transparent 75%)",
        }}
        animate={
          reduce
            ? undefined
            : { scaleX: [1, 0.88, 1], opacity: [0.85, 0.6, 0.85] }
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Breathing + half-turned wrapper */}
      <motion.div
        className="relative w-[70%] h-[78%] cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ rotateX: 6, rotateY: -22, y: 0 }}
        animate={
          reduce
            ? { rotateY: flipped ? -22 + 360 : -22 }
            : {
                y: [0, -14, 0],
                rotateX: [6, 4, 6],
                rotateY: flipped ? [-22, 158, 338] : -22,
                scale: [1, 1.015, 1],
              }
        }
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotateY: flipped
            ? { duration: 1.6, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        }}
        onHoverStart={() => setFlipped(true)}
        onHoverEnd={() => setFlipped(false)}
        onTap={() => setFlipped((f) => !f)}
        onAnimationComplete={() => {
          // reset rotateY base after a full flip so it can flip again
          if (flipped) setFlipped(false);
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-border"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            boxShadow:
              "0 40px 100px -20px rgba(0,0,0,0.85), 0 0 80px -20px rgba(200,169,110,0.35)",
          }}
        >
          <img
            src={sellerImg}
            alt="Verified exporter reviewing inventory"
            width={896}
            height={1216}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border text-[10px] tracking-[0.22em] uppercase text-accent">
            Verified Trade
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <div className="font-serif text-2xl text-foreground leading-tight">
              Anonymous Until Committed
            </div>
            <div className="text-xs text-subtext mt-1.5">
              Buyers &amp; sellers, matched by AI — identities masked until both sides agree.
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-accent/30"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background:
              "radial-gradient(ellipse 90% 70% at 30% 0%, rgba(200,169,110,0.22), transparent 60%), linear-gradient(135deg, #0E1318 0%, #080B0F 100%)",
            boxShadow:
              "0 40px 100px -20px rgba(0,0,0,0.85), 0 0 80px -20px rgba(200,169,110,0.45)",
          }}
        >
          <img
            src={buyerImg}
            alt="Global importer sourcing at scale"
            width={896}
            height={1216}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/15 backdrop-blur-md border border-accent/40 text-[10px] tracking-[0.22em] uppercase text-accent">
            Escrow Secured
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <div className="font-serif text-2xl text-foreground leading-tight">
              Verified From Day One
            </div>
            <div className="text-xs text-subtext mt-1.5">
              Every deal flows through escrow, with masked WhatsApp relay and an AI-verified trust score.
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


/* ---------- PROBLEM ---------- */
export function Problem() {
  return (
    <section className="bg-surface-alt px-6 py-32">
      <div className="max-w-5xl mx-auto text-center">
        <FadeUp><Eyebrow>The Broken Status Quo</Eyebrow></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-serif text-3xl sm:text-5xl text-foreground max-w-3xl mx-auto leading-tight">
            $2 Trillion in commodity deals. Still done over WhatsApp.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-8 text-lg text-subtext max-w-[620px] mx-auto leading-relaxed">
            Every year, thousands of Indian exporters and Gulf importers negotiate deals worth hundreds of thousands of dollars through informal brokers, unverified contacts, and blind trust. There is no infrastructure. No verification. No protection. When deals fail — and they do — there is no recourse.
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { n: 68, suffix: "%", l: "of Tier 2/3 traders have been cheated or bypassed by a broker at least once" },
            { n: 200, prefix: "$", suffix: "K+", l: "average deal value — negotiated with zero identity verification" },
            { n: 0, l: "existing platforms built specifically for SME cross-border commodity trade", zero: true },
          ].map((s, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-background/40 p-8 h-full text-left">
                <div className="font-serif text-5xl sm:text-6xl text-accent">
                  {s.zero ? "Zero" : <CountUp to={s.n} prefix={s.prefix} suffix={s.suffix} />}
                </div>
                <div className="mt-4 text-sm text-subtext leading-relaxed">{s.l}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- INSIGHT ---------- */
export function Insight() {
  const blocks = [
    { Icon: EyeOff, t: "Blind Broker Matching", d: "Buyer and seller identities stay hidden until a Letter of Intent is signed. No bypass. No leakage. No lost commission." },
    { Icon: ShieldCheck, t: "AI-Verified Trust Score", d: "Every trader carries a Trust Score from 0–1000, built on GST, IEC, trade history, and closed-deal data. You know exactly who you're dealing with — without knowing who they are yet." },
    { Icon: Lock, t: "Escrow-Secured Deals", d: "Funds are held in a licensed escrow account and released only when both parties confirm delivery milestones. No wire transfers to strangers." },
    { Icon: MessageSquareLock, t: "Masked WhatsApp Relay", d: "All deal communication routes through our platform. Phone numbers are never exposed. Identity is protected until the deal is formally committed." },
  ];
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative px-6 py-32 overflow-hidden">
      {/* subtle top radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] -z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(200,169,110,0.12), transparent 70%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <FadeUp><Eyebrow>The Commodity AI Approach</Eyebrow></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight max-w-3xl mx-auto">
            Anonymous Until Committed. Verified From Day One.
          </h2>
        </FadeUp>

        {/* Chat composer mock */}
        <FadeUp delay={0.2}>
          <div className="mt-12 group relative rounded-2xl border border-border bg-surface-alt/80 backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_60px_-20px_rgba(200,169,110,0.25)]">
            <div className="flex items-center px-6 pt-4 pb-2 text-left">
              <p className="text-subtext text-sm sm:text-base leading-none truncate">
                We don't just digitise brokerage. We re-engineer the trust layer of commodity trade.
              </p>
            </div>
            <div className="flex items-center justify-between px-4 pb-3">

              <button
                type="button"
                tabIndex={-1}
                aria-hidden
                className="w-9 h-9 rounded-full flex items-center justify-center text-subtext hover:text-foreground hover:bg-background/40 transition-colors"
              >
                <Paperclip className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-subtext">
                  <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                  New Deal
                </div>
                <div className="w-9 h-9 rounded-lg bg-background/60 border border-border flex items-center justify-center text-subtext">
                  <ArrowUp className="w-4 h-4" strokeWidth={1.8} />
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Quick-action pills */}
        <FadeUp delay={0.3}>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {blocks.map((b, i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(isActive ? null : i)}
                  onMouseEnter={() => setActive(i)}
                  className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                    isActive
                      ? "border-accent/50 text-foreground bg-surface-alt"
                      : "border-border bg-surface-alt/60 text-subtext hover:text-foreground hover:border-accent/40"
                  }`}
                  style={isActive ? { boxShadow: "0 0 24px -8px rgba(200,169,110,0.3)" } : undefined}
                >
                  <b.Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  <span>{b.t}</span>
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Inline expanding description panel */}
        <div className="mt-6 min-h-[80px]">
          <AnimatePresence mode="wait">
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-2xl rounded-xl border border-border bg-surface-alt/60 px-6 py-5 text-left"
              >
                <div className="flex items-start gap-3">
                  {React.createElement(blocks[active].Icon, {
                    className: "w-5 h-5 text-accent mt-0.5 shrink-0",
                    strokeWidth: 1.5,
                  })}
                  <div>
                    <h3 className="font-sans font-medium text-foreground">{blocks[active].t}</h3>
                    <p className="mt-1.5 text-subtext text-sm leading-relaxed">{blocks[active].d}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


/* ---------- HOW IT WORKS ---------- */

export function HowItWorks() {
  const items: CardItem[] = [
    { id: 1, step: "Step 01", title: "Seller Lists", description: "Exporter submits commodity, grade, quantity, port, and minimum price. KYC verified against GST, IEC, and trade documents.", icon: <FileText /> },
    { id: 2, step: "Step 02", title: "Buyer Requests", description: "Gulf importer submits requirements. Platform matches against verified, masked seller profiles ranked by spec fit and Trust Score.", icon: <Search /> },
    { id: 3, step: "Step 03", title: "Anonymous Negotiation", description: "Both parties communicate via masked relay. Neither knows the other's identity. Platform holds all context.", icon: <MessagesSquare /> },
    { id: 4, step: "Step 04", title: "LOI Signed", description: "Digital Letter of Intent generated and signed by both parties. Circumvention clause locks the deal to the platform for 12 months.", icon: <FileSignature /> },
    { id: 5, step: "Step 05", title: "Escrow Funded", description: "Buyer deposits into licensed escrow. Seller identity revealed. Deal enters execution phase.", icon: <Banknote /> },
    { id: 6, step: "Step 06", title: "Goods Shipped & Verified", description: "Shipping documents verified by platform ops team. Logistics tracked.", icon: <Ship /> },
    { id: 7, step: "Step 07", title: "Escrow Released", description: "Funds released to seller on delivery confirmation. Trust Scores updated for both parties. Deal complete.", icon: <CheckCircle2 /> },
  ];
  return (
    <section id="how" className="bg-surface-alt px-6 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <FadeUp><Eyebrow>The Deal Flow</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight">
              A $200,000 deal. Closed safely. In 7 steps.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-6 text-subtext leading-relaxed">
              Hover any step to expand. Every stage is verified, masked, and escrow-secured end to end.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
          <div className="mt-16">
            <ExpandingCards items={items} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------- MARKET ---------- */
export function Market() {
  return (
    <section className="px-6 py-32">
      <div className="max-w-5xl mx-auto text-center">
        <FadeUp><Eyebrow>The Market</Eyebrow></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight max-w-3xl mx-auto">
            The Largest Undigitised Trade Market in the World.
          </h2>
        </FadeUp>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          <FadeUp>
            <div className="font-serif text-6xl md:text-7xl text-accent">
              <CountUp to={2} prefix="$" suffix="T+" />
            </div>
            <p className="mt-4 text-subtext text-sm">Global SME commodity trade market, underserved and undigitised</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="font-serif text-6xl md:text-7xl text-accent">
              <CountUp to={4.2} suffix="M" decimals={1} />
            </div>
            <p className="mt-4 text-subtext text-sm">Active Tier 2/3 commodity traders in India alone</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="font-serif text-5xl md:text-6xl text-accent">India → UAE</div>
            <p className="mt-4 text-subtext text-sm">The single fastest-growing bilateral trade corridor in agri-commodities</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.3}>
          <p className="mt-20 text-lg text-subtext max-w-2xl mx-auto leading-relaxed">
            Bloomberg serves hedge funds. Banks serve conglomerates. Nobody built the infrastructure for the trader moving 500 tonnes of rice from Rajasthan to Sharjah. Until now.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------- BUSINESS MODEL ---------- */
export function BusinessModel() {
  const cards = [
    [
      "Verified Buyers. No Cold Calls.",
      "Stop chasing unverified leads from WhatsApp groups. Every buyer on Commodity AI has passed KYB verification and put real intent on record. You only talk to buyers who are ready to move.",
    ],
    [
      "Your Money Is Protected Before You Ship.",
      "Funds are held in escrow before a single kilogram leaves your warehouse. You get paid when delivery is confirmed — not when the buyer feels like it, not after 60 days of chasing.",
    ],
    [
      "Your Reputation Travels With You.",
      "Every deal you close builds your Trust Score. The more you trade, the stronger your verified track record — and the more premium buyers you attract. Your history becomes your biggest competitive advantage.",
    ],
  ];
  return (
    <section className="bg-surface-alt px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <FadeUp><Eyebrow>What You Get</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight max-w-4xl mx-auto" style={{ fontSize: "clamp(2rem, 4vw, 48px)" }}>
              Your Export Business. Finally Running Like a Large One.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-6 text-[18px] text-subtext max-w-[580px] mx-auto leading-relaxed">
              Most Tier 2 exporters spend their entire career doing what large trading houses do with a 50-person team — sourcing, verifying, negotiating, documenting, chasing payments. Commodity AI is your entire back office. In one platform.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(([t, d], i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-border bg-background p-8 h-full overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                <h3 className="font-serif text-2xl text-foreground">{t}</h3>
                <p className="mt-4 text-subtext text-sm leading-relaxed">{d}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <p className="mt-20 font-serif text-accent text-center max-w-3xl mx-auto leading-snug" style={{ fontSize: "26px" }}>
            "We charge nothing until a deal closes. Your first move costs you zero."
          </p>
        </FadeUp>
      </div>
    </section>
  );
}


/* ---------- MOAT ---------- */
export function Moat() {
  const left = [
    "Informal WhatsApp brokers",
    "Unverified trade directories",
    "Manual document checks",
    "No identity protection",
    "No deal history data",
  ];
  const right = [
    "AI-verified blind broker network",
    "Trust Score — 0 to 1000 per trader",
    "Document verification layer",
    "Identity protected until escrow",
    "Proprietary closed-deal intelligence",
  ];
  return (
    <section className="px-6 py-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <FadeUp><Eyebrow>Why This Wins</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight max-w-4xl mx-auto">
              The Moat Is Not the Technology. It Is the Data No One Else Will Ever Have.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-8 text-lg text-subtext max-w-[600px] mx-auto leading-relaxed">
              Every deal closed on Commodity AI generates a closed-loop data point no public database contains — verified buyer identity, seller reliability, commodity grade accuracy, price benchmark, logistics outcome, and payment behaviour. By deal 500, we have the most valuable proprietary commodity intelligence dataset in South Asia. By deal 5,000, no competitor can enter.
            </p>
          </FadeUp>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeUp>
            <div className="rounded-2xl border border-border p-8">
              <div className="text-xs uppercase tracking-[0.2em] text-subtext mb-6">What exists today</div>
              <ul className="space-y-4">
                {left.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-subtext">
                    <X className="w-4 h-4 mt-1 shrink-0 opacity-60" strokeWidth={1.5} />
                    <span className="line-through opacity-70">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-accent/40 p-8 bg-accent/[0.03]">
              <div className="text-xs uppercase tracking-[0.2em] text-accent mb-6">Commodity AI</div>
              <ul className="space-y-4">
                {right.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-foreground">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-accent" strokeWidth={2} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ---------- TRACTION ---------- */
export function Traction() {
  const quotes = [
    { q: "I have been doing rice exports for 11 years. Every time I share my details with a new buyer, I worry. This is the first platform that made me feel protected.", a: "R.K.", r: "Rice Exporter, Punjab", i: "RK" },
    { q: "We lost a $180,000 deal because the buyer contacted our supplier directly after we introduced them. The circumvention clause alone would have saved us that deal.", a: "M.A.", r: "Commodity Broker, Dubai", i: "MA" },
    { q: "The escrow model is the only thing that would make me trust a platform I've never used before for a deal of this size.", a: "S.H.", r: "Agri Importer, Sharjah", i: "SH" },
  ];
  return (
    <section className="bg-surface-alt px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <FadeUp><Eyebrow>Early Signal</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight">
              Built for the Trader Who Has Been Burned Before.
            </h2>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-background p-8 h-full border-l-2 border-l-accent">
                <p className="text-foreground/90 leading-relaxed">"{q.q}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-accent/50 bg-accent/10 flex items-center justify-center text-accent text-sm font-medium">
                    {q.i}
                  </div>
                  <div>
                    <div className="text-sm text-foreground font-medium">{q.a}</div>
                    <div className="text-xs text-subtext">{q.r}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CORRIDOR / WHERE WE OPERATE ---------- */
import DottedMap from "dotted-map/without-countries";
import worldMapJson from "@/assets/world-map.json";

export function Corridor() {
  const { points, viewBox, origin, destinations } = React.useMemo(() => {
    const map = new DottedMap({ map: worldMapJson as any });
    const pts = map.getPoints();
    const w = map.image.width;
    const h = map.image.height;
    const cities = [
      { name: "India", lat: 19.07, lng: 72.87 },
      { name: "UAE", lat: 25.27, lng: 55.30 },
      { name: "Oman", lat: 23.6, lng: 58.5 },
      { name: "Saudi Arabia", lat: 24.7, lng: 46.7 },
      { name: "Singapore", lat: 1.35, lng: 103.82 },
      { name: "Malaysia", lat: 3.14, lng: 101.69 },
      { name: "Nigeria", lat: 6.5, lng: 3.38 },
      { name: "Kenya", lat: -1.29, lng: 36.82 },
      { name: "UK", lat: 51.5, lng: -0.13 },
    ];
    const projected = cities.map((c) => {
      const p = map.getPin({ lat: c.lat, lng: c.lng });
      return { name: c.name, x: p?.x ?? 0, y: p?.y ?? 0 };
    });
    return {
      points: pts,
      viewBox: `0 0 ${w} ${h}`,
      origin: projected[0],
      destinations: projected.slice(1),
    };
  }, []);

  const corridors = [
    ["India → UAE", "India → Oman", "India → Saudi Arabia"],
    ["India → Singapore", "India → Malaysia", "India → Nigeria", "India → Kenya", "India → UK"],
  ];

  return (
    <section className="px-6 py-32" style={{ backgroundColor: "#080B0F" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <FadeUp><Eyebrow>Active Trade Corridors</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-foreground leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 48px)" }}>
              We Go Where the Volume Is.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-6 text-[18px] text-subtext max-w-[580px] mx-auto leading-relaxed">
              Commodity AI is active across the world's highest-volume agri-commodity trade corridors. From Indian export hubs to Gulf trading centres, Southeast Asian ports, African markets, and European commodity exchanges — we operate where serious traders move serious volume.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
          <div className="mt-16 relative w-full overflow-hidden">
            <svg
              viewBox={viewBox}
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="arc-gold" x1="0" x2="1">
                  <stop offset="0" stopColor="#C8A96E" stopOpacity="0.05" />
                  <stop offset="0.5" stopColor="#C8A96E" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#C8A96E" stopOpacity="0.05" />
                </linearGradient>
                <radialGradient id="city-glow">
                  <stop offset="0%" stopColor="#C8A96E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Continent dots from dotted-map */}
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={0.32} fill="#1E252D" />
              ))}

              {/* Trade arcs from India to each destination */}
              {destinations.map((d, i) => {
                const mx = (origin.x + d.x) / 2;
                const my = Math.min(origin.y, d.y) - Math.abs(d.x - origin.x) * 0.22;
                const path = `M ${origin.x} ${origin.y} Q ${mx} ${my} ${d.x} ${d.y}`;
                return (
                  <motion.path
                    key={d.name}
                    d={path}
                    fill="none"
                    stroke="url(#arc-gold)"
                    strokeWidth={0.35}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1.4, delay: 0.3 + i * 0.3, ease: "easeOut" }}
                  />
                );
              })}

              {/* Highlighted city dots with pulse */}
              {[origin, ...destinations].map((c, i) => (
                <g key={c.name}>
                  <motion.circle
                    cx={c.x}
                    cy={c.y}
                    r={3.2}
                    fill="url(#city-glow)"
                    initial={{ opacity: 0.2, scale: 0.6 }}
                    animate={{ opacity: [0.2, 0.55, 0.2], scale: [0.6, 1.4, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
                    style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                  />
                  <circle cx={c.x} cy={c.y} r={0.75} fill="#C8A96E" />
                </g>
              ))}
            </svg>
          </div>
        </FadeUp>

        {/* Corridor pills */}
        <FadeUp delay={0.3}>
          <div className="mt-12 flex flex-col gap-3 items-center">
            {corridors.map((row, ri) => (
              <div key={ri} className="flex flex-wrap justify-center gap-3">
                {row.map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-md border border-border bg-background/60 pl-3 pr-4 py-2 text-sm text-foreground"
                    style={{ borderLeft: "2px solid #C8A96E" }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-subtext">Live</span>
                    <span className="ml-1">{label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="mt-10 text-center text-[16px] text-subtext max-w-2xl mx-auto leading-relaxed">
            New corridors activated on verified trader demand. If your market is not listed — it is already in our pipeline.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}




/* ---------- LOGO STRIP ---------- */
export function LogoStrip() {
  const logos = [
    "RICE TRADE CO",
    "GULF AGRI",
    "PUNJAB EXPORTS",
    "SHARJAH IMPORTS",
    "BASMATI HOUSE",
    "MUMBAI COMMODITIES",
    "DUBAI TRADE",
    "DELTA MILLS",
  ];

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("");

  return (
    <section className="border-y border-border bg-surface-alt/50 py-12 overflow-hidden">
      <FadeUp>
        <p className="text-center text-xs uppercase tracking-[0.22em] text-subtext mb-10">
          Trusted by traders across global commodity corridors
        </p>
      </FadeUp>
      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-surface-alt/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-surface-alt/80 to-transparent" />

        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {[...logos, ...logos, ...logos].map((l, i) => (
            <div
              key={i}
              className="flex items-center gap-3 shrink-0 w-[260px] justify-center opacity-70 hover:opacity-100 transition-opacity"
            >
              <span
                aria-hidden
                className="flex items-center justify-center w-10 h-10 rounded-md border border-accent/40 bg-background font-serif text-accent text-base leading-none shrink-0"
              >
                {getInitials(l)}
              </span>
              <span className="font-sans text-subtext text-sm tracking-[0.18em] uppercase">
                {l}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
export function FinalCTA() {
  return (
    <section id="waitlist" className="px-6 py-32">
      <div className="max-w-3xl mx-auto text-center">
        <FadeUp><Eyebrow>Join the Waitlist</Eyebrow></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-serif text-4xl sm:text-6xl text-foreground leading-[1.05]">
            The Infrastructure for Honest Trade.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-6 text-xl text-subtext max-w-xl mx-auto leading-relaxed">
            Whether you export 50 tonnes or 5,000 — you deserve the same protection, the same intelligence, and the same fair shot at the global market.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-12 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-full bg-surface-alt border border-border px-6 py-3.5 text-foreground placeholder:text-subtext focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="rounded-full bg-accent text-accent-foreground px-7 py-3.5 font-medium hover:bg-accent-hover hover:scale-[1.02] transition-all"
            >
              Request Early Access
            </button>
          </form>
          <p className="mt-4 text-[13px] text-subtext">No spam. No sales calls. Just early access when we go live.</p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------- TRUST + ESCROW + VERIFICATION (merged §5) ---------- */
export function TrustEscrow() {
  const score = [
    { label: "KYC & Identity", weight: 30 },
    { label: "Trade History", weight: 30 },
    { label: "On-time Delivery", weight: 25 },
    { label: "Dispute Rate", weight: 15 },
  ];
  return (
    <section className="px-6 py-32 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <FadeUp><Eyebrow>Trust, Verified — Money, Protected</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight max-w-4xl mx-auto">
              Every Counterparty Verified. Every Rupee in Escrow.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-6 text-[18px] text-subtext max-w-[640px] mx-auto leading-relaxed">
              The three layers of protection that turn a cold contact into a closed deal — without you ever having to guess who's on the other side.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trust Score breakdown */}
          <FadeUp>
            <div className="rounded-2xl border border-border bg-background p-8 h-full hover:border-accent/40 transition-colors">
              <ShieldCheck className="w-7 h-7 text-accent mb-5" strokeWidth={1.6} />
              <h3 className="font-serif text-2xl text-foreground">Trust Score (0–1000)</h3>
              <p className="mt-3 text-subtext text-sm leading-relaxed">
                A single number every trader carries with them — built from verified, closed-loop signals only.
              </p>
              <div className="mt-6 space-y-3">
                {score.map((s, i) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs text-subtext mb-1.5">
                      <span>{s.label}</span>
                      <span className="text-accent">{s.weight}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.weight * 3.3}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        className="h-full bg-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Verification */}
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-border bg-background p-8 h-full hover:border-accent/40 transition-colors">
              <CheckCircle2 className="w-7 h-7 text-accent mb-5" strokeWidth={1.6} />
              <h3 className="font-serif text-2xl text-foreground">Verification Layer</h3>
              <p className="mt-3 text-subtext text-sm leading-relaxed">
                Nobody trades on Commodity AI without clearing it first.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/90">
                {["Business KYB & beneficial ownership", "Export/import licence checks", "Bank account & GST validation", "Trade-reference cross-verification"].map((it) => (
                  <li key={it} className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-accent shrink-0" strokeWidth={2} /><span>{it}</span></li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Escrow */}
          <FadeUp delay={0.2}>
            <div className="rounded-2xl border border-accent/40 bg-accent/[0.03] p-8 h-full">
              <Lock className="w-7 h-7 text-accent mb-5" strokeWidth={1.6} />
              <h3 className="font-serif text-2xl text-foreground">Escrow & Payment Safety</h3>
              <p className="mt-3 text-subtext text-sm leading-relaxed">
                Funds are locked the moment a deal is signed and released the moment delivery is confirmed.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/90">
                {["Regulated escrow partner, segregated accounts", "Milestone-based release (load → ship → deliver)", "Dispute window before final release", "Full audit trail on every transaction"].map((it) => (
                  <li key={it} className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-accent shrink-0" strokeWidth={2} /><span>{it}</span></li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHATSAPP-FIRST + COMMODITY FOCUS (§6 intro, pairs with Corridor) ---------- */
export function WhatsAppGlobal() {
  const commodities = ["Basmati Rice", "Sugar", "Spices", "Pulses", "Edible Oils", "Tea", "Cotton", "Steel"];
  return (
    <section className="px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <FadeUp><Eyebrow>Built for the Way You Actually Trade</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight max-w-4xl mx-auto">
              Where Real Traders Already Live. On Commodities That Actually Move.
            </h2>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeUp>
            <div className="rounded-2xl border border-border bg-surface-alt p-8 h-full hover:border-accent/40 transition-colors">
              <MessageSquareLock className="w-7 h-7 text-accent mb-5" strokeWidth={1.6} />
              <h3 className="font-serif text-2xl text-foreground">WhatsApp-First Workflow</h3>
              <p className="mt-4 text-subtext leading-relaxed">
                Quotes, counter-offers, document exchange and shipment updates happen in the tool your counterparty already opens 80 times a day — Commodity AI sits on top of WhatsApp instead of asking anyone to learn a new app. Identities stay masked until escrow is funded.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface-alt p-8 h-full hover:border-accent/40 transition-colors">
              <FileText className="w-7 h-7 text-accent mb-5" strokeWidth={1.6} />
              <h3 className="font-serif text-2xl text-foreground">Commodity Focus</h3>
              <p className="mt-4 text-subtext leading-relaxed">
                We don't try to be a marketplace for everything. We go deep on the agri and bulk commodities that move volume across borders every single day.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {commodities.map((c) => (
                  <span key={c} className="rounded-full border border-accent/30 bg-background px-3 py-1.5 text-xs text-foreground/90 uppercase tracking-[0.14em]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ---------- PERSONAS — Who Is This For (§7) ---------- */
export function Personas() {
  const personas = [
    {
      role: "Exporters",
      title: "Stop chasing unverified buyers.",
      points: ["Verified buyers, real intent on record", "Get paid via escrow before risk", "Build a Trust Score that travels with you"],
    },
    {
      role: "Importers",
      title: "Stop wiring money into hope.",
      points: ["Verified suppliers with proven track record", "Quality & docs checked before release", "Funds released only on confirmed delivery"],
    },
    {
      role: "Brokers",
      title: "Stop losing deals to circumvention.",
      points: ["Identities masked end-to-end", "Circumvention clause baked into every deal", "Earn on every closed transaction, transparently"],
    },
  ];
  return (
    <section className="px-6 py-32 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <FadeUp><Eyebrow>Who Is This For</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight max-w-3xl mx-auto">
              One Platform. Three Sides of the Same Deal.
            </h2>
          </FadeUp>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((p, i) => (
            <FadeUp key={p.role} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-background p-8 h-full hover:border-accent/40 transition-colors">
                <div className="text-xs uppercase tracking-[0.22em] text-accent mb-4">{p.role}</div>
                <h3 className="font-serif text-2xl text-foreground leading-snug">{p.title}</h3>
                <ul className="mt-6 space-y-3 text-sm text-foreground/90">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-accent shrink-0" strokeWidth={2} /><span>{pt}</span></li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TRACTION + MOAT (merged §8) ---------- */
export function TractionMoat() {
  const stats = [
    { to: 500, suffix: "+", label: "Verified traders onboarded" },
    { to: 12, prefix: "$", suffix: "M+", label: "Deal volume in pipeline" },
    { to: 4, suffix: "", label: "Active trade corridors" },
    { to: 98, suffix: "%", label: "On-time settlement rate" },
  ];
  const moat = [
    "AI-verified blind broker network",
    "Trust Score — 0 to 1000 per trader",
    "Identity protected until escrow funds",
    "Proprietary closed-deal intelligence",
    "Document verification at every step",
  ];
  return (
    <section className="px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <FadeUp><Eyebrow>Traction & Why We Win</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight max-w-4xl mx-auto">
              Early Numbers. Compounding Moat.
            </h2>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-surface-alt p-6 text-center h-full">
                <div className="font-serif text-4xl md:text-5xl text-accent">
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-xs text-subtext leading-snug">{s.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <FadeUp>
            <div className="rounded-2xl border border-accent/40 bg-accent/[0.03] p-8 h-full">
              <div className="text-xs uppercase tracking-[0.2em] text-accent mb-6">What only we have</div>
              <ul className="space-y-4">
                {moat.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-foreground">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-accent" strokeWidth={2} />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface-alt p-8 h-full">
              <div className="text-xs uppercase tracking-[0.2em] text-subtext mb-6">The data flywheel</div>
              <p className="text-subtext leading-relaxed">
                Every closed deal generates a verified, closed-loop data point no public database contains —
                buyer identity, seller reliability, commodity grade accuracy, price benchmark, logistics outcome,
                payment behaviour. By deal 500, we hold the most valuable proprietary commodity intelligence
                dataset in the corridor. By deal 5,000, no competitor can enter.
              </p>
              <p className="mt-6 font-serif text-accent text-lg leading-snug">
                "The moat is not the technology. It is the data no one else will ever have."
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ (§9) ---------- */
export function FAQ() {
  const faqs = [
    {
      q: "How is my identity actually protected?",
      a: "Buyer and seller identities, contact details and company names are masked end-to-end during discovery and negotiation. Identities are only revealed after escrow is funded and a circumvention clause is signed — so neither side can bypass the platform.",
    },
    {
      q: "What stops a counterparty from going around me after one deal?",
      a: "Every deal carries a binding circumvention clause and an audit trail. We also relay communication through masked channels, so contact details never leak. Repeat offenders are removed from the network and their Trust Score reflects it permanently.",
    },
    {
      q: "How does the escrow actually work?",
      a: "Funds are deposited with a regulated escrow partner in a segregated account, locked the moment a deal is signed. Money releases against verifiable milestones — load confirmation, shipment, and confirmed delivery — with a dispute window before final release.",
    },
    {
      q: "What does the Trust Score measure?",
      a: "A 0–1000 score built from four signals only: KYC & identity (30%), trade history (30%), on-time delivery (25%), and dispute rate (15%). No self-reported reviews, no paid boosts. Every point is earned from a closed, verified deal.",
    },
    {
      q: "Which commodities and corridors do you currently support?",
      a: "Rice, sugar, spices, pulses, edible oils, tea, cotton and steel today, across multiple active corridors including India ↔ Gulf, India ↔ Southeast Asia, India ↔ Africa and India ↔ UK. New corridors open when verified trader demand is in.",
    },
    {
      q: "What does it cost?",
      a: "Onboarding is free. There is no subscription, no per-listing fee. We charge a small success fee only when a deal closes through escrow on the platform.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-6 py-32 bg-surface-alt">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <FadeUp><Eyebrow>Questions, Answered</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight">
              The Things Every Trader Asks Us First.
            </h2>
          </FadeUp>
        </div>
        <div className="mt-14 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={f.q} delay={i * 0.05}>
                <div
                  className={`rounded-xl border bg-background overflow-hidden transition-colors ${isOpen ? "border-accent/40" : "border-border hover:border-accent/30"}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  >
                    <span className="font-sans text-foreground text-base">{f.q}</span>
                    <Plus
                      className={`w-4 h-4 shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      strokeWidth={1.8}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-subtext leading-relaxed text-sm">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
export function Footer() {
  return (
    <footer className="px-6 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div>
            <div className="font-medium text-accent">Commodity AI</div>
            <div className="text-sm text-subtext mt-1">Verified Trade Infrastructure for India & the Gulf</div>
          </div>
          <div className="flex justify-center gap-6 text-sm text-subtext">
            <a href="#how" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="text-sm text-subtext md:text-right">© 2025 Commodity AI. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
