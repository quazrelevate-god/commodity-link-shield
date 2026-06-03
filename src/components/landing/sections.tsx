import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import React, { useRef } from "react";
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
} from "lucide-react";
import sellerImg from "@/assets/seller-card.jpg";
import buyerImg from "@/assets/buyer-card.jpg";
import { RadialGlowBackground } from "@/components/ui/radial-glow-background";

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

      {/* Base gradient-faded grid + dots at every 5th intersection */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "radial-gradient(circle, rgba(226,201,126,0.55) 1.2px, transparent 1.6px)",
            "linear-gradient(rgba(200,169,110,0.16) 1px, transparent 1px)",
            "linear-gradient(to right, rgba(200,169,110,0.16) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "80px 80px, 16px 16px, 16px 16px",
          backgroundPosition: "0 0, 0 0, 0 0",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 0%, black 0%, rgba(0,0,0,0.45) 45%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 0%, black 0%, rgba(0,0,0,0.45) 45%, transparent 85%)",
        }}
      />

      {/* Cursor spotlight: brighter grid + dots follow the mouse */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100"
        style={{
          backgroundImage: [
            "radial-gradient(circle, rgba(226,201,126,1) 1.6px, transparent 2px)",
            "linear-gradient(rgba(226,201,126,0.85) 1px, transparent 1px)",
            "linear-gradient(to right, rgba(226,201,126,0.85) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "80px 80px, 16px 16px, 16px 16px",
          backgroundPosition: "0 0, 0 0, 0 0",
          maskImage:
            "radial-gradient(260px circle at var(--mx) var(--my), black 0%, rgba(0,0,0,0.5) 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(260px circle at var(--mx) var(--my), black 0%, rgba(0,0,0,0.5) 40%, transparent 75%)",
        }}
      />


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
            connecting Indian exporters with Gulf importers through AI-matched
            deals, protected identities, and escrow-secured payments.
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
            Used by exporters moving $500K+ in rice, sugar & agri-commodities
            across India–UAE corridors.
          </motion.p>
        </div>

        {/* RIGHT — Buyer / Seller Cards (proximity reactive) */}
        <ProximityCardStack />
      </div>
    </section>
  );
}

/* ---------- PROXIMITY-REACTIVE CARD STACK ---------- */
function useProximityIntensity(
  px: MotionValue<number>,
  py: MotionValue<number>,
  ref: React.RefObject<HTMLDivElement | null>,
  radius: number,
) {
  return useTransform([px, py], (vals) => {
    const [x, y] = vals as [number, number];
    if (x < -1000 || !ref.current) return 0;
    const parent = ref.current.offsetParent as HTMLElement | null;
    const cardR = ref.current.getBoundingClientRect();
    const parR = parent?.getBoundingClientRect();
    if (!parR) return 0;
    const cx = cardR.left - parR.left + cardR.width / 2;
    const cy = cardR.top - parR.top + cardR.height / 2;
    const d = Math.hypot(x - cx, y - cy);
    return Math.max(0, Math.min(1, 1 - d / radius));
  });
}

function ProximityCardStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(-9999);
  const py = useMotionValue(-9999);

  const buyerRef = useRef<HTMLDivElement>(null);
  const sellerRef = useRef<HTMLDivElement>(null);

  const buyerRaw = useProximityIntensity(px, py, buyerRef, 280);
  const sellerRaw = useProximityIntensity(px, py, sellerRef, 280);

  // Smooth, physics-y spring — softer & heavier so the shuffle feels like weight, not magic.
  const spring = { stiffness: 110, damping: 24, mass: 1 };
  const tBuyer = useSpring(buyerRaw, spring);
  const tSeller = useSpring(sellerRaw, spring);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };
  const handleLeave = () => {
    px.set(-9999);
    py.set(-9999);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="relative h-[520px] sm:h-[600px] lg:h-[640px] w-full"
    >
      {/* Back — Buyer (tilts +5deg at rest, top-right) */}
      <ProximityCard
        ref={buyerRef}
        t={tBuyer}
        tOther={tSeller}
        reduce={!!reduce}
        restRotate={5}
        // When seller is being approached, buyer slides further up-right to pave the way.
        pushX={70}
        pushY={-28}
        anchor={{ topPct: 0, leftPct: 28 }}
        className="top-0 right-0 w-[72%] h-[88%]"
        imgSrc={buyerImg}
        imgAlt="Buyer using laptop"
        label="Buyer"
        title="Global Importers"
        subtitle="Verified buyers sourcing at scale"
        shadow="0 30px 80px -20px rgba(0,0,0,0.7)"
        baseZ={1}
      />

      {/* Front — Seller (tilts -6deg at rest, bottom-left) */}
      <ProximityCard
        ref={sellerRef}
        t={tSeller}
        tOther={tBuyer}
        reduce={!!reduce}
        restRotate={-6}
        // When buyer is being approached, seller slides further down-left to pave the way.
        pushX={-70}
        pushY={28}
        anchor={{ topPct: 22, leftPct: 0 }}
        className="bottom-0 left-0 w-[68%] h-[78%]"
        imgSrc={sellerImg}
        imgAlt="Seller reviewing inventory"
        label="Seller"
        title="Verified Exporters"
        subtitle="Producers trading at source"
        shadow="0 40px 100px -20px rgba(0,0,0,0.85)"
        baseZ={2}
      />
    </motion.div>
  );
}

const ProximityCard = React.forwardRef<
  HTMLDivElement,
  {
    t: MotionValue<number>;
    tOther: MotionValue<number>;
    reduce: boolean;
    restRotate: number;
    pushX: number;
    pushY: number;
    anchor: { topPct: number; leftPct: number };
    className: string;
    imgSrc: string;
    imgAlt: string;
    label: string;
    title: string;
    subtitle: string;
    shadow: string;
    baseZ: number;
  }
>(function ProximityCard(
  {
    t,
    tOther,
    reduce,
    restRotate,
    pushX,
    pushY,
    anchor,
    className,
    imgSrc,
    imgAlt,
    label,
    title,
    subtitle,
    shadow,
    baseZ,
  },
  ref,
) {
  // Own proximity drives "come forward": straighten, scale, lift.
  const rotate = useTransform(t, [0, 1], [restRotate, 0]);
  const scale = useTransform(t, [0, 1], [1, 1.05]);
  const lift = useTransform(t, [0, 1], [0, -14]);

  // Other card's proximity drives "pave the way": slide outward, then revert.
  const xShove = useTransform(tOther, [0, 1], [0, pushX]);
  const yShove = useTransform(tOther, [0, 1], [0, pushY]);

  // Combined y = own lift + lateral shove vertical component.
  const y = useTransform([lift, yShove], (vals) => {
    const [a, b] = vals as [number, number];
    return a + b;
  });

  // Z-index: whoever is more "active" floats above. Use baseZ as tiebreaker.
  const zIndex = useTransform([t, tOther], (vals) => {
    const [a, b] = vals as [number, number];
    if (a > b + 0.05) return 30;
    if (b > a + 0.05) return 5;
    return baseZ + 10;
  });

  return (
    <motion.div
      ref={ref}
      style={
        reduce
          ? { boxShadow: shadow, zIndex: baseZ }
          : {
              rotate,
              scale,
              x: xShove,
              y,
              zIndex,
              boxShadow: shadow,
              transformOrigin: `${anchor.leftPct}% ${anchor.topPct}%`,
              willChange: "transform",
            }
      }
      className={`absolute rounded-2xl overflow-hidden border border-border ${className}`}
    >
      <img
        src={imgSrc}
        alt={imgAlt}
        width={896}
        height={1216}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border text-[10px] tracking-[0.22em] uppercase text-accent">
        {label}
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <div className="font-serif text-2xl text-foreground leading-tight">{title}</div>
        <div className="text-xs text-subtext mt-1.5">{subtitle}</div>
      </div>
    </motion.div>
  );
});


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
  return (
    <section className="px-6 py-32">
      <div className="max-w-5xl mx-auto text-center">
        <FadeUp><Eyebrow>The Commodity AI Approach</Eyebrow></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight max-w-3xl mx-auto">
            Anonymous Until Committed. Verified From Day One.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-6 text-lg text-subtext max-w-[580px] mx-auto">
            We don't just digitise brokerage. We re-engineer the trust layer of commodity trade.
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {blocks.map((b, i) => (
            <FadeUp key={i} delay={(i % 2) * 0.1}>
              <div className="rounded-2xl border border-border bg-surface-alt p-8 h-full hover:border-accent/40 transition-colors">
                <b.Icon className="w-6 h-6 text-accent" strokeWidth={1.4} />
                <h3 className="mt-5 font-sans font-medium text-lg text-foreground">{b.t}</h3>
                <p className="mt-3 text-subtext text-sm leading-relaxed">{b.d}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
export function HowItWorks() {
  const steps = [
    ["Seller Lists", "Exporter submits commodity, grade, quantity, port, and minimum price. KYC verified against GST, IEC, and trade documents."],
    ["Buyer Requests", "Gulf importer submits requirements. Platform matches against verified, masked seller profiles ranked by spec fit and Trust Score."],
    ["Anonymous Negotiation", "Both parties communicate via masked relay. Neither knows the other's identity. Platform holds all context."],
    ["LOI Signed", "Digital Letter of Intent generated and signed by both parties. Circumvention clause locks the deal to the platform for 12 months."],
    ["Escrow Funded", "Buyer deposits into licensed escrow. Seller identity revealed. Deal enters execution phase."],
    ["Goods Shipped & Verified", "Shipping documents verified by platform ops team. Logistics tracked."],
    ["Escrow Released", "Funds released to seller on delivery confirmation. Trust Scores updated for both parties. Deal complete."],
  ];
  return (
    <section id="how" className="bg-surface-alt px-6 py-32">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <FadeUp><Eyebrow>The Deal Flow</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight">
              A $200,000 deal. Closed safely. In 7 steps.
            </h2>
          </FadeUp>
        </div>

        <div className="mt-20 relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
          <div className="space-y-12">
            {steps.map(([t, d], i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full border border-accent/50 bg-background flex items-center justify-center font-serif text-accent">
                    {i + 1}
                  </div>
                  <h3 className="font-sans font-medium text-lg text-foreground">{t}</h3>
                  <p className="mt-2 text-subtext leading-relaxed">{d}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
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
    ["Transaction Commission", "2% of deal value on every closed trade. A $200K rice deal = $4,000 per transaction. Volume compounds as the network grows."],
    ["Subscription Intelligence", "$149–499/month for live commodity price feeds, demand signals, buyer analytics, and priority matching. Daily-use value that makes churn impossible."],
    ["Managed Deal Services", "Full-service deal execution for high-value trades — document verification, logistics coordination, dispute resolution. Premium margin, repeat customers."],
  ];
  return (
    <section className="bg-surface-alt px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <FadeUp><Eyebrow>The Business</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight">
              Three Revenue Streams. One Compounding Moat.
            </h2>
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
          <p className="mt-20 font-serif italic text-2xl sm:text-3xl text-accent text-center max-w-3xl mx-auto leading-snug">
            "Every closed deal trains our AI. Every trade enriches our dataset. No competitor can replicate what we accumulate."
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

/* ---------- CORRIDOR ---------- */
export function Corridor() {
  return (
    <section className="px-6 py-32">
      <div className="max-w-4xl mx-auto text-center">
        <FadeUp><Eyebrow>Phase 1 Focus</Eyebrow></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight">
            One Corridor. One Commodity. Total Dominance.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-8 text-lg text-subtext max-w-2xl mx-auto leading-relaxed">
            We are not trying to solve all of global trade on day one. We are starting with the single most active, most underserved, and most high-value corridor in South Asian commodity trade — Rice and Sugar, India to UAE. Prove the model. Own the corridor. Then expand.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-16 rounded-2xl border border-border bg-surface-alt p-10">
            <svg viewBox="0 0 600 220" className="w-full h-auto max-w-2xl mx-auto">
              <defs>
                <linearGradient id="arc" x1="0" x2="1">
                  <stop offset="0" stopColor="#C8A96E" stopOpacity="0.2" />
                  <stop offset="0.5" stopColor="#C8A96E" stopOpacity="1" />
                  <stop offset="1" stopColor="#C8A96E" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 140 140 Q 300 20 460 140"
                stroke="url(#arc)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <circle cx="140" cy="140" r="6" fill="#C8A96E" />
              <circle cx="460" cy="140" r="6" fill="#C8A96E" />
              <text x="140" y="170" textAnchor="middle" fill="#F0EDE6" fontSize="14" fontFamily="DM Sans">India</text>
              <text x="460" y="170" textAnchor="middle" fill="#F0EDE6" fontSize="14" fontFamily="DM Sans">UAE</text>
              <text x="300" y="50" textAnchor="middle" fill="#8A9099" fontSize="11" fontFamily="DM Sans" letterSpacing="2">PHASE 1 ACTIVE CORRIDOR</text>
            </svg>
            <p className="mt-6 text-xs text-subtext">Expanding to India → Africa, India → Southeast Asia in Phase 2.</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------- LOGO STRIP ---------- */
export function LogoStrip() {
  const logos = ["RICE TRADE CO", "GULF AGRI", "PUNJAB EXPORTS", "SHARJAH IMPORTS", "BASMATI HOUSE", "MUMBAI COMMODITIES", "DUBAI TRADE", "DELTA MILLS"];
  return (
    <section className="border-y border-border bg-surface-alt/50 py-12 overflow-hidden">
      <FadeUp>
        <p className="text-center text-xs uppercase tracking-[0.22em] text-subtext mb-8">
          Trusted by traders across the India–Gulf corridor
        </p>
      </FadeUp>
      <div className="relative">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...logos, ...logos, ...logos].map((l, i) => (
            <span key={i} className="font-sans text-subtext/70 text-lg tracking-[0.2em] shrink-0">
              {l}
            </span>
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
